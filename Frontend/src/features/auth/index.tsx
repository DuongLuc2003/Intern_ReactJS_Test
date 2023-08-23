import React from "react";
import { Button, Skeleton, Popconfirm, Alert, Table } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {useGetAllUserQuery, useRemoveUserMutation} from "../../api/auth"; // Make sure to import the appropriate queries and mutations
import "../../styles/button.css";
import "../../index.css";
import { useState } from "react";
type Props = {};
type UserData = {
    _id: string;
    username: string;
    email: string;
    role: string;
};
const AdminUser = (props: Props ) => {
    const { data: userData, error, isLoading }:any = useGetAllUserQuery();
    const [removeUser, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveUserMutation();
    const [userList, setUserList] = useState<UserData[]>(userData);
    const confirm = (_id:any) => {
        removeUser(_id)
            .then(() => {
                // Sau khi xóa thành công, cập nhật state bằng cách loại bỏ người dùng đã xóa
                setUserList(prevUserList => prevUserList.filter(user => user._id !== _id));
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
    };

    const dataSource = userList?.map(({ _id, username, email, role }:any) => ({
        key:_id,
        username,
        email,
        role,
    }));

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Action",
            render: ({ key }:any) => (
                <div className="d-flex">
                    <Popconfirm title="Are you sure?" onConfirm={() => confirm(key)} okText="Yes" cancelText="No">
                        <Button type="primary" danger className="me-2">
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="mb-4 d-flex justify-content-between align-items-center">
                <h2 className="font-weight-bold text-2xl">User Manager</h2>
                <Button type="primary" className="">
                    <Link to="/admin/user/add" className="d-flex align-items-center custom-link">
                        <AiOutlinePlus className="icon" />
                        <span className="button-text">Add User</span> 
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminUser;
