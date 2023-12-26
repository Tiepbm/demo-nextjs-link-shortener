import { useEffect, useState } from 'react';
import TableLinks from "../../components/TableLinks";
import {Button, Input, Layout, Skeleton} from 'antd';
export default function Index() {
    const [queryData, setQueryData] = useState<any>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [body, setBody] = useState<string>("");
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = `${window.location.origin}/api/getAll`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                setQueryData(response);

            })
            .catch(function (error) {
                // handle error
                setIsError(true);
                setErrorMsg(error.message);

            })
            .finally(function () {
                setIsDataLoaded(false);
            });
    };

    //* R E M O V E   R E C O R D
    const handleRemoveRecord = async (id: number) => {
        // console.log("handleRemoveRecord", id);
        setIsDataLoaded(true);
        fetch(`${window.location.origin}/api/delete`, {
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
        <Layout>
                <Skeleton loading={isDataLoaded}>
                    <TableLinks
                        blogData={queryData}
                        handleRemoveRecord={handleRemoveRecord}
                    />
                </Skeleton>
        </Layout>
    );
}