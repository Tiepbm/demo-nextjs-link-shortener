import * as React from "react";
import {Popconfirm, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";


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
    const columns = [
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
        },
        {
            title: 'Link',
            dataIndex: 'target',
            key: 'target',
        },
        {
            title: 'Số lượt click',
            dataIndex: 'visit_count',
            key: 'visit_count',
        },{
            title: 'action',
            dataIndex: '',
            key: '',
            render:(text:string, record:any)=>  <Popconfirm
                title="Xóa short link"
                description="Bạn có chắc muốn xóa link này?"
                onConfirm={()=>handleRemoveRecord(record.id)}
                okText="Đồng ý"
                cancelText="Hủy"
            ><DeleteOutlined style={{color:'red'}} /></Popconfirm>
        },
    ];
    return (
        <>
            {isDataLoaded && (
                <Table pagination={{hideOnSinglePage:true, pageSize:25}} dataSource={blogData} columns={columns} />
            )}
        </>
    );
}