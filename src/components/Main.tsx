import { useState, useCallback, useEffect, forwardRef, useMemo } from 'react';
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


export const Main = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 100;

  const loadMore = useCallback(() => {
      setLoading(true);
      getComic(page, page + pageSize)
        .then(response => {
          return response.json();
        }).then(json => {
          const newState = comics.concat(json);
          setComics(newState);
          setLoading(false);
          setPage(page + pageSize);
        })
  });

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
    <div className="card">
      <h1>XKCD explorer</h1>
      <VirtuosoGrid
        style={{ height: 500, width: 900 }}
        totalCount={1000}
        data={comics}
        useWindowScroll
        components={gridComponents}  
        endReached={loadMore}        
        itemContent={(index) => {
          return loading ? (<div>Loading</div>) : (<ItemWrapper>
                        <ComicThumbNail comic={comics[index]}/>
                      </ItemWrapper>)
        }}
      />
    </div>
    </>
  )
}