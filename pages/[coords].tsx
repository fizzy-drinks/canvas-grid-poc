import Grid from 'components/Grid';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import move from 'store/reducers/grid/actions/move';
import { AppDispatch } from 'store/store';

interface TilePageProps {
  x: number;
  y: number;
}

const TilePage: FC<TilePageProps> = ({ x, y }) => {
  const router = useRouter();
  const handleGridMove = ({ x, y }) => {
    router.replace(`/${x},${y}`);
  };

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <h1>routed grid</h1>
      <p>
        this grid&apos;s initial state is determined by the route the page loads
        in. since it&apos;s client-side routed, further navigations won&apos;t
        affect it, allowing for better control of when the grid should actually
        move using the redux actions.
      </p>
      <Grid initialX={x} initialY={y} onMove={handleGridMove} />
      <p>
        clicking the link below will not affect the grid at all, because Next
        understands you&apos;re in the same page as before and only a parameter
        changed, so the initialValue won&apos;t be used. If we want to move the
        grid, we have to use an onClick listener. This prevents accidental
        movement due to side effects.
      </p>
      <p>
        However, if you click the link and then refresh the page, the grid will
        be centered in 500,500 as the route suggests, so if you start at this
        page, move around a bit and then decide to share the URL, it will be
        centered where you intended.
      </p>
      <p className='my-1'>
        <Link
          href={`/500,500`}
          legacyBehavior={false}
          className='text-blue-800 underline'
        >
          500,500 (broken)
        </Link>
      </p>
      <p className='my-1'>
        <Link
          href={`/500,500`}
          legacyBehavior={false}
          onClick={() => dispatch(move({ x: 500, y: 500 }))}
          className='text-blue-800 underline'
        >
          500,500 (works, because it has an onClick event that dispatches an
          action)
        </Link>
      </p>
      <p className='my-1'>
        <Link
          href='/'
          legacyBehavior={false}
          className='text-blue-800 underline'
        >
          back to non-routed page
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
