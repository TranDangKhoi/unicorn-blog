import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  table {
    width: 100%;
  }
  thead {
    background-color: #f1f1f1;
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding: 20px 30px;
    font-weight: 700;
    text-align: center;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
    background-color: #f8f8f8;
  }
  tbody td {
    font-weight: 500;
    font-size: 17px;
  }
  tbody tr {
    border: 1px solid #ccc;
    border-bottom-color: transparent;
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
