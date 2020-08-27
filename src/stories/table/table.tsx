import React from "react";
import "./table.css";
import { CustomTableRow } from "./customRow";
import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { TableHeader } from "./tableHeader";
import { TableLoader } from "./tableLoader";
import { CustomTableFooter } from "./tableFooter";
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
// trie function
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//   end

export interface Column<RowData extends any> {
  title: React.ReactNode;
  field: string;
  width?: number;
  align?: "center" | "left" | "right";
  render?(data: RowData): void;
  padding?: any;
  type?: "numeric" | "date";
  lookup?: any;
}

export interface TableProps<RowData extends any> {
  onRowClick?(data: RowData): void;
  onRowDelete?(data: RowData): void;
  onRowEdit?(data: RowData): void;
  onRowChecked?(data: RowData): void;
  onAllRowChecked?(data: string[]): void;
  rowsIdentifier: string;
  tableData: RowData[];
  columns: Column<RowData>[];
  isLoading?: boolean;
  refetchTableData?(): Promise<any>;
  hasSelection?: boolean;
  asAction?: boolean;
  orderByIdentifier?: keyof RowData;
}

export function CustomTable<RowData extends any>({
  columns = [],
  isLoading = true,
  hasSelection = true,
  onRowClick = (rowData) => {},
  rowsIdentifier,
  onRowDelete = (rowData) => {},
  onRowEdit = (rowData) => {},
  refetchTableData = async () => {},
  tableData = [],
  asAction = true,
  onAllRowChecked,
  onRowChecked,
  orderByIdentifier = rowsIdentifier as keyof RowData,
}: TableProps<RowData>) {
  // selected
  const styles = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof RowData>(
    orderByIdentifier
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlerSelectAll = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = tableData.map(
          (currentCell: any) => currentCell[rowsIdentifier]
        );
        setSelected(newSelecteds);
      } else {
        setSelected([]);
      }
      onAllRowChecked && onAllRowChecked(selected);
    },
    [tableData, rowsIdentifier, selected, onAllRowChecked]
  );

  const handleRowSelectClick = React.useCallback(
    (event: React.MouseEvent<unknown>, id: string) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const totalRowsSelectedCount = React.useMemo(() => selected.length, [
    selected,
  ]);
  const totalDataToShowCount = React.useMemo(() => tableData?.length || -1, [
    tableData,
  ]);
  const isRowSelected = React.useCallback(
    (name: string) => {
      return selected.includes(name);
    },

    [selected]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RowData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = React.useMemo(() => {
    let result = stableSort(tableData, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return result;
  }, [tableData, order, orderBy, page, rowsPerPage]);

  return (
    <TableContainer component={Paper} className={styles.paper}>
      <Table
        size="medium"
        aria-label="customized table"
        className={styles.table}
      >
        <TableHeader
          columns={columns}
          onRequestSort={handleRequestSort}
          hasSelection={hasSelection}
          asAction={asAction}
          onAllRowChecked={handlerSelectAll}
          rowCount={totalDataToShowCount}
          selectedRowsCount={totalRowsSelectedCount}
          orderBy={orderBy}
          order={order}
        />
        {isLoading ? (
          <TableLoader />
        ) : (
          <TableBody>
            {sortedRows?.map((rowContent, index) => (
              <CustomTableRow
                key={`${rowContent[rowsIdentifier]}${index}`}
                columns={columns}
                rowContent={rowContent}
                rowsIdentifier={rowsIdentifier}
                hasSelection={hasSelection}
                asAction={asAction}
                onRowEdit={onRowEdit}
                onRowDelete={onRowDelete}
                onRowClick={onRowClick}
                onRowChecked={onRowChecked}
                selectRowsCount={totalRowsSelectedCount}
                rowsCount={totalDataToShowCount}
                isRowSelected={isRowSelected}
                handleRowSelectClick={handleRowSelectClick}
              />
            ))}
          </TableBody>
        )}
      </Table>
      <CustomTableFooter
        rowsPerPageOptions={[5, 10, 25]}
        handleChangePage={handleChangePage}
        count={tableData?.length}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </TableContainer>
  );
}
