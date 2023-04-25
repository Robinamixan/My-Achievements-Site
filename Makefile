#!/bin/bash

RED=\033[0;31m
GREEN=\033[0;32m
NOCOLOUR=\033[0m

.PHONY: just-work
just-work:
	if [ ! -f ./.env ]; then \
        cp .env.example .env; \
        @printf "$(GREEN)Created .env file with default settings.$(NOCOLOUR)\n" \
    fi
	@docker-compose -f docker-compose.yml build
	@docker-compose -f docker-compose.yml up -d
	@printf "$(GREEN)The project has been set up and launched.$(NOCOLOUR)\n"

.PHONY: start
start:
	@docker-compose -f docker-compose.yml up -d

.PHONY: stop
stop:
	@docker-compose -f docker-compose.yml stop

.PHONY: rebuild-and-start
rebuild-and-start:
	@docker-compose -f docker-compose.yml up --build --force-recreate -d

.PHONY: nodemon
nodemon:
	@docker exec -it my_achievements_app npm run nodemon

.PHONY: test
test:
	@docker exec -it my_achievements_app npm test

.PHONY: eslint
eslint:
	@docker exec -it my_achievements_app ./node_modules/.bin/eslint ./src ./test app.js --ext .js
	@printf "$(GREEN)Project checked$(NOCOLOUR)\n"

.PHONY: eslint-fix
eslint-fix:
	@docker exec -it my_achievements_app ./node_modules/.bin/eslint ./src ./test app.js --ext .js --fix
	@printf "$(GREEN)Project checked$(NOCOLOUR)\n"

.PHONY: bash
bash:
	@docker exec -it my_achievements_app bash

