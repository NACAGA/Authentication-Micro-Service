# Starting the Server in a Docker Container

To start the server in a Docker container, follow these steps:

## Step 1: Build the Docker Image

First, navigate to the directory where your server code is located. Open a terminal or command prompt and run the following command to build
the Docker image:

1. Build the docker image with `docker build -t authentication-service .`
2. Run the image with `docker run -d -p 8080:8080 authentication-service`
