type Props = {};
import { useGetProductsQuery, useRemoveProductMutation } from "../../api/product";
import { IProduct } from "../../interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert , Input} from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import "../../styles/button.css"
import '../../index.css'
import React from "react";
const AdminProduct = (props: Props) => {
    const { data: productData, error, isLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveProductMutation();

    const confirm = (id: number) => {
        removeProduct(id);
    };
    const dataSource = productData?.map(({ id, imgUrl,productName,category, price,description }: any) => ({
        key: id,
        imgUrl, 
        productName,
        price,
        category,
        description
    }));
    const columns = [
        {   
            title: "Hình ảnh",
            dataIndex: "imgUrl",
            key: "imgUrl",
            render: (imgUrl: string) => <img src={imgUrl} alt="Product" style={{ maxWidth: "100px" }} />,
        },
        {   
            title: "Tên sản phẩm",
            dataIndex: "productName",
            key: "productName",
        },
        {   
            title: "Thể loại",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className="d-flex">
                            <Popconfirm
                                title="Are you fucking sure?"
                                onConfirm={() => confirm(id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger className="me-2">
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger className="ml-2 custom-button">
                             <Link to={`/admin/product/${id}/edit`} className="text-white custom-link">
                               Sửa
                            </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div >
            <header className="mb-4 d-flex justify-content-between align-items-center">
                <h2 className="font-weight-bold text-2xl">Product Manager</h2>
                <Button type="primary" danger className="">
                    <Link to="/admin/product/add" className="d-flex align-items-center custom-link">
                        <AiOutlinePlus className="icon"/>
                        <span className="button-text">Thêm sản phẩm</span> 
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminProduct;