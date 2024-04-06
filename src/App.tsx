import { useState, useEffect, forwardRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getComic } from './services/comic';
import { Comic } from './services/models/Comic';
import { VirtuosoGrid } from 'react-virtuoso';
import { ComicThumbNail } from './components/Comic';

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

function App() {
  const [visibleRange, setVisibleRange] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getComic(visibleRange.startIndex+1, visibleRange.endIndex+1)
    .then(response => response.json())
    .then(comics => {
      setComics(comics);
      setLoading(false);
    });
  }, [visibleRange]);

  return (
    <>
      <h1>XKCD explorer</h1>
        <VirtuosoGrid
          style={{ height: 500, width: 900 }}
          totalCount={1000}
          useWindowScroll
          rangeChanged={setVisibleRange}
          components={gridComponents}
          itemContent={(index) => {
            console.log('index', index);
            return <ItemWrapper>
              <ComicThumbNail comic={loading ? {} : comics[index]}/>
            </ItemWrapper>
          }}
        />
    </>
  )
}

export default App
