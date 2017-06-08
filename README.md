# feathers-offline-snapshot

[![Build Status](https://travis-ci.org/feathersjs/feathers-offline-snapshot.png?branch=master)](https://travis-ci.org/feathersjs/feathers-offline-snapshot)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-offline-snapshot.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-offline-snapshot)
[![Download Status](https://img.shields.io/npm/dm/feathers-offline-snapshot.svg?style=flat-square)](https://www.npmjs.com/package/feathers-offline-snapshot)

> Offline-first snapshot replication. Read selected records from (possibly paginated) service.

## Installation

```
npm install feathers-offline-snapshot --save
```

## Documentation

Please refer to the [feathers-offline-snapshot documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-offline-snapshot`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-offline-snapshot');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('/plugin', plugin())
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
