import { AppConfig, Settings } from './types';
import { validate } from './validater';

let _setting = {};

try {
  _setting = require('../../settings.json');
} catch (err) {
  console.warn('WARN: Failed to read settings.json', err);
}

const appName = _setting['appName'] ?? 'voip-push-tester';
const retryInterval = _setting['retryInterval'] ?? 60;
const retryMessage = (
  _setting['retryMessage'] ??
  '⚠️ Wait {retryInterval} seconds and then run again because the logs could not be confirmed.'
).replace('{retryInterval}', retryInterval.toString());
const dotenvOverride = _setting['dotenvOverride'] ?? true;
require('dotenv').config({ override: dotenvOverride });

const settings: Settings = {
  appName,
  dotenvOverride,
  retryInterval,
  retryMessage,
  checker: _setting['checker'] ?? 'slack',
  maxRetries: _setting['maxRetries'] ?? 3,
  confirmLogRegex: _setting['confirmLogRegex'] ?? '.*',
  startMessage: _setting['startMessage'] ?? `${appName} start`,
  endMessage: _setting['endMessage'] ?? `${appName} end`,
  alertMessage: _setting['alertMessage'] ?? '🚨 Logs could not be verified.',
  callTimeout: _setting['callTimeout'] ?? 20,
  slack: _setting['checker'] === 'slack' && {
    loggingChannelId:
      _setting['slack']?.['loggingChannelId'] ?? process.env.SLACK_CHANNEL_ID,
    goodReaction: _setting['slack']?.['goodReaction'] ?? 'white_check_mark',
    alertChannelId:
      _setting['slack']?.['alertChannelId'] ?? process.env.SLACK_CHANNEL_ID,
  },
};

export const appConfig: AppConfig = {
  settings,
  env: {
    OUTGOIN_CALL_PHONE_NUMBER: process.env.OUTGOIN_CALL_PHONE_NUMBER,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
    SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
    DEV: (process.env.DEV || '').toLocaleLowerCase() === 'true',
    DRYRUN: (process.env.DRYRUN || '').toLocaleLowerCase() === 'true',
    IS_CONFIRMED:
      (process.env.IS_CONFIRMED || '').toLocaleLowerCase() === 'true',
  },
};

validate(appConfig);
