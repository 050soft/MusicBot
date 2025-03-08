# MusicBot
name is subject to change once I think of one

I started this project to develop my skills further by challenging myself with some new things and to develop my portfolio. However, feel free to contribute if you wish. Any code help or even tips on what to change are greatly appreciated.    

# Usage
To run this bot for yourself, rename the [.env-example](.env-example) file to .env, then fill in everything with your info.
<details><summary><b>.env example</b></summary>

```shell
TOKEN=DISCORD_TOKEN
PUBLIC_KEY=DISCORD_PUBLIC_KEY
CLIENT_SECRET=DISCORD_CLIENT_SECRET
DISCOGS_CONSUMER_KEY=DISCOGS_CONSUMER_KEY
DISCOGS_CONSUMER_SECRET=DISCOGS_CONSUMER_SECRET
LASTFM_API_KEY=LASTFM_API_KEY
LASTFM_SHARED_SECRET=LASTFM_SHARED_SECRET
MONGODB_DATABASE_URL=MONGODB_DATABASE_URL
MONGODB_DATABASE_USER=MONGODB_DATABASE_USER
MONGODB_DATABASE_PASSWORD=MONGODB_DATABASE_PASSWORD
```

</details>

To get the actual keys, secrets and tokens to run the bot properly you will have to create a Discord bot application, a Last.fm API account and a Discogs API account. The database URL could be a direct URL to a MongoDB cloud database.

> [!NOTE]
> The Discogs [API](https://www.discogs.com/developers#page:home,header:home-rate-limiting) has a pretty strict rate limit of 60 requests, per source per minute. They also require the use of a identifying user agent. 

## TODO
See [TODO.md](TODO.md)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
See [LICENSE](LICENSE)