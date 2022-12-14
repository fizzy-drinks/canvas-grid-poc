import useGridSelector from 'hooks/useGridSelector';
import { FC } from 'react';
import { MouseEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import move from 'store/reducers/grid/actions/move';
import { AppDispatch } from 'store/store';

export type GridProps = {
  initialX: number;
  initialY: number;
  onMove?: (coords: { x: number; y: number }) => void;
};

const Grid: FC<GridProps> = ({ initialX, initialY, onMove }) => {
  const { canvasId, x: currentX, y: currentY } = useGridSelector();
  const dispatch = useDispatch<AppDispatch>();
  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    const newX =
      currentX +
      event.pageX -
      event.currentTarget.offsetLeft -
      event.currentTarget.offsetWidth / 2;
    const newY =
      currentY +
      event.pageY -
      event.currentTarget.offsetTop -
      event.currentTarget.offsetHeight / 2;
    dispatch(move({ x: newX, y: newY }));
    onMove?.({ x: newX, y: newY });
  };

  useEffect(() => {
    dispatch(move({ x: initialX, y: initialY }));
  }, []);

  return (
    <canvas
      id={canvasId}
      width={600}
      height={400}
      className='border'
      onClick={handleClick}
    />
  );
};

export default Grid;
