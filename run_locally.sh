#!/bin/bash

docker build -t spaul5/usf-vgl:v1 .

docker run -d -p 80:80 spaul5/usf-vgl:v1
