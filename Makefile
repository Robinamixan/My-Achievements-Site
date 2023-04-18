#!/bin/bash

.PHONY: just-work
just-work:
	if [ ! -f ./.env ]; then \
        cp .env.example .env; \
    fi
	@docker-compose -f docker-compose.yml build
	@docker-compose -f docker-compose.yml up -d
	@printf "$(GREEN)The project has been set up and launched$(NOCOLOUR)\n"

.PHONY: start
start:
	@docker-compose -f docker-compose.yml up -d

.PHONY: stop
stop:
	@docker-compose -f docker-compose.yml stop

.PHONY: rebuild-and-start
rebuild-and-start:
	@docker-compose -f docker-compose.yml up --build --force-recreate -d

.PHONY: bash
bash:
	@docker exec -it my_achievements_app bash

