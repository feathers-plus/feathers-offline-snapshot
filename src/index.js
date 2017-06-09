
import makeDebug from 'debug';
const debug = makeDebug('feathers-offline-snapshot');

export default function snapshot (service, baseQuery) {
  debug(`start: ${JSON.stringify(baseQuery)}`);

  const query = Object.assign({}, { $skip: 0, $limit: 200 }, baseQuery); // use max recs configured
  let fileDatas;

  return service.find({ query })
    .then(result => {
      debug(`read ${(result.data || result).length} records`);

      if (!result.data) {
        return result;
      }

      const { total, limit, skip, data } = result;
      fileDatas = data;

      return (skip + data.length < total) ? readRemainingPages(skip + limit) : fileDatas;
    });

  function readRemainingPages (skip) {
    query.$skip = skip;

    return service.find({ query })
      .then(({ total, limit, skip, data }) => {
        debug(`read ${data.length} records`);

        fileDatas = fileDatas.concat(data);

        return (skip + data.length < total) ? readRemainingPages(skip + limit) : fileDatas;
      });
  }
}
