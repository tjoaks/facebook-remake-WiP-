import './style.css';
import { Link } from 'react-router-dom';
import {
  Logo,
  Search,
  HomeActive,
  Market,
  Gaming,
  Watch,
  Friends,
  Menu,
  Notifications,
  ArrowDown,
  Messenger,
} from '../../svg';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import UserMenu from './userMenu';
import useClickOutside from '../../helpers/clickOutside';

export default function Header() {
  const { user } = useSelector((user) => ({ ...user }));
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const all_menu = useRef(null);
  useClickOutside(all_menu, () => {
    setShowAllMenu(false);
  });
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            className="hide_input"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link to="" className="middle_icon active">
          <HomeActive />
        </Link>
        <Link to="" className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to="" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className="circle_icon hover1"
          ref={all_menu}
          onClick={() => {
            setShowAllMenu((prev) => !prev);
          }}
        >
          <Menu />
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
