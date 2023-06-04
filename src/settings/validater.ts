import colors from 'colors/safe';
import { AppConfig } from './types';

export const validate = (config: AppConfig) => {
  if (config.env.OUTGOIN_CALL_PHONE_NUMBER === undefined) {
    throw new Error(
      colors.red(
        'OUTGOIN_CALL_PHONE_NUMBER is undefined. Please set it in .env'
      )
    );
  }
  if (config.env.TWILIO_PHONE_NUMBER === undefined) {
    throw new Error(
      colors.red('TWILIO_PHONE_NUMBER is undefined. Please set it in .env')
    );
  }
  if (config.env.TWILIO_ACCOUNT_SID === undefined) {
    throw new Error(
      colors.red('TWILIO_ACCOUNT_SID is undefined. Please set it in .env')
    );
  }
  if (config.env.TWILIO_AUTH_TOKEN === undefined) {
    throw new Error(
      colors.red('TWILIO_AUTH_TOKEN is undefined. Please set it in .env')
    );
  }

  switch (config.settings.checker) {
    case 'slack':
      if (config.env.SLACK_BOT_TOKEN === undefined) {
        throw new Error(
          colors.red('SLACK_BOT_TOKEN is undefined. Please set it in .env')
        );
      }
      if (
        config.settings.slack?.loggingChannelId === undefined &&
        config.env.SLACK_CHANNEL_ID === undefined
      ) {
        throw new Error(
          colors.red(
            'SLACK_CHANNEL_ID and loggingChannelId are both undefined. Please set it in .env or settings.json'
          )
        );
      }
      break;
    default:
      throw new Error(
        colors.red(`Unknown checker type: ${config.settings.checker}`)
      );
  }
};
