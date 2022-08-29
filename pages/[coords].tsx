import Grid from "components/Grid"
import useGridSelector from "hooks/useGridSelector";
import { GetServerSideProps } from "next";
import Link from "next/link"
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import move from "store/reducers/grid/actions/move";
import gridInitialState from "store/reducers/grid/initialState";
import GridState from "store/reducers/grid/state";
import { AppDispatch } from "store/store";

type TilePageProps = {
  x: number;
  y: number;
}

const TilePage = ({ x, y }) => {
  const { canvasId } = useGridSelector()
  const dispatch = useDispatch<AppDispatch>();

  const [newx, setnewx] = useState(x);
  const [newy, setnewy] = useState(y);

  const router = useRouter();
  const handleGridMove = ({ x, y }) => {
    router.replace(`/${x},${y}`)
  }
  
  return (
    <>
    <Grid mapId={canvasId} initialX={x} initialY={y} onMove={handleGridMove} />
    <input value={newx} onChange={e => setnewx(e.target.value)} /><input value={newy} onChange={e => setnewy(e.target.value)} />
    <Link href={`/${newx},${newy}`}>test</Link>
    </>
  )
}

export default TilePage

export const getServerSideProps: GetServerSideProps<TilePageProps, { coords: string }> = async ({ params }) => {
  const [x, y] = params?.coords.split(',').map(n => Number(n) || 0) || [0, 0]
  
  const grid = { ...gridInitialState, x, y }

  return {
    props: {
      x, y,
      state: { grid }
    }
  }
}
