import React from "react";
import { TablePagination } from "@material-ui/core";

export interface CustomTableFooterProps {
  page?: number;
  rowsPerPage?: number;
  count?: number;
  handleChangePage?(event: unknown, newPage: number): void;
  handleChangeRowsPerPage?(event: React.ChangeEvent<HTMLInputElement>): void;
  rowsPerPageOptions: number[];
}

export const CustomTableFooter = ({
  rowsPerPage = 5,
  page = 1,
  count = 0,
  handleChangePage = (event) => {},
  handleChangeRowsPerPage = (event) => {},
  rowsPerPageOptions = [5, 10, 25],
}: CustomTableFooterProps) => {
  return (
    <>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
