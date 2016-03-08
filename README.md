# calf

The original monolithic codebase for AdRhino

## Getting Started

* Install MongoDB
* Install Node
* We use some bleeding edge stuff, so get the latest `nvm install 5 && nvm alias default 5 && sudo npm install npm -g`
* Copy env vars, get sensitive from Craig`cp .env.test .env`
* `npm install`
* `npm run dev`

Uses standard for linting, install the [Standard Format](https://packagecontrol.io/packages/StandardFormat) plugin for autocorrection.

## TODOs

* Write sharify for Koa
* Write efficient browserify-dev-middleware
* Wrap `convert` middleware in big lib