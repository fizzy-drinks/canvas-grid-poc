import Grid from 'components/Grid';
import useGridSelector from 'hooks/useGridSelector';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import move from 'store/reducers/grid/actions/move';
import { AppDispatch } from 'store/store';

interface TilePageProps {
  x: number;
  y: number;
}

const TilePage: FC<TilePageProps> = ({ x, y }) => {
  const [newx, setnewx] = useState(x);
  const [newy, setnewy] = useState(y);

  const router = useRouter();
  const handleGridMove = ({ x, y }) => {
    router.replace(`/${x},${y}`);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { x: prevX, y: prevY } = useGridSelector();
  useEffect(() => {
    if (x !== prevX || y !== prevY) {
      dispatch(move({ x, y }));
    }
  }, [x, y]);

  return (
    <>
      <h1>routed grid</h1>
      <p>
        this grid on the other hand is routed, meaning URL changes affect it.
      </p>
      <p>
        this is done via Next&apos;s server side props and routing systems
        instead of tying the grid component to the routing. this allows us to
        avoid side effects as long as the url doesn&apos;t change
      </p>
      <Grid initialX={x} initialY={y} onMove={handleGridMove} />
      <p>
        changing the values below will change where the link points to, so you
        can test the navigation.
      </p>
      <input
        type='number'
        value={newx}
        onChange={(e) => setnewx(Number(e.target.value))}
        className='border p-1'
      />
      <input
        type='number'
        value={newy}
        onChange={(e) => setnewy(Number(e.target.value))}
        className='border p-1'
      />
      <p className='my-1'>
        <Link href={`/${newx},${newy}`}>
          <a className='text-blue-800 underline'>test</a>
        </Link>
      </p>
    </>
  );
};

export default TilePage;

export const getServerSideProps: GetServerSideProps<
  TilePageProps,
  { coords: string }
> = async ({ params }) => {
  const [x, y] = params?.coords.split(',').map((n) => Number(n) || 0) || [0, 0];

  return {
    props: { x, y },
  };
};
