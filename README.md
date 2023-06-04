# voip-push-tester

This is a library that uses Twilio to automatically make calls and check if VoIP Push notifications for mobile apps have been received.

Apart from this library, you will need to build a function into your mobile app that logs VoIP Push receipts to Slack, etc.

## Setup

### Installation

- node >= 14.0.0
- pnpm >= 8.6.0

```shell
pnpm install
```

### .env

You will need to set the following items in your `.env`

```shell
# Required
# Calling number for notifications to be sent to your application.
# see: https://www.twilio.com/docs/voice/api/outgoing-caller-ids
OUTGOIN_CALL_PHONE_NUMBER="'to' parameter of Twilio"
# The phone number, SIP address, or client identifier to call.
TWILIO_PHONE_NUMBER="'from' parameter of Twilio"
TWILIO_ACCOUNT_SID="your twilio account sid"
TWILIO_AUTH_TOKEN="your twilio auth token"

# Optional
# Required when specifying slack in checker
SLACK_BOT_TOKEN="your slack bot token"
# This is used when the channel id is not set in the settings.json.
# Channel ID where the bot will post logs; must be the same as the channel your app notifies.
SLACK_CHANNEL_ID="your slack channel id"
```

### settings.json

You may also want to prepare the following `settings.json` if necessary

```json
{
  "appName": "your app name",
  "checker": "slack",
  "dotenvOverride": true,
  "maxRetries": 3,
  "retryInterval": 60,
  "retryMessage": "⚠️ Wait {retryInterval} seconds and then run again because the logs could not be confirmed. ({retryCount}/{maxRetries})",
  "callTimeout": 20,
  "confirmLogRegex": "testing for (ios|android) incoming call from ([0-9]{3,4}-?){3}",
  "startMessage": "=== start ===",
  "endMessage": "=== end ===",
  "alertMessage": "🚨 Logs could not be verified.",
  "slack": {
    "loggingChannelId": "your slack channel id",
    "alertChannelId": "your slack chennel id",
    "goodReaction": "white_check_mark"
  }
}
```

When you wish to use retryInterval, maxRetries and count of retries in a retryMessage, you can replace them with `{retryInterval}`, `{maxRetries}` and `{retryCount}`.

## Usage

Basic usage

```shell
pnpm build
node dist/index.js
```

This script will be used primarily with crontab. Below is a sample of an hourly run.

```shell
0 */1 * * * cd /path/to/this/repo && /path/to/node dist/index.js
```

## Test

Currently not supported.

However, you can use dryrun to check the entire operation.

```shell
# will be failed
pnpm dryrun
# will be successful
IS_CONFRIMED=true pnpm dryrun
```
