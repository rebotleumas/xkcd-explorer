import { useState } from "react";
import { Comic } from './models/Comic';

export function getComic(filter: {idTo: number, idFrom: number, dateFrom: string, dateTo: string}): Comic {
	return fetch(getUrl(filter), {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	});
};

const getUrl = (filter) => {
	const baseUrl = 'http://localhost:8443/comic';
	return `${baseUrl}?${filter.idFrom ? `idFrom=${filter.idFrom}` : ''}&${filter.idTo ? `idTo=${filter.idTo}` : ''}&${filter.dateFrom ? `dateFrom=${filter.dateFrom}` : ''}&${filter.dateTo ? `dateTo=${filter.dateTo}` : ''}`
}