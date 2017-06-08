// import errors from 'feathers-errors';
import makeDebug from 'debug';

const debug = makeDebug('feathers-offline-snapshot');

export default function init () {
  debug('Initializing feathers-offline-snapshot plugin');
  return 'feathers-offline-snapshot';
}
