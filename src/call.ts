import { Twilio } from 'twilio';
import { appConfig } from './settings';
import { logger } from './logger';

const {
  OUTGOIN_CALL_PHONE_NUMBER: to,
  TWILIO_PHONE_NUMBER: from,
  TWILIO_ACCOUNT_SID: accountSid,
  TWILIO_AUTH_TOKEN: authToken,
} = appConfig.env;

const client = new Twilio(accountSid, authToken, {
  lazyLoading: true,
  // https://github.com/twilio/twilio-node#enable-auto-retry-with-exponential-backoff
  autoRetry: true,
  maxRetries: 1,
});

export const call = async (timeout: number) => {
  logger.debug(
    `Twilio.call: from ${from} to ${to} with a timeout of ${timeout} seconds`
  );
  if (appConfig.env.DRYRUN) {
    logger.log('Twilio.call: is not fired, because of DRYRUN MODE');
    return;
  }
  return client.calls
    .create({
      to,
      from,
      timeout,
      twiml: `<Response><Pause length="${timeout}"/></Response>`,
    })
    .then((call) => {
      logger.debug(`Twilio.call: SID ${call.sid}`);
    });
};
