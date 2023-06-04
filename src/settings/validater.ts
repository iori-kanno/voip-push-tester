import { AppConfig } from './types';

export const validate = (config: AppConfig) => {
  if (config.env.OUTGOIN_CALL_PHONE_NUMBER === undefined) {
    throw new Error(
      'OUTGOIN_CALL_PHONE_NUMBER is undefined. Please set it in .env'
    );
  }
  if (config.env.TWILIO_PHONE_NUMBER === undefined) {
    throw new Error('TWILIO_PHONE_NUMBER is undefined. Please set it in .env');
  }
  if (config.env.TWILIO_ACCOUNT_SID === undefined) {
    throw new Error('TWILIO_ACCOUNT_SID is undefined. Please set it in .env');
  }
  if (config.env.TWILIO_AUTH_TOKEN === undefined) {
    throw new Error('TWILIO_AUTH_TOKEN is undefined. Please set it in .env');
  }

  switch (config.settings.checker) {
    case 'slack':
      if (config.env.SLACK_BOT_TOKEN === undefined) {
        throw new Error('SLACK_BOT_TOKEN is undefined. Please set it in .env');
      }
      if (config.settings.slack?.loggingChannelId === undefined) {
        throw new Error(
          'SLACK_CHANNEL_ID and loggingChannelId are both undefined. Please set it in .env or settings.json'
        );
      }
      break;
    default:
      throw new Error(`Unknown checker type: ${config.settings.checker}`);
  }
};
