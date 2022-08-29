import lavender from 'styles/lavender.jpg';
import GridState from './state';

const gridInitialState: GridState = {
  canvasId: 'nix-canvas',
  imageSrc: lavender.src,
  x: 0,
  y: 0,
  init: false,
};

export default gridInitialState;
