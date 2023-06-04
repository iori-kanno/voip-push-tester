import { CheckerType } from '../checker/types';

export type SlackConfig = {
  loggingChannelId: string;
  /** When not set, white_check_mark will be used. */
  goodReaction: string;
  /** Channel ID to send alert notification when log cannot be confirmed.
   *  If not set, loggingChannelId will be used. */
  alertChannelId: string;
};

export type EnvConfig = {
  OUTGOIN_CALL_PHONE_NUMBER: string;
  TWILIO_PHONE_NUMBER: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  /** Required when specifying slack in checker */
  SLACK_BOT_TOKEN?: string;
  /** This is used when the channel id is not set in the settings.json. */
  SLACK_CHANNEL_ID?: string;

  // FOR DEVELOPMENT
  DEV: boolean;
  DRYRUN: boolean;
  IS_CONFIRMED: boolean;
};

export type Settings = {
  appName: string;
  checker: CheckerType;
  dotenvOverride: boolean;
  maxRetries: number;
  retryInterval: number;
  confirmLogRegex: string;
  startMessage: string;
  endMessage: string;
  retryMessage: string;
  alertMessage: string;
  callTimeout: number;
  slack?: SlackConfig;
};

export type AppConfig = {
  env: EnvConfig;
  settings: Settings;
};
