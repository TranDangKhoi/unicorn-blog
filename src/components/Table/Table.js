import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  &::-webkit-scrollbar {
    width: 5px; // set width cho scrollbar
    border-radius: 100rem;
  }

  &::-webkit-scrollbar-track {
    width: 5px; // set width cho scrollbar

    background: #ccc; // set background cho scrollbar track (các phần có màu ghi chưa được kéo tới)
    border-radius: 100rem;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px; // set width cho scrollbar
    background: ${(props) =>
      props.theme.primary}; // setback ground cho chính thanh scrollbar
    border-radius: 100rem;
  }
  table {
    width: 100%;
  }
  thead {
    background-color: #f0f0f0;
  }
  th,
  td {
    vertical-align: middle;
    text-align: center;
  }
  th {
    padding: 20px 30px;
    font-weight: 700;
    text-align: center;
  }
  td {
    padding: 15px 30px;
    white-space: nowrap;
  }
  tbody {
    background-color: #f8f8f8;
  }
  tbody td {
    font-weight: 500;
    font-size: 17px;
  }
  tbody tr {
    border-bottom-color: transparent;
  }
  @media screen and (max-width: 1279.98px) {
    thead th {
      font-size: 16px;
    }
    tbody td {
      font-size: 14px;
    }
  }
`;
const Table = ({ children, className = "" }) => {
  return (
    <TableStyles className={className}>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
