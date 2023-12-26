import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableLinks(props) {
    const { blogData, handleRemoveRecord } = props;
    const [blogDataState, setBlogDataState] = React.useState(blogData);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    React.useEffect(() => {
        setBlogDataState(props.blogData);
        setTimeout(() => {
            setIsDataLoaded(true);
        }, 500);
    }, [props]);

    return (
        <>
            {isDataLoaded && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Alias</TableCell>
                                <TableCell align="left">Target</TableCell>
                                <TableCell align="left">Visit Count</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blogDataState.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="left">{row.alias}</TableCell>
                                    <TableCell align="left">{row.target}</TableCell>
                                    <TableCell align="left">{row.visit_count}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={(e) => handleRemoveRecord(row.id)}>
                                            <DeleteIcon sx={{ color: "red", fontSize: 22 }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}