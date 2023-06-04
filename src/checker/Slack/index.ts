import { WebClient } from '@slack/web-api';
import { Checkable, UniqueId } from '../types';
import { appConfig } from '../../settings';
import { logger } from '../../logger';

const token = appConfig.env.SLACK_BOT_TOKEN;
const loggingChannel = appConfig.settings.slack?.loggingChannelId;
const alertChannel = appConfig.settings.slack?.alertChannelId;
const confirmLogRegex = new RegExp(appConfig.settings.confirmLogRegex);
const goodReaction = appConfig.settings.slack?.goodReaction;
let _client: WebClient;

const getClient = () => {
  if (_client === undefined) {
    _client = new WebClient(token);
  }
  return _client;
};

const alert = async (message: string) =>
  sendSlackMessage(message, alertChannel);
const postLog = async (log: string) => sendSlackMessage(log);

const sendSlackMessage = async (message: string, channel?: string) => {
  try {
    const result = await getClient().chat.postMessage({
      username: appConfig.env.DEV
        ? `[Dev] ${appConfig.settings.appName}`
        : undefined,
      channel: channel ?? loggingChannel,
      text: message,
    });
    logger.debug(result);
    return result.ts;
  } catch (error) {
    logger.error(error);
  }
};

const confirmLogs = async (ts: UniqueId) => {
  const result = await getClient().conversations.history({
    channel: loggingChannel,
    oldest: ts,
  });
  logger.debug(result);
  if (result.messages === undefined) {
    return false;
  }
  let isConfirmed = false;
  for (const message of result.messages) {
    if (message.text !== undefined && confirmLogRegex.test(message.text)) {
      await getClient().reactions.add({
        channel: loggingChannel,
        name: goodReaction,
        timestamp: message.ts,
      });
      isConfirmed = true;
    }
  }
  return isConfirmed;
};

export const slack: Checkable = {
  alert,
  postLog,
  confirmLogs,
};
