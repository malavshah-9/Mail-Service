const cron = require('node-cron');
const got = require('got');

const host = 'http://localhost:3000/';
const failedMailEndPoint = 'api/v1/mail-failed/';
const healthCheck = 'api/v1/health';
const checkAvailability = async () => {
  try {
    let response = await got(host + healthCheck);
    if (response) return true;
    else return false;
  } catch (e) {
    return false;
  }
};

// This job will run every two minutes

const cronExpression = '*/2 * * * *';
const task = cron.schedule(cronExpression, () => {
  if (checkAvailability) {
    got.post(host + failedMailEndPoint)
      .then((d) => {
        console.log(' failed mail called successfully ', d.response);
      })
      .catch((e) => {
        console.error(' error in failed mail ', e);
      });
  }
});

// Destroy cron job on receiving the process.exit

const shutdownCron = () => {
  console.log(' received process.exit ');
  task.stop();
  delete task;
};
process.on('SIGTERM', shutdownCron);

process.on('SIGABRT', shutdownCron);

process.on('SIGINT', shutdownCron);
