import React, {useEffect, useState} from "react";
import {Button, Col, Input, message, notification, Row, Space} from "antd";
const Create=()=>{
    const [queryData, setQueryData] = useState<any>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [body, setBody] = useState<any>("");
    const [result, setResult] = useState<any>("");
    function isValidUrl(str: string) {
        try {
            new URL(str);
            return true;
        } catch (err) {
            return false;
        }
    }
    function randomString(length: number) {
        let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    useEffect(() => {
        fetchData();
    }, []);

    const generateAlias=()=>{
        let isRun=true;
        let alias='';
        while(isRun){
            alias = randomString(5);
            let temp = queryData?.find((x:any)=>x.alias===alias);
            if(!temp){
                isRun=false;
            }
        }
        return alias;
    }
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

    //* A D D   R E C O R D
    const handleAddRecord = async () => {
        if(result) {
            setResult('');
            return;
        }
        let temp = queryData.find((x:any)=>x.target===body);
        if(temp){
            notification['error']({
                message: "Thông báo",
                description: "Link đã có trên hệ thống",
                duration: 5,
            });
            setBody('');
            setResult(`https://riviuhay.net/${temp.alias}`)
            return;
        }
        setLoading(true);
        let alias = generateAlias();
        fetch(`${window.location.origin}/api/add`, {
            method: "POST",
            body: JSON.stringify({ alias: alias, target: body }),
        })
            .then((response) => {
                setBody('');
                setResult(`https://riviuhay.net/${alias}`);
                const textField = document.createElement('textarea');
                textField.innerText = `https://riviuhay.net/${alias}`;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
                message.success('Đã Copy Short Link');
                fetchData();
            })
            .catch(function (error) {
                // handle error
                setIsError(true);
                setErrorMsg(error.message);

            })
            .finally(function () {
                setLoading(false);
            });

    };
    return <div className={'container'}>
        <Row gutter={16} style={{justifyContent:'center', marginTop:50}}>

                <Col span={16}>
                    <Input
                        style={{width:'100%'}}
                        type="text"
                        placeholder="Nhập link"
                        value={body||result}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    {body&&!isValidUrl(body)?<span style={{color:'red'}}>Không đúng định dạng</span>:null}
                </Col>
                <Button type="primary"
                        loading={isLoading}
                        disabled={isLoading ||(!body&&!result)||(body && !isValidUrl(body))}
                        onClick={() => handleAddRecord()}>{result?'Tạo Link Mới':'Tạo Short Link'}</Button>
        </Row>
    </div>
}
export default Create;