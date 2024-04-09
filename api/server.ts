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

const getRangeFromDate = async (dateFrom, dateTo) => {
    const latestComic = await fetch(`https://xkcd.com/info.0.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }).then(res => {
            let body = res.json();
            return body
        });

    const end = latestComic.num;
    const startId = await getComicIdFromDate(dateFrom, end);
    const endId = await getComicIdFromDate(dateTo, end);

    return _.range(startId, endId);
}

const fetchComic = (id) => {
    return fetch(`https://xkcd.com/${id}/info.0.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        }).then(res => {
            let body = res.json();
            comicCache.set(id, body, 3600);
            return body
        });
}

app.get('/comic', cors(corsOptions), async (req, res) => {
    const idFrom = req.query.idFrom;
    const idTo = req.query.idTo;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let idRange = [];

    // TODO: validate query parameters
    if (dateFrom && dateTo) {
        idRange = await getRangeFromDate(dateFrom, dateTo);
    }

    if (idFrom && idTo) {
        idRange = _.range(idFrom, idTo);
    }
    const promises = idRange.map(id => {
        let comic = comicCache.get(id);
        if (comic) {
            console.log(`Retrieving comic number ${id} from cache...`);
            return comic
        }

        return fetchComic(id);
    });

    const jsonResponse = await Promise.all(promises);
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});