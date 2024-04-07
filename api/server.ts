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

const requestEndpoint = "https://xkcd.com/327/info.0.json";

app.get('/comic', cors(corsOptions), async (req, res) => {
    const idFrom = req.query.idFrom;
    const idTo = req.query.idTo;

    // TODO: validate query parameters

    const idRange = _.range(idFrom, idTo);
    const promises = idRange.map(id => {
        let comic = comicCache.get(id);
        if (comic) {
            console.log(`Retrieving comic number ${id} from cache...`);
            return comic
        }

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
    });

    const jsonResponse = await Promise.all(promises);
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});