import { createAsyncThunk } from '@reduxjs/toolkit';
import GridState from '../state';
import gridImageSrc from './grid.png';

type MoveActionOptions = {
  x: number;
  y: number;
};

type MoveActionPayload = { x: number; y: number };

const cache: Record<string, HTMLImageElement> = {};

const getOrCreateImage = async (src: string, width: number, height: number) => {
  let image = cache[src];
  if (!image) {
    image = new Image();
    image.width = width;
    image.height = height;
    await new Promise<void>((r) => {
      image.addEventListener('load', () => r());
      image.src = src;
    });
    cache[src] = image;
  }

  return cache[src];
};

const move = createAsyncThunk<
  MoveActionPayload,
  MoveActionOptions,
  { state: { grid: GridState } }
>('grid/move', async ({ x, y }, thunkApi) => {
  const {
    canvasId,
    imageSrc,
    imageSize,
    x: oldX,
    y: oldY,
    init,
  } = thunkApi.getState().grid;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = canvas.width;
  shadowCanvas.height = canvas.height;
  const shctx = shadowCanvas.getContext('2d');
  shctx && (shctx.fillStyle = 'gray');
  shctx?.fillRect(0, 0, canvas.width, canvas.height);

  const image = await getOrCreateImage(
    imageSrc,
    imageSize.width,
    imageSize.height
  );

  const imageCanvas = document.createElement('canvas');
  imageCanvas.width = imageSize.width;
  imageCanvas.height = imageSize.height;
  const gridWithImageCtx = imageCanvas.getContext('2d');

  const gridImage = await getOrCreateImage(
    gridImageSrc.src,
    gridImageSrc.width,
    gridImageSrc.height
  );

  gridWithImageCtx?.drawImage(image, 0, 0);
  gridWithImageCtx?.drawImage(gridImage, 0, 0);

  if (!init) {
    shctx?.drawImage(imageCanvas, -x, -y);
    ctx?.drawImage(shadowCanvas, 0, 0);
    return { x, y };
  }

  const animateTimeMs = 400;
  const fps = 60;
  const frames = (fps / 1000) * animateTimeMs;

  const xDiff = x - oldX;
  const yDiff = y - oldY;

  const xStep = Math.ceil(xDiff / frames);
  const yStep = Math.ceil(yDiff / frames);

  const xdir = x - oldX;
  const ydir = y - oldY;

  const recur = async (currentX: number, currentY: number): Promise<void> => {
    const stop =
      (xdir >= 0 ? currentX >= x : currentX <= x) ||
      (ydir >= 0 ? currentY >= y : currentY <= y);
    if (stop) return;

    return new Promise<void>((resolve) => {
      requestAnimationFrame(async () => {
        shctx?.fillRect(0, 0, canvas.width, canvas.height);
        shctx?.drawImage(imageCanvas, -currentX, -currentY);
        ctx?.drawImage(shadowCanvas, 0, 0);
        await recur(currentX + xStep, currentY + yStep);
        resolve();
      });
    });
  };
  await recur(oldX, oldY);

  return {
    x,
    y,
  };
});

export default move;
