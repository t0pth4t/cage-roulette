import { h } from 'preact';
import { Link } from 'preact-router/match';
import cage from '../../assets/cage.png';

import style from './style';

const Header = () => (
  <header class={style.header}>
    <img alt='cage' style={{ width: '45px' }} src={cage} />
    <h1>Cage Roulette</h1>
    <nav>
      <Link activeClassName={style.active} href='/'>
        Home
      </Link>
      <Link activeClassName={style.active} href='/about'>
        About
      </Link>
    </nav>
  </header>
);

export default Header;
