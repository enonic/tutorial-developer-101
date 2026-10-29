const cluster = require('/lib/xp/cluster');
const context = require('/lib/xp/context');
const project = require('/lib/xp/project');
const task = require('/lib/xp/task');
const {projectId, administrator} = require('/lib/tutorial');

// Only the leader schedules initialization. The task may run on any cluster node.
if (cluster.isLeader()) {
    context.run(administrator, () => {
        if (project.get({id: projectId})) {
            log.info(`Project "${projectId}" already exists; leaving its content unchanged.`);
            return;
        }

        const taskId = task.submitTask({
            descriptor: 'initialize',
            name: 'Initialize Developer 101'
        });
        log.info(`Scheduled Developer 101 initialization: ${taskId}`);
    });
}
