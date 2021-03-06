import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import style from './Navbar.module.css';

const Navbar: FC = () => (
  <nav className={style.nav}>
    <div className={style.item}>
      <Link to="/profile">Profile</Link>
    </div>
    <div className={style.item}>
      <Link to="/dialogs">Dialogs</Link>
    </div>
    <div className={style.item}>
      <a href="#s">News</a>
    </div>
    <div className={style.item}>
      <a href="#s">Music</a>
    </div>
    <div className={style.item}>
      <Link to="/users">Users</Link>
    </div>
    <div className={style.item}>
      <a href="#s">Settings</a>
    </div>
  </nav>
);

export default Navbar;
