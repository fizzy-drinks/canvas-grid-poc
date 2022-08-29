import { useSelector } from 'react-redux';
import GridState from 'store/reducers/grid/state';

const useGridSelector = () =>
  useSelector<{ grid: GridState }, GridState>((state) => state.grid);

export default useGridSelector;
