# Running a Self-Hosted Instance

The B2NOTE server is distributed as a Docker image and available at [Docker Hub](https://hub.docker.com/repository/docker/b2note/b2note-nodejs). 

The preferred way of installation is using Docker Compose using the instructions below.

## Set Up

Make sure you have Docker and Docker Compose installed on the server. Clone the repository containing the deployment scripts:

```
git clone https://github.com/e-sdf/b2note-deployment
```

The deployment repo contains the `docker-compose.yml` file that defines the `b2note-nodejs` and `mongo` services. Moreover, the `mongodbdata` volume is used for the MongoDB database, to persist the data. 

Next, create `b2note.env` configuration file:

```
cp b2note.env.sample b2note.env
```

Edit the file to set your local settings. 

Note: The `GAUTH_...` settings are currently not used and just [B2ACCESS](https://b2access.eudat.eu/home) is used for authentication.

## Pull the Image

Pull the image from Docker hub by running

```
cd b2note-deployment
./pull.sh
``` 

The script pulls the `b2note-nodejs` and `mongo` images from Docker Hub.

### Run the Server

First, it is advisable to run the services in a non-detached mode to see the startup logs in the terminal. If everything is set correctly, you will see the message `B2NOTE server listening on port 3060`.

```
./run.sh
```

If everything is ok, you may press `CTRL+C` to stop the services and run them in a detached mode:

```
./spawn.sh
```

## Configuration

### Ports

The standard ports used by B2NOTE are 3060 for the NodeJS server and 27018 for the MongoDB database. If you want to change these:

- Edit the `docker-compose.yml` file.
- Edit `B2NOTE_PORT` and `MONGODB_URL` in `b2note.env`.

### B2NOTE Version

By default, the `latest` version is pulled from Docker Hub. If you wish to use a different version, change it in the `version` file.