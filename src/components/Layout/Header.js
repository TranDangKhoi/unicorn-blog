import { Button } from "components/Button";
import IconSearch from "components/Icon/IconSearch";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "assets/images/blog-logo.png";
import styled from "styled-components";
import { useState } from "react";
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
  position: relative;
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-hamburger {
    display: none;
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
    transition: all 150ms ease-in-out;
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
  .user-display {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 56px;
    cursor: pointer;
    column-gap: 7px;
    border-radius: 8px;
    border: 1px solid #cfcfcf;
  }
  .username {
    font-size: 16px;
    font-weight: 500;
  }
  .avatar {
    border-radius: 100rem;
    width: 35px;
    height: 35px;
  }
  .sign-out {
    display: block;
  }

  @media screen and (min-width: 1024px) {
    .menu-link:nth-child(5) {
      margin-left: auto;
    }
  }

  @media screen and (max-width: 1023.98px) {
    .header-main {
      column-gap: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .header-hamburger {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    .logo {
      max-width: 50px;
    }
    .username {
      font-size: 14px;
      font-weight: 500;
    }
    .avatar {
      border-radius: 100rem;
      width: 30px;
      height: 30px;
    }
    .sign-out {
      display: none;
    }

    .menu {
      position: fixed;
      background: white;
      width: 290px;
      padding: 20px 25px;
      height: 100%;
      display: flex;
      flex-direction: column;
      z-index: 20;
      left: 0;
      top: 0;
      bottom: 0;
      margin: unset;
      transform: translateX(-100%);
      &.is-expand {
        transform: translateX(0);
      }
      li:first-child {
        order: 2;
      }
      li:nth-child(2) {
        order: 3;
      }
      li:nth-child(3) {
        order: 4;
      }
      li:nth-child(4) {
        order: 1;
      }
      li:nth-child(5) {
        order: 5;
      }
    }
  }
`;
function getLastName(username) {
  if (!username) return "User";
  const length = username.split(" ").length;
  return username.split(" ")[length - 1];
}
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleSignOut = () => {
    signOut(auth);
  };
  const { userInfo, setUserInfo } = useAuth();
  useEffect(() => {
    setUserInfo(auth.currentUser);
  }, [setUserInfo]);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <HeaderStyles>
        <div className="container">
          <div className="header-main">
            <div className="header-hamburger" onClick={handleShowMenu}>
              <i className="fa-solid fa-bars"></i>
            </div>
            <Link className="logo" to="/">
              <img srcSet={`${Logo} 3x`} alt="Unicorn-Blog" />
            </Link>
            <ul className={`menu ${showMenu ? "is-expand" : ""}`}>
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
              <li className="menu-link">
                <div className="search">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search for posts..."
                  />
                  <IconSearch className="search-icon"></IconSearch>
                </div>
              </li>
              <li className="menu-link">
                {userInfo ? (
                  <div className="user">
                    <div className="user-display">
                      <img
                        src={auth?.currentUser?.photoURL}
                        alt=""
                        className="avatar"
                      />
                      <div className="username">
                        {getLastName(auth?.currentUser?.displayName)}
                      </div>
                    </div>
                    <Button
                      className="sign-out"
                      height="56px"
                      to={"/dashboard"}
                    >
                      Your dashboard
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="header-button"
                    height="56px"
                    to={"/sign-in"}
                  >
                    Login to your account
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </HeaderStyles>
      {showMenu && (
        <div
          className="fixed inset-0 z-[14] bg-black bg-opacity-50 overlay"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
