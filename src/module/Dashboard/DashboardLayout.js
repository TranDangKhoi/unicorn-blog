import { useAuth } from "contexts/auth-context";
import LoginPage from "pages/LoginPage";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
      &-main {
        grid-template-columns: 100%;
        padding: 20px;
      }
    }
  }
`;
const DashboardLayout = () => {
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Welcome to your dashboard";
  }, []);
  if (!userInfo) return <LoginPage></LoginPage>;
  // useEffect(() => {
  //   document.title = "Your dashboard";
  //   if (!userInfo?.email) {
  //     navigate("/sign-in");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInfo]);
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <DashboardSidebar></DashboardSidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
