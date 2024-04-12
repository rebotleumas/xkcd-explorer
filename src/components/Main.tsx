import { useState, useCallback, useEffect, forwardRef, useMemo, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { getComic } from '../services/comic';
import { Comic } from '../services/models/Comic';
import { VirtuosoGrid } from 'react-virtuoso';
import { ComicThumbNail } from './Comic';
import './Main.css';

const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: "0.5rem",
        width: "33%",
        display: "flex",
        flex: "none",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  )
}

const ItemWrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      textAlign: "center",
      padding: "1rem 1rem",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);


export const Main = ({ filter, setFilter }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const loadMore = (currentComics, currentOffset) => {
      setLoading(true);
      getComic({...filter, idFrom: currentOffset, idTo: currentOffset + pageSize})
        .then(response => {
          return response.json();
        }).then(json => {
          const newState = currentComics.concat(json.comics);
          setTotal(json.total);
          setComics(newState);
          setLoading(false);
        })
  };

  useEffect(() => {
    loadMore([], 1);
  }, [filter]);

  useEffect(() => {
    loadMore(comics, offset);
  }, [offset]);

  return (
    <>
    <div className="card">
      <h1>XKCD Explorer</h1>
      {loading ? (<div>Loading</div>) : (<VirtuosoGrid
              style={{ height: 500, width: 900 }}
              totalCount={total}
              data={comics}
              useWindowScroll
              components={gridComponents}  
              increaseViewportBy={200}
              endReached={(index) => {
                if (index < total - 1) {
                  setOffset(offset + pageSize)
                }
              }}        
              itemContent={(index, comic) => {
                return <ItemWrapper>
                              <ComicThumbNail comic={comic}/>
                            </ItemWrapper>
              }}
            />)}
    </div>
    </>
  )
}