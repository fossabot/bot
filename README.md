# Atlas

<div>
		<img src="https://img.shields.io/github/license/get-atlas/bot.svg" alt="License">
		<img src="https://img.shields.io/github/package-json/v/get-atlas/bot.svg?maxAge=300&label=version" alt="Version">
</div>

<div>
    <a href="https://translate.atlasbot.xyz/">
			<img src="https://d322cqt584bo4o.cloudfront.net/getatlas/localized.svg?maxAge=300" alt="Crowdin Translations">
		</a>
    <a href="https://get-atlas.xyz/support">
			<img src="https://img.shields.io/discord/345177567541723137.svg?maxAge=300" alt="Discord">
		</a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fget-atlas%2Fbot?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fget-atlas%2Fbot.svg?type=shield"/></a>
    <a href="https://hub.docker.com/r/sylver/bot">
			<img src="https://img.shields.io/docker/pulls/sylver/bot.svg?maxAge=300" alt="Docker">
		</a>
</div>

A Discord bot that does ~~all~~ most of the things - [atlasbot.xyz](https://atlasbot.xyz)

**This is Atlas 8.0, an unfinished version of Atlas**. Source code for pre-8.0 versions will not be made public. The code here isn't finished, and while it should work fine, it's missing a lot of the features the live version has. Slowly they'll be ported over. Contributions are welcome.

## Prerequisites

- [Docker](https://docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/) >=10.0.0 (not required for self-hosting)

## Installation

### Self-hosting

1. Install [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)

2. Clone this repo

   ```bash
   git clone https://github.com/get-atlas/bot.git
   ```

3. Open a terminal in the cloned folder

4. Copy `.env.example` to `.env` and fill in the required env variables

5. Start the bot with `docker-compose up -d`

### Development

1. Clone this repo

   ```bash
   git clone https://github.com/get-atlas/bot.git
   ```

2. Open a terminal in the cloned folder

3. Run `npm i` to install dependencies

4. Copy `.env.example` to `.env` and fill in the env variables

5. Start Lavalink, Redis and Mongo via `docker-compose up -d mongo lavalink redis`

   If you are using docker-compose to host these services, you can leave the defaults in `.env.example` for those services and it should be gucci.

6. Start the bot with `npm start`

7. Start breaking things

## Environment Variables

| Name           | Description                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PREFIXES       | A list of all prefixes the bot will listen for by default, split by commas. @mention will be replaced with the bot's mention.                                                        |
| DEFAULT_PREFIX | The default prefix for Atlas to use. By default, this is "a!"                                                                                                                        |
| NODE_ENV       | The environment the bot is in, should be "production" or "development".                                                                                                              |
| TOKEN          | The bot token to login with.                                                                                                                                                         |
| MONGO_URI      | A MongoDB Connection URI.                                                                                                                                                            |
| VERBOSE        | Whether or not to use verbose logging (e.g, logging commands) - you'll probably want this disabled in a production environment.                                                      |
| OWNER          | The bot's owner ID. **For security, this should only be set to user ID's that already have direct access to the host server.**                                                       |
| DEFAULT_LANG   | The default language to use for everything. Valid languages are in [/locales](/locales)                                                                                              |
| LAVALINK_NODES | An array of Lavalink nodes. See example for more info.                                                                                                                               |
| OMDBAPI_KEY \* | An [OMDBAPI](http://omdbapi.com/apikey.aspx) key.                                                                                                                                    |
| GOOGLE_CX \*   | A Google CX key for custom searches. Google is your friend.                                                                                                                          |
| GOOGLE_KEY \*  | A Google key for custom searches. See above.                                                                                                                                         |
| REDIS_HOST \*  | The host for Redis. When not provided, Atlas will default to [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which are good enough:tm:. |
| REDIS_PASS \*  | The password for the Redis server                                                                                                                                                    |
| REDIS_PORT \*  | The port for the Redis server                                                                                                                                                        |
| YOUTUBE_KEY \* | A YouTube Data API key. Currently only used for autoplay.                                                                                                                            |
| DBL_KEY \*     | A [discordbots.org](https://discordbots.org/) API Token, used to get information about other bots 🕵                                                                                 |
| PATREON_KEY \* | Used to tell who is a patreon and who isn't.                                                                                                                                         |

_\* Optional, but some features may not work without them._

## A minor note on tags

The current implementation from [nirewen/tatsuscript](https://github.com/nirewen/tatsuscript) is more or less temporary to test plugins that rely on tags (like actions). It will be replaced soon:tm: or cleaned up/overhauled.

## Disclaimer / Warning

This is a very early version of 8.0, which means many features from 7.x are missing. Some features are still being ported over, be patient. Additionally, if you find any issues, tell us or submit a PR to get it fixed.

## Acknowledgements

- lib/utils/parseTime - from [Aetheryx/remindme](https://github.com/Aetheryx/remindme/blob/edb8d301c633379e7fa3d4141226143cc3358906/src/utils/parseTime.js), licensed under MIT.
- lib/utils/cleanArgs - from [abalabahaha/eris](https://github.com/abalabahaha/eris/blob/e6208fa8ab49d526df5276620ac21eb351da3954/lib/structures/Message.js#L147), licensed under MIT.
- src/tagengine - now with added flavour from [nirewen/tatsuscript](https://github.com/nirewen/tatsuscript), licensed under MIT.


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fget-atlas%2Fbot.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fget-atlas%2Fbot?ref=badge_large)