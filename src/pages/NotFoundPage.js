import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NotFoundGif from "assets/images/404.gif";

const NotFoundPageStyles = styled.div`
  .gif {
    margin: 0 auto;
  }
  .sub-header {
    color: black;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: 500;
  }
  .header {
    margin-top: 20px;
    color: black;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: 700;
  }
  .redirect {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    transition: all 150ms ease-in-out;
    &:hover {
      > * {
        color: ${(props) => props.theme.primary};
      }
    }
  }
  .text {
    color: black;
    font-size: 16px;
    margin-left: 10px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <div className="container">
        <img srcSet={NotFoundGif} alt="" className="gif" />
        <h1 className="header">Oops! Page not found</h1>
        <h2 className="sub-header">The page you finding isn't existed</h2>
        <Link className="redirect" to={"/"}>
          <i class="fa-solid fa-backward"></i>
          <div className="text">Go back to homepage</div>
        </Link>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
