import { useState } from "react";
import { Comic, Filter } from './models/Comic';


export const getComic = async (filter: Filter): Comic => {
	const response = await fetch(getUrl(filter), {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	});

	return response;
};

const getUrl = (filter: Filter): string => {
	const baseUrl = 'http://localhost:8443/comic';
	return `${baseUrl}?${filter.idFrom ? `idFrom=${filter.idFrom}` : ''}&${filter.idTo ? `idTo=${filter.idTo}` : ''}&${filter.dateFrom ? `dateFrom=${filter.dateFrom}` : ''}&${filter.dateTo ? `dateTo=${filter.dateTo}` : ''}`
}