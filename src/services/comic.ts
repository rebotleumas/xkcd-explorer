import { useState } from "react";
import { Comic } from './models/Comic';

export function getComic(idFrom: number, idTo: number): Comic {
	return fetch(`http://localhost:8443/comic?idFrom=${idFrom}&idTo=${idTo}`, {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	});
};