import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

const GameTable = () => {
  const [txnArray, setTxnArray] = useState<any>([]);
  useEffect(() => {
    fetchContractTxns();
  }, []);

  const fetchContractTxns = async () => {
    const res = await axios.get("http://localhost:8000/polygonTxns");
    console.log(res?.data?.result?.result, "API data");
    const txns = res?.data?.result?.result;

    const txnLogs = txns?.map((ele: any) => {
      const { hash, input, from_address, to_address, block_timestamp } = ele;
      const timeStamp = new Date(block_timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
      return {
        hash,
        input,
        to_address,
        from_address,
        timeStamp,
      };
    });
    setTxnArray(txnLogs);
    console.log(txnLogs, "txns Logs");
  };

  const CopyClick = (account:any) => {
    copy(account);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Txn Hash</StyledTableCell>
            <StyledTableCell align="right">From&nbsp;(address)</StyledTableCell>
            <StyledTableCell align="right">To&nbsp;(address)</StyledTableCell>
            <StyledTableCell align="right">Time&nbsp;(Date)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {txnArray.map((row: any) => (
            <StyledTableRow key={row.hash}>
              <StyledTableCell component="th" scope="row">
                {row.hash}&nbsp;
                <IconButton>
                  <ContentCopyIcon
                    style={{
                      fontSize: "14px",
                    }}
                    onClick={() => CopyClick(row.hash)}
                  />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.from_address}
              </StyledTableCell>
              <StyledTableCell align="right">{row.to_address}</StyledTableCell>
              <StyledTableCell align="right">{row.timeStamp}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameTable;
