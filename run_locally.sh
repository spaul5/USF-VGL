#!/bin/bash

docker build -t usf-vgl:v1 .

docker run -d -p 80:80 usf-vgl:v1
