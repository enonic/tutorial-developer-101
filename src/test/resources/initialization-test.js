const t = require('/lib/xp/testing');

let existing;
let leader;
let calls;
let importResult;
let publishResult;
let createError;
let activeContext;

t.mock('/lib/xp/cluster', {isLeader: () => leader});
t.mock('/lib/xp/context', {
    run: (options, callback) => {
        const previous = activeContext;
        activeContext = {...previous, ...options};
        try {
            return callback();
        } finally {
            activeContext = previous;
        }
    },
    get: () => ({authInfo: {user: {key: 'user:system:su'}}})
});
t.mock('/lib/xp/project', {
    get: ({id}) => {
        t.assertEquals('my-first-project', id);
        t.assertEquals('su', activeContext.user.login);
        return existing;
    },
    create: (options) => {
        calls.push({operation: 'create', options});
        if (createError) {
            throw createError;
        }
        existing = {id: options.id};
        return existing;
    }
});
t.mock('/lib/xp/task', {
    submitTask: (options) => {
        calls.push({operation: 'submit', options});
        return 'initialization-task';
    }
});
t.mock('/lib/xp/export', {
    importNodes: (options) => {
        t.assertEquals('com.enonic.cms.my-first-project', activeContext.repository);
        t.assertEquals('draft', activeContext.branch);
        calls.push({operation: 'import', options});
        return importResult;
    }
});
t.mock('/lib/xp/content', {
    publish: (options) => {
        t.assertEquals('com.enonic.cms.my-first-project', activeContext.repository);
        t.assertEquals('draft', activeContext.branch);
        calls.push({operation: 'publish', options});
        return publishResult;
    }
});

const initialize = require('/tasks/initialize/initialize').run;
const operations = () => calls.map(({operation}) => operation);
// Simulate separate starts instead of reusing the test harness's cached main module.
const runMain = () => new Function('require', 'log', String(t.load('/main.js')))(require, log);

exports.before = () => {
    existing = null;
    leader = true;
    calls = [];
    createError = null;
    activeContext = {};
    importResult = {importErrors: [], skippedNodes: []};
    publishResult = {failedContents: [], pushedContents: ['lion', 'lynx']};
};

exports.testLeaderSchedulesNamedTask = () => {
    runMain();
    t.assertJson(['submit'], operations());
    t.assertEquals('initialize', calls[0].options.descriptor);
};

exports.testOtherClusterNodesDoNotSchedule = () => {
    leader = false;
    runMain();
    t.assertJson([], operations());
};

exports.testStartupPreservesExistingProject = () => {
    existing = {id: 'my-first-project'};
    runMain();
    t.assertJson([], operations());
};

exports.testTaskPreservesProjectCreatedAfterScheduling = () => {
    existing = {id: 'my-first-project'};
    initialize();
    t.assertJson([], operations());
};

exports.testCreatesImportsAndPublishesOnlyOnce = () => {
    initialize();
    t.assertJson(['create', 'import', 'publish'], operations());
    t.assertEquals('My First Project', calls[0].options.displayName);
    t.assertTrue(calls[0].options.publicRead);
    t.assertEquals(app.name, calls[0].options.siteConfig[0].applicationKey);
    t.assertTrue(calls[1].options.includeNodeIds);
    t.assertFalse(calls[1].options.includePermissions);
    t.assertEquals('/content', calls[1].options.targetNodePath);
    t.assertJson(['/animals', '/artists', '/images'], calls[2].options.keys);
    initialize();
    t.assertJson(['create', 'import', 'publish'], operations());
};

exports.testCreationFailureDoesNotImportIntoAnotherProject = () => {
    createError = new Error('Project already exists');
    t.assertThrows(initialize);
    t.assertJson(['create'], operations());
};

exports.testImportErrorsPreventPublishing = () => {
    importResult.importErrors.push({message: 'Missing attachment'});
    t.assertThrows(initialize);
    t.assertJson(['create', 'import'], operations());
};

exports.testSkippedContentPreventsPublishing = () => {
    importResult.skippedNodes.push('/content/animals/lynx');
    t.assertThrows(initialize);
    t.assertJson(['create', 'import'], operations());
};

exports.testPublishingFailureIsReported = () => {
    publishResult.failedContents.push('lynx');
    t.assertThrows(initialize);
    t.assertJson(['create', 'import', 'publish'], operations());
};
