import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Swal from "sweetalert2";
import { userRole } from "utils/constants";

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px 0px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  @media screen and (max-width: 1023.98px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }
`;

const sidebarLinksForAdmin = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Profile",
    url: "/profile",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 5C16.9045 5 17.6067 5 18.1111 5.33706C18.3295 5.48298 18.517 5.67048 18.6629 5.88886C19 6.39331 19 7.09554 19 8.5V18C19 19.8856 19 20.8284 18.4142 21.4142C17.8284 22 16.8856 22 15 22H9C7.11438 22 6.17157 22 5.58579 21.4142C5 20.8284 5 19.8856 5 18V8.5C5 7.09554 5 6.39331 5.33706 5.88886C5.48298 5.67048 5.67048 5.48298 5.88886 5.33706C6.39331 5 7.09554 5 8.5 5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 12L15 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 16L13 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Articles",
    url: "/manage/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "User",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Logout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    signOutButton: true,
  },
];
const sidebarLinksForUsers = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Profile",
    url: "/profile",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 5C16.9045 5 17.6067 5 18.1111 5.33706C18.3295 5.48298 18.517 5.67048 18.6629 5.88886C19 6.39331 19 7.09554 19 8.5V18C19 19.8856 19 20.8284 18.4142 21.4142C17.8284 22 16.8856 22 15 22H9C7.11438 22 6.17157 22 5.58579 21.4142C5 20.8284 5 19.8856 5 18V8.5C5 7.09554 5 6.39331 5.33706 5.88886C5.48298 5.67048 5.67048 5.48298 5.88886 5.33706C6.39331 5 7.09554 5 8.5 5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 12L15 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 16L13 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Your articles",
    url: "/manage/posts",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Logout",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    signOutButton: true,
  },
];
const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const handleSignOut = async () => {
    await Swal.fire({
      title: "Are you sure you want to log out?",
      text: "Don't go please :(",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#1DC071",
      cancelButtonText: "No, don't log out!",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOut(auth);
        navigate("/sign-in");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        toast.success("Cancelled logging out!", {
          autoClose: 1000,
        });
      }
    });
  };
  if (userInfo.role === userRole.ADMIN) {
    return (
      <SidebarStyles className="sidebar">
        {sidebarLinksForAdmin.map((link) => {
          if (link?.onClick) {
            return (
              <NavLink
                to={link.url}
                onClick={link.onClick}
                className="menu-item"
                key={link.title}
              >
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            );
          } else if (link?.signOutButton) {
            return (
              <button
                to={"/"}
                onClick={handleSignOut}
                className="menu-item"
                key={link.title}
              >
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </button>
            );
          } else {
            return (
              <>
                <NavLink to={link.url} className="menu-item" key={link.title}>
                  <span className="menu-icon">{link.icon}</span>
                  <span className="menu-text">{link.title}</span>
                </NavLink>
              </>
            );
          }
        })}
      </SidebarStyles>
    );
  } else {
    return (
      <SidebarStyles className="sidebar">
        {sidebarLinksForUsers.map((link) => {
          if (link?.onClick) {
            return (
              <NavLink
                to={link.url}
                onClick={link.onClick}
                className="menu-item"
                key={link.title}
              >
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            );
          } else if (link?.signOutButton) {
            return (
              <button
                to={"/"}
                onClick={handleSignOut}
                className="menu-item"
                key={link.title}
              >
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </button>
            );
          } else {
            return (
              <>
                <NavLink to={link.url} className="menu-item" key={link.title}>
                  <span className="menu-icon">{link.icon}</span>
                  <span className="menu-text">{link.title}</span>
                </NavLink>
              </>
            );
          }
        })}
      </SidebarStyles>
    );
  }
};

export default DashboardSidebar;
