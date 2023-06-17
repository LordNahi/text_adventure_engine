import { useEffect, useState } from 'react';

import { classes } from 'typestyle/lib/internal/utilities';
import { ZOOM, getGridZoomStyle } from './util';
import { gridContainer, gridContent, tile } from './style';

const DungeonGrid = () => {
  const [zoom, setZoom] = useState(ZOOM);

  const onScroll = (event: WheelEvent) => {
    const scrolledUp = event.deltaY < 0;
    const scrollFactor = 0.1;
    const scrollIncrement = scrolledUp ? scrollFactor : -scrollFactor;

    setZoom((prevZoom) => prevZoom + scrollIncrement);
  };

  useEffect(() => {
    window.addEventListener('wheel', onScroll);

    return () => {
      window.removeEventListener('wheel', onScroll);
    };
  }, [setZoom]);

  const zoomStyle = getGridZoomStyle(zoom);

  return (
    <div className={gridContainer}>
      <div className={classes(gridContent, zoomStyle)}>
        <div className={tile}>1</div>
        <div className={tile}>2</div>
        <div className={tile}>3</div>
        <div className={tile}>4</div>
        <div className={tile}>5</div>
        <div className={tile}>6</div>
        <div className={tile}>7</div>
        <div className={tile}>8</div>
        <div className={tile}>9</div>
      </div>
    </div>
  );
};

export default DungeonGrid;
