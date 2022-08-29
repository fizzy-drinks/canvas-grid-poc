import Grid from 'components/Grid';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <h1>this page is a sample with a preset coordinate of 0</h1>
      <p>clicking on the grid moves it, as does firing its redux action.</p>
      <Grid initialX={0} initialY={0} />
      <Link href='/0,0'>
        <a className='text-blue-900 underline'>
          routed version (it will snap to 0,0)
        </a>
      </Link>
    </>
  );
};

export default HomePage;
