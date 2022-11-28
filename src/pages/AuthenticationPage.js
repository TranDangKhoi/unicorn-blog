import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Logo from "assets/images/blog-logo.png";

const AuthenticationPageStyles = styled.div`
  background: #f2f2f2;
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    background: white;
    border-radius: 12px;
    padding: 40px;
    max-width: 700px;
    margin: 0 auto;
  }
  .redirect {
    margin-top: 20px;
    font-size: 16px;
  }
  .redirect-link {
    color: ${(props) => props.theme.primary};
    font-weight: 500;
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img srcSet={`${Logo} 1.5x`} alt="unicorn-blog" className="logo" />
        <h1 className="heading">Unicorn Blog</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

AuthenticationPage.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationPage;
