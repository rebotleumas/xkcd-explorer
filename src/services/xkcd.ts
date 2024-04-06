import { useState } from "react";

export type Xkcd = {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export function fetchXkcd(idFrom, idTo) {
	return fetch(`http://localhost:8443/comic?idFrom=${idFrom}&idTo=${idTo}`, {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	  },
	});
};