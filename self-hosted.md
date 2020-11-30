# Running a Self-Hosted Instance

The B2NOTE services are distributed as a Docker images and available at [Docker Hub](https://hub.docker.com/repository/docker/b2note/b2note-nodejs). 

The preferred way of installation is using Docker Compose using the instructions below.

## Service Architecture

The B2NOTE service consists of the following parts

- `b2note-api` &#8212; annotation API server
- `b2note-widget` &#8212; widget for embedding in services + its server
- `b2note-app` &#8212; Central UI application + its server

## Set Up for Deployment

Make sure you have Docker and Docker Compose installed on the server. Clone the repository containing the deployment scripts:

```
git clone https://github.com/e-sdf/b2note-deployment
```

The repository contains the following convenience scripts:

- `pull-{api/widget/app/web}` &#8212; pulls the respective image from Docker Hub. It also stops the possibly already-running container and removes the old image.
- `start-{api/widget/app/web}` &#8212; starts the respective service in *non-detached* mode. Useful for first-time runs, as the service log is shown, which enables to check if the service started correctly and track possible problems.
- `spawn-{api/widget/app/web}` &#8212; starts the respective service in the *detached mode*.

Before you run a service, you need to configure it according to the information below.

## Setting Up API Server

Create `.env` configuration file. In the `b2note-deployment` directory, issue the commands:

```
cd b2note-api
cp .env.sample .env
```

Edit the file to customise your local settings; the `SOLR_URL` item points to a SOLR server used for semantic index. In case you have your own, set this variable to a different value.

Note: The `GAUTH_...` settings are currently not used and just [B2ACCESS](https://b2access.eudat.eu/home) and [OpenAIRE AAI](https://www.openaire.eu) is used for authentication.

Next, the `b2note-api` directory contains `docker-compose.yml` that defines the `b2note-api` and `mongo` services. Moreover, the `mongodbdata` volume is used for the MongoDB database, to persist the data. For details on the possible settings, refer the [Docker Compose documentation](https://docs.docker.com/compose/compose-file).

### Changing the Default Ports

The standard ports used by the B2NOTE API server are 3060 for the NodeJS server and 27018 for the MongoDB database. If you want to change these:

- Edit the `ports` section in the `docker-compose.yml` file.
- Edit `B2NOTE_PORT` and `MONGODB_URL` variables in `.env`.

### Changing the Version

By default, the `latest` version is pulled from [Docker Hub](https://hub.docker.com/repository/docker/b2note/b2note-api) and used. If you wish to use a different version, you need to make the respective change in the following files:

- `pull-api.sh`
- `b2note-api/docker-compose.yml`

## Setting Up the Widget Server

Create `.env` configuration file. In the `b2note-deployment` directory, issue the commands:

```
cd b2note-widget
cp .env.sample .env
```

Edit the file to customise your local settings. `JS_SOLR_URL` item points to a SOLR server used for semantic index. In case you have your own, set this variable to a different value.

### Changing the Default Port

The standard ports used by the B2NOTE Widget server is 3061. If you want to change it:

- Edit the `ports` section in the `docker-compose.yml` file.
- Edit `PORT` variable in `.env`.

### Changing the Version

By default, the `latest` version is pulled from [Docker Hub](https://hub.docker.com/repository/docker/b2note/b2note-widget) and used. If you wish to use a different version, you need to make the respective change in the following files:

- `pull-api.sh`
- `b2note-widget/docker-compose.yml`

## Setting Up the App Server

Create `.env` configuration file. In the `b2note-deployment` directory, issue the commands:

```
cd b2note-app
cp .env.sample .env
```

The standard ports used by the B2NOTE Widget server is 3070. If you want to change it:

- Edit the `ports` section in the `docker-compose.yml` file.
- Edit `PORT` variable in `.env`.

### Changing the Version

By default, the `latest` version is pulled from [Docker Hub](https://hub.docker.com/repository/docker/b2note/b2note-app) and used. If you wish to use a different version, you need to make the respective change in the following files:

- `pull-api.sh`
- `b2note-app/docker-compose.yml`

## Accessing B2NOTE from the Internet

After following the steps above, you should have the B2NOTE services running locally. To enable access from the Internet, you need either to open the ports on your server, or use a proxy server, such as [Apache](https://httpd.apache.org) or [Nginx](http://nginx.org). Using a proxy server is recommended. Follow the instructions of the selected solution.