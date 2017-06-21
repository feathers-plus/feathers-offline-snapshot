# feathers-offline-snapshot

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs/feathers-offline-snapshot.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/feathersjs/feathers-offline-snapshot.png?branch=master)](https://travis-ci.org/feathersjs/feathers-offline-snapshot)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-offline-snapshot/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-offline-snapshot.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-offline-snapshot)
[![Download Status](https://img.shields.io/npm/dm/feathers-offline-snapshot.svg?style=flat-square)](https://www.npmjs.com/package/feathers-offline-snapshot)

> Offline-first snapshot strategy. Read selected records from service.


## Installation

```
npm install feathers-offline-snapshot --save
```

## Documentation

```javascript
import snapshot from 'feathers-offline-snapshot';
snapshort(service, query).then(records => ...);
```

- `service` (*required*) - The service to read.
- `query` (*optional*, default: `{}`) - The
[Feathers query object](https://docs.feathersjs.com/api/databases/querying.html)
selecting the records to read.
Some of the props it may include are:
    - `$limit` (*optional*, default: 200) - Records to read at a time.
    The service's configuration may limit the actual number read.
    - `$skip` (*optional*, default: 0) will initially skip this number of records.
    - `$sort` (*optional*, default: `{}`) will sort the records.
    You can sort on multiple props, for example `{ field1: 1, field2: -1 }`.


## Example

```js
const snapshot = require('feathers-offline-snapshot');

const app = ... // Configure Feathers, including the `/messages` service.
const username = ... // The username authenticated on this client
const messages = app.service('/messages');

snapshot(messages, { username, $sort: { channel: 1 } })
  .then(records => {
    console.log(records);
  });
```


## What is the Snapshot strategy?

Snapshot distributes data exactly as it appears at a specific moment in time and does not monitor for updates to the data.
When synchronization occurs, the entire snapshot is generated and sent to client service.

> Snapshot can be used by itself, but the snapshot process is also commonly used to provide the initial set of data for all the other strategies.

Using Snapshot by itself is most appropriate when one or more of the following is true:
- Data changes infrequently.
- It is acceptable to have copies of data that are out of date with respect to the remote service for a period of time.
- Replicating small or medium volumes of data.
- A large volume of changes occurs over a short period of time.
- Keep the current values after having lost connection for some time.

Snapshot replication is most appropriate when data changes are substantial but infrequent.
For example, if a sales organization maintains a product price list and the prices are all updated at the same time once or twice each year,
replicating the entire snapshot of data after it has changed is recommended.
Given certain types of data, more frequent snapshots may also be appropriate.
For example, if a relatively small table is updated on a remote service during the day,
but some latency is acceptable, changes can be delivered nightly as a snapshot.

Snapshot has a lower continuous overhead on both the client and the remote than the other strategies,
because incremental changes are not tracked.
However, if the dataset set is very large,
it will require substantial resources to generate and apply the snapshot.
Consider the size of the entire data set and the frequency of changes to the data when evaluating whether to utilize snapshot replication.

(*)


## Snapshot Case Study

Let's consider a mobile application for movie cinemas, which lists show times.

![Cinema panels](./assets/snapshot-2a.jpg)

Let's assess the data problem.
- Cinemas change once a year.
- The schedule changes every Thursday.
- The static information rarely changes.
- We need to support ticket reservations.
- We don't need past data.

Let's look at the data. We need:
- 12 cimema photos + their names + coordinates
- 25 film posters + film names
- 30 movie times for each cinemas

This is about 7k of files and 2M of photos, which takes less space than 1 Facebook photo.

The problem definition contains the solution:

![Cinema flowchart](./assets/snapshot-2d.jpg)

The snapshot strategy is the simplest one to satisfy the needs.

How about ticket reservations? You got to do some things online!
However, you can still give a telephone number.

(**)

#### Sources:

- (*) [Microsoft](https://docs.microsoft.com/en-us/sql/relational-databases/replication/snapshot-replication)
- (**) [MarinTodorov](https://www.slideshare.net/MarinTodorov/overcome-your-fear-of-implementing-offline-mode-in-your-apps?next_slideshow=1)


## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
