import { style } from 'typestyle';

export const TILE_WIDTH = 50;
export const TIULE_HEIGHT = TILE_WIDTH;
export const ZOOM = 1;

export const getGridZoomStyle = (zoom: number) => {
  return style({
    transform: `scale(${zoom})`
  });
};
