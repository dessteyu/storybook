import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
export function TableLoader({
  rowDepth = 3,
  cellDepth = 5,
}: {
  rowDepth?: number;
  cellDepth?: number;
}) {
  return (
    <TableBody>
      {Array.from(Array(rowDepth).keys()).map((i) => (
        <TableRow key={i}>
          {Array.from(Array(cellDepth).keys()).map((itd) => (
            <TableCell key={itd}>
              <Skeleton
                animation="pulse"
                variant="text"
                width="100%"
                height={30}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
