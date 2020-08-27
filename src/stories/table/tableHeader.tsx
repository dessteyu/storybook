import React from "react";
import { Column } from "./table";
import {
  withStyles,
  TableRow,
  TableHead,
  TableCell,
  Checkbox,
  TableSortLabel,
} from "@material-ui/core";
import { TableTheme } from "./tableTheme";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
export interface TableHeaderProps<T extends any> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order?: "asc" | "desc";
  orderBy?: keyof T;
  rowCount?: number;
  columns: Column<T>[];
  selectedRowsCount?: number;
  onAllRowChecked?(event: React.ChangeEvent<HTMLInputElement>): void;
  hasSelection?: boolean;
  asAction?: boolean;
}
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: TableTheme.headerTextColor,
    },
    body: {
      fontSize: 14,
      color: TableTheme.elementRowColor,
    },
  })
)(TableCell);
export function TableHeader<T extends any>({
  columns,
  hasSelection,
  asAction,
  onAllRowChecked,
  selectedRowsCount = 0,
  rowCount = 0,
  onRequestSort,
  orderBy,
  order,
}: TableHeaderProps<T>) {
  const styles = useStyles();
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };
  return (
    <>
      <TableHead>
        <TableRow>
          {hasSelection && (
            <StyledTableCell align="right" padding="checkbox">
              <Checkbox
                onChange={onAllRowChecked}
                indeterminate={
                  selectedRowsCount > 0 && selectedRowsCount < rowCount
                }
                checked={rowCount > 0 && selectedRowsCount === rowCount}
              />
            </StyledTableCell>
          )}
          {columns.map((item) => (
            <StyledTableCell key={item.field} align="right">
              <TableSortLabel
                active={orderBy === item.field}
                direction={orderBy === item.field ? order : "asc"}
                onClick={createSortHandler(item.field as any)}
              >
                {item.field}
                {orderBy === item.field ? (
                  <span className={styles.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
          {asAction && (
            <StyledTableCell key="Actions" align="center">
              Actions
            </StyledTableCell>
          )}
        </TableRow>
      </TableHead>
    </>
  );
}
