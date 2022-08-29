type GridState = {
  canvasId: string;
  imageSrc: string;
  imageSize: { width: number; height: number };
  x: number;
  y: number;
  init: boolean;
};

export default GridState;
