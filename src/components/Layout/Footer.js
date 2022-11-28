import React from "react";
import styled from "styled-components";
import Logo from "assets/images/blog-logo.png";
const FooterStyles = styled.footer`
  margin-top: 100px;
  padding: 20px;
  border-top: 1px solid #ccc;
  .footer {
    &-logo {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 15px;
      margin-bottom: 30px;
      span {
        font-weight: 500;
        font-size: 30px;
        color: ${(props) => props.theme.primary};
      }
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
    }

    &-column {
      margin-top: 20px;
    }
    &-row {
      list-style-type: none;
      color: ${(props) => props.theme.black};
      h3 {
        font-size: 20px;
        color: ${(props) => props.theme.primary};
      }
    }

    &-item {
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      line-height: 2.2;
    }
  }
  @media screen and (max-width: 767.98px) {
    .footer {
      &-list {
        grid-template-columns: repeat(1, 1fr);
        place-items: start;
      }
    }
  }
`;
const Footer = () => {
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer-logo">
          <img srcSet={`${Logo} 2x`} alt="Logo" />
          <span>Unicorn Blog</span>
        </div>
        <div className="footer-list">
          <FooterContent
            header={"Need help?"}
            row1="FAQ"
            row2="Contact us"
            row3="Terms and conditions"
            row4="Feedback"
          ></FooterContent>
          <FooterContent
            header="Blogs with folks"
            row1="Share your stories"
            row2="Most recent blogs"
            row3="Popular blogs"
            row4="Well-known authors"
          ></FooterContent>
          <FooterContent
            header={"AdSense"}
            row1="How does AdSense work"
            row2="Get earnings from AdSense"
          ></FooterContent>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;

function FooterContent({ header, row1, row2, row3, row4, ...props }) {
  return (
    <div className="footer-content">
      <ul className="footer-row">
        <h3>{header}</h3>
        <div className="footer-column">
          <li className="footer-item">{row1}</li>
          <li className="footer-item">{row2}</li>
          <li className="footer-item">{row3}</li>
          <li className="footer-item">{row4}</li>
          {props.row5 && <li className="footer-item">{props.row5}</li>}
        </div>
      </ul>
    </div>
  );
}
