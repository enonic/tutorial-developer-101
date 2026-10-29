const content = require('/lib/xp/content');
const context = require('/lib/xp/context');
const exporter = require('/lib/xp/export');
const project = require('/lib/xp/project');
const {projectId, administrator} = require('/lib/tutorial');

exports.run = () => context.run(administrator, () => {
    // Recheck inside the task: the project may have been created since startup.
    if (project.get({id: projectId})) {
        log.info(`Project "${projectId}" already exists; skipping initialization.`);
        return;
    }

    try {
        project.create({
            id: projectId,
            displayName: 'My First Project',
            description: 'The completed Developer 101 tutorial',
            language: 'en',
            publicRead: true,
            siteConfig: [{applicationKey: app.name}]
        });

        context.run({repository: `com.enonic.cms.${projectId}`, branch: 'draft'}, () => {
            const imported = exporter.importNodes({
                source: resolve('/import'),
                targetNodePath: '/content',
                xslt: resolve('/import/prepare-content.xsl'),
                includeNodeIds: true,
                includePermissions: false,
                versionAttributes: {
                    'content.import': {
                        user: context.get().authInfo.user.key,
                        optime: new Date().toISOString()
                    },
                    'vacuum.skip': {}
                }
            });

            if (imported.importErrors.length || imported.skippedNodes.length) {
                throw new Error(`Content import failed: ${JSON.stringify(imported)}`);
            }

            const published = content.publish({keys: ['/animals', '/artists', '/images']});
            if (published.failedContents.length) {
                throw new Error(`Content publishing failed: ${JSON.stringify(published.failedContents)}`);
            }

            log.info(`Initialized "${projectId}" and published ${published.pushedContents.length} content items.`);
        });
    } catch (error) {
        // Keep any imported data for inspection; never silently re-import over an existing project.
        log.error(`Developer 101 initialization failed for "${projectId}": ${error.message}`);
        throw error;
    }
});
