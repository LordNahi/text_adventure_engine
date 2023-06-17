import { style } from 'typestyle';

enum Colours {
  primary = '#272727',
  secondary = '#1E1E1E'
}

export const appContainer = style({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  width: '100vw'
});

export const sectionBase = style({
  display: 'flex'
});

export const menuContext = style({
  padding: '10px',
  flexBasis: '25%',
  backgroundColor: Colours.secondary
});

export const menuContent = style({
  padding: '10px',
  flexBasis: '75%',
  backgroundColor: Colours.primary
});
