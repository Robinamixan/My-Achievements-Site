# Description
Create `.env` file by coping `.env.example` and updating settings. If not do that then `.env` file with default settings will be created.

Run `npm install` to create `node_modules` folder with all dependencies

    npm install

Then execute `just-work` Make command. It will create Docker containers and will start them.

    make just-work

### Start containers
If containers already created then execute `start` command to start containers.

    make start

### Stop containers
To stop containers execute `stop` command.

    make stop

### Rebuild containers
To rebuild containers execute `rebuild-and-start` command.

    make rebuild-and-start
