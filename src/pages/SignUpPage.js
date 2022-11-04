import React, { useEffect } from "react";
import styled from "styled-components";

const SignUpPageStyles = styled.div`
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
    max-width: 700px;
    margin: 0 auto;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 500;
    font-size: 16px;
  }
  .input {
    font-weight: 500;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
    transition: all 150ms ease-in-out;
    border: 1px solid transparent;
    background: ${(props) => props.theme.grayLight};
    &:focus {
      background-size: white;
      border-color: ${(props) => props.theme.primary};
    }
    &::placeholder {
      color: #84878b;
    }
    &::-webkit-input-placeholder {
      color: #84878b;
    }
    &::-moz-input-placeholder {
      color: #84878b;
    }
  }
`;
const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign up to Unicorn Blog";
  }, []);
  return (
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/blog-logo.png 1.5x" alt="unicorn-blog" className="logo" />
        <h1 className="heading">Unicorn Blog</h1>
        <form className="form">
          <div className="field">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input"
              placeholder="Enter your username"
            />
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
