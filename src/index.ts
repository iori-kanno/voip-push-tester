import { exit } from 'process';
import { call } from './call';
import { Checker } from './checker';
import { appConfig } from './settings';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const {
  checker: type,
  callTimeout,
  startMessage,
  endMessage,
  retryMessage,
  alertMessage,
  maxRetries,
  retryInterval,
} = appConfig.settings;
let retryCount = 0;

(async () => {
  const checker = new Checker(type);
  const uniqId = await checker.postLog(startMessage);

  const fire = async (): Promise<boolean> => {
    console.debug(`fire: ${retryCount + 1}`);

    // Wait a little longer than the call timeout
    await Promise.all([call(callTimeout), wait(1.2 * callTimeout * 1000)]);

    const res = await checker.confirmLogs(uniqId);
    console.debug('success: ' + res);
    return res;
  };

  while ((await fire()) === false) {
    if (++retryCount > maxRetries) {
      await checker.alert(alertMessage);
      exit(1);
    }
    await Promise.all([
      checker.postLog(retryMessage),
      wait(retryInterval * 1000),
    ]);
  }
  await checker.postLog(endMessage);
})();
