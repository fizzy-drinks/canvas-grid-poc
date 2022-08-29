import { createAsyncThunk } from "@reduxjs/toolkit";
import GridState from "../state";

type MoveActionOptions = {
  x: number;
  y: number;
}

type MoveActionPayload = { x: number, y: number }

const move = createAsyncThunk<MoveActionPayload, MoveActionOptions, { state: { grid: GridState } }>('grid/move', async ({x, y}, thunkApi) => {
  const { canvasId, imageSrc, x: oldX, y: oldY, init } = thunkApi.getState().grid;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const image = new Image();

  if (!init) {
    image.addEventListener('load', async () => {
      ctx.drawImage(image, -x, -y);
    })
    image.src = imageSrc;
    return { x, y }
  }

  await new Promise<void>((resolve) => {
    const animateTimeMs = 400;
    const fps = 60;
    const frames = (fps / 1000) * animateTimeMs;

    const xStep = (x - oldX) / frames;
    const yStep = (y - oldY) / frames;

    image.addEventListener('load', async () => {
      const xdir = x - oldX;
      const ydir = y - oldY;

      const recur = async (currentX: number, currentY: number): Promise<void> => {
        const cond = (xdir >= 0 ? currentX < x : currentX > x) || (ydir >= 0 ? currentY < y : currentY > y);
        if (!cond) return;

        return new Promise<void>(resolve => {
          requestAnimationFrame(async () => {
            currentX += xStep;
            currentY += yStep;
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, -currentX, -currentY);
            await recur(currentX + xStep, currentY + yStep);
            resolve();
          })
        })
      }
      await recur(oldX, oldY);
      resolve();
    })
    image.src = imageSrc;
  })

  return {
    x, y
  };
})

export default move;
