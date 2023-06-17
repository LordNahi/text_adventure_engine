import { style } from 'typestyle';

export const gridContainer = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'scroll',
  scrollbarWidth: 'none',
  $nest: {
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  backgroundColor: 'chocolate'
});

export const gridContent = style({
  height: 'fit-content',
  width: 'fit-content',
  display: 'grid',
  padding: '10px',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
  gap: '10px',
  backgroundColor: 'aqua'
});

export const tile = style({
  width: '20px',
  height: '20px',
  fontSize: '24px',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: 'crimson'
});
