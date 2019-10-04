import { h } from 'preact';
import style from './style';
import Movies from '../movies/index';

const Home = () => (
	<div class={style.home}>
		<Movies />
	</div>
);

export default Home;
