import { Button } from "components/Button";
import IconSearch from "components/Icon/IconSearch";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyles = styled.header`
  padding: 15px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .header-sub {
    margin-left: auto;
    max-width: 520px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }
  .logo {
    display: block;
    max-width: 100px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 20px;
    list-style: none;
  }
  .menu-link {
    font-size: 18px;
    font-weight: 500;
  }

  .active-link {
    color: ${(props) => props.theme.primary};
  }
  .search {
    padding: 15px;
    height: 56px;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 16px;
    position: relative;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #999;
  }
  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
  }
  .username {
    font-size: 16px;
    font-weight: 500;
  }
  .avatar {
    border-radius: 100rem;
    width: 40px;
    height: 40px;
  }
`;

const Header = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <Link to="/">
            <img
              srcSet="/blog-logo.png 2x"
              alt="Unicorn-Blog"
              className="logo"
            />
          </Link>
          <ul className="menu">
            {menuLinks.length > 0 &&
              menuLinks.map((item) => (
                <li className="menu-link" key={item.title}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                    to={item.url}
                    key={item.url}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="header-sub">
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Search for posts..."
              />
              <IconSearch className="search-icon"></IconSearch>
            </div>
            {userInfo ? (
              <div className="user">
                <img src={userInfo.photoURL} alt="" className="avatar" />
                <div className="username">{userInfo?.displayName}</div>
                <Button height="56px" to={"/sign-in"} onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Button height="56px" to={"/sign-in"}>
                Login to your account
              </Button>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;