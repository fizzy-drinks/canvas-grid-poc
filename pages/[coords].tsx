import Grid from 'components/Grid';
import useGridSelector from 'hooks/useGridSelector';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

interface TilePageProps {
  x: number;
  y: number;
}

const TilePage: FC<TilePageProps> = ({ x, y }) => {
  const { canvasId } = useGridSelector();

  const [newx, setnewx] = useState(x);
  const [newy, setnewy] = useState(y);

  const router = useRouter();
  const handleGridMove = ({ x, y }) => {
    router.replace(`/${x},${y}`);
  };

  return (
    <>
      <Grid
        mapId={canvasId}
        initialX={x}
        initialY={y}
        onMove={handleGridMove}
      />
      <input
        type='number'
        value={newx}
        onChange={(e) => setnewx(Number(e.target.value))}
      />
      <input
        type='number'
        value={newy}
        onChange={(e) => setnewy(Number(e.target.value))}
      />
      <Link href={`/${newx},${newy}`}>test</Link>
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
