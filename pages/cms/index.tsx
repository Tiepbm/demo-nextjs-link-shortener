import { useEffect, useState } from 'react';
import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import TableLinks from "../../components/TableLinks";
import TableBlogLoading from "../../components/TableBlogLoading";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
    const [queryData, setQueryData] = useState<any>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const { data, error } = useSWR('api/getAll', fetcher);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsDataLoaded(false);
        const url = "http://localhost:3000/api/getAll";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                setQueryData(response);

            })
            .catch(function (error) {
                // handle error
                setIsDataLoaded(true);
                setIsError(true);
                setErrorMsg(error.message);

            })
            .finally(function () {
                setIsDataLoaded(true);
            });
    };

    //* A D D   R E C O R D
    const handleAddRecord = async () => {
        fetch("http://localhost:3000/api/add", {
            method: "POST",
            body: JSON.stringify({ alias: title, target: body }),
        })
            .then((response) => {
                fetchData();
            })
            .catch(function (error) {
                // handle error
                setIsError(true);
                setErrorMsg(error.message);

            })
            .finally(function () {

            });

    };

    //* R E M O V E   R E C O R D
    const handleRemoveRecord = async (id: number) => {
        // console.log("handleRemoveRecord", id);
        setIsDataLoaded(false);
        fetch("http://localhost:3000/api/delete", {
            method: "POST",
            body: JSON.stringify({ id: id }),
        })
            .then((response) => {
                // console.log("Then Response", response);
                fetchData();
            })
            .catch(function (error) {
                // handle error
                setIsError(true);
                setErrorMsg(error.message);
            })
            .finally(function () {

            });

    };

    return (
        <Container maxWidth={'xl'}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Stack spacing={2}>
                        <TextField
                            type="text"
                            id="standard-basic"
                            label="Alias"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            type="text"
                            multiline
                            rows={4}
                            id="standard-basic"
                            label="Target"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Button variant="contained"
                                disabled={title.length <= 2 || body.length <= 2}
                                onClick={() => handleAddRecord()}>
                            Add
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {!isDataLoaded && <TableBlogLoading />}

                    {(isDataLoaded && !isError) && (
                        <TableLinks
                            blogData={queryData}
                            handleRemoveRecord={handleRemoveRecord}
                        />
                    )}
                    {isError &&
                        <Typography color='warning' variant='h3'>{errorMsg}</Typography>
                    }

                </Grid>
            </Grid>
        </Container>
    );
}