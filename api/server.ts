const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const _ = require('lodash');
const NodeCache = require( "node-cache" ); 
const Promise = require('promise');

const PORT = 8443;
const app = express();
const comicCache = new NodeCache();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:5173"
};

const getComicIdFromDate = async (date, end) => {
  let start = 1;
  let comic;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if(mid === 404) {
        continue;
    }
    comic = await fetchComic(mid);
    const comicDate = comic.year + '-' + (Number(comic.month) < 10 ? '0'+comic.month : comic.month) + '-' + (Number(comic.day) < 10 ? '0'+comic.day : comic.day);
    
    if (comicDate === date) {
      return comic.num;
    }

    if (Date.parse(date) < Date.parse(comicDate)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return comic.num;
}

const getIdRangeFromDate = async (dateFrom, dateTo) => {
    const latestComic = await fetchComic(-1);
    const end = latestComic.num;
    const startId = await getComicIdFromDate(dateFrom, end);
    const endId = await getComicIdFromDate(dateTo, end);

    return [startId, endId];
}

const fetchComic = (id) => {
    const url = (id === -1) ? `https://xkcd.com/info.0.json` : `https://xkcd.com/${id}/info.0.json`;
    return fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }).then(res => {
            if (res.ok) {
                const body = res.json();
                comicCache.set(id, body, 3600);
                return body
            } else {
              throw `Failed to fetch id ${id}`;
            }
        }).catch(error => {
            console.log(error);
            return {}
        });
}

app.get('/comic', cors(corsOptions), async (req, res) => {
    const idFrom = req.query.idFrom;
    const idTo = req.query.idTo;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let startId = 0;
    let endId = 0;
    let total = 0;

    // TODO: validate query parameters
    if (dateFrom && dateTo) {
        const startAndEndId = await getIdRangeFromDate(dateFrom, dateTo);
        startId = startAndEndId[0];
        endId = startAndEndId[1];
        total = endId - startId;
    } else {
        total = (await fetchComic(-1)).num
    }
    
    if (idFrom && idTo) {
        startId += Number(idFrom);
        endId = endId === 0 ? startId + Number(idTo) : Math.min(endId, startId + Number(idTo));
        if (startId > 1) {
            startId -= 1
        }
    }

    const idRange = _.range(startId, endId);
    const promises = idRange.map(id => {
        let comic = comicCache.get(id);
        if (comic) {
            return comic
        }

        return fetchComic(id);
    });

    const jsonResponse = await Promise.all(promises);
    res.json({ 'comics': jsonResponse, 'total': total });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});