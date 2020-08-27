import React from "react";
import { TableRow, TableCell, Checkbox, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Column } from "./table";
import { TableTheme } from "./tableTheme";
import "styled-components";

export interface CustomRowProps<RowData extends any> {
  columns: Column<RowData>[];
  rowContent: RowData;
  rowsIdentifier: string;
  onRowChecked?(data: RowData): void;
  onRowClick?(data: RowData): void;
  onRowDelete?(data: RowData): void;
  onRowEdit?(data: RowData): void;
  handleRowSelectClick(
    event: React.MouseEvent<unknown, MouseEvent>,
    id: string
  ): void;
  rowsCount?: number;
  selectRowsCount?: number;
  refetchTableData?(): Promise<any>;
  hasSelection?: boolean;
  asAction?: boolean;
  isRowSelected(rowIdentifier: any): boolean;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: TableTheme.headerTextColor,
      // padding: theme.spacing(1),
    },
    body: {
      fontSize: 14,
      color: TableTheme.elementRowColor,
    },
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: TableTheme.oldRowColors,
      },
      cursor: "pointer",
      "& .MuiTableCell-root": {
        padding: 0,
      },
    },
  })
)(TableRow);

function FormattedTableCell<T extends any>({
  column,
  currentCell,
}: {
  column: Column<T>;
  currentCell: any;
}) {
  return (
    <>
      {column.render ? column.render(currentCell) : currentCell[column.field]}
    </>
  );
}

export const CustomTableRow = <T extends any>({
  rowContent,
  columns,
  rowsCount,
  selectRowsCount,
  rowsIdentifier,
  onRowChecked,
  refetchTableData,
  hasSelection,
  onRowClick,
  onRowDelete,
  onRowEdit,
  isRowSelected,
  asAction,
  handleRowSelectClick,
}: CustomRowProps<T>) => {
  const rowId = rowContent[rowsIdentifier];
  const isSelected = isRowSelected(rowId);
  return (
    <>
      <StyledTableRow
        role="checkbox"
        onClick={(event) => {
          event.stopPropagation();
          onRowClick && onRowClick(rowContent);
        }}
      >
        {hasSelection && (
          <StyledTableCell align="right" padding="checkbox">
            <Checkbox
              css={`
                "& .PrivateSwitchBase-root-12" {
                  padding: 0;
                }
              `}
              checked={isSelected || rowContent === selectRowsCount}
              onClick={(event) => {
                event.stopPropagation();
                handleRowSelectClick(event, rowId);
                onRowChecked && onRowChecked(rowContent);
              }}
            />
          </StyledTableCell>
        )}
        {columns?.map((column) => (
          <StyledTableCell key={column.field} align="right">
            <FormattedTableCell column={column} currentCell={rowContent} />
          </StyledTableCell>
        ))}
        {asAction && (
          <StyledTableCell align="center">
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onRowEdit && onRowEdit(rowContent);
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                onRowDelete && onRowDelete(rowContent);
              }}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </StyledTableCell>
        )}
      </StyledTableRow>
    </>
  );
};
