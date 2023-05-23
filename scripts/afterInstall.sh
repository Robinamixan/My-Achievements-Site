#!/bin/sh
cd /home/ec2-user/projects/My-Achievements-Site-BE/ || exit
docker-compose -f docker-compose.yml stop
docker-compose -f docker-compose.yml up -d