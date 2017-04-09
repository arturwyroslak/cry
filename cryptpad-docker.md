# Cryptpad Docker Image

- Configuration via .env file
- Ready for use with traffic
- Using github master for now, release 0.3.0 too old
- Creating customize folder
- Adding config.js to customize folder
- Persistance for datastore and customize folder

## Run

Run from the cryptpad source directory:

```
docker build -t xwiki/cryptpad .
docker run --restart=always -d --name cryptpad -p 3000:3000 -v /var/cryptpad:/cryptpad/datastore xwiki/cryptpad
```

Or, using docker-compose

```
docker-compose up -d
```

## TODO

```
cryptpad_1  | Linking config.js
cryptpad_1  | Using secure websockets: true
cryptpad_1  | Using storage adapter: './storage/file'
cryptpad_1  | sed: -e expression #1, char 27: unknown option to `s'
```

## Configuration

Set configurations Dockerfile or in .env (using docker-compose) file.

- VERSION=latest
- USE_SSL=false
- STORAGE='./storage/file'
- LOG_TO_STDOUT=true

The .env variables are read by docker-compose and forwarded to docker container.
On runtime, in `bin/container-start.sh` the settings are written to the `config.js` file.


## Persistance

The docker-compose file is preconfigured to persist folders

- cryptpad/datastore --> ./data/customize
- cryptpad/customize --> ./data/customize

In customize included find your configuration in `config.js`.

The data folder is ignored by git, so if you want to add your customizations to git versioning change the volume:

```
./customize:/cryptpad/customize:rw
```

## SSL Proxy

The [traefik](https://traefik.io/) proxy has builtin Let'sEncrypt for easy SSL setup.
In the docker-compose file you can find preset lables for usage with traefik.

[Traefik Docker Image](https://hub.docker.com/_/traefik/)

Alternativly just use plain old nginx.
