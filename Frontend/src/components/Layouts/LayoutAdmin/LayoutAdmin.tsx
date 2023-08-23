import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiFillAppstore
} from "react-icons/ai";
import {SiAdobepremierepro} from "react-icons/si"
import { Link, Outlet } from "react-router-dom";
import React from 'react';
const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <AiOutlineMenuUnfold/>,
                            label: <Link to="/admin/dashboard">Thông kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <SiAdobepremierepro/>,
                            label: <Link to="/admin/product">Sản phẩm</Link>,
                        },
                        {
                            key: "3",
                            icon: <AiOutlineUser/>,
                            label: <Link to="/admin/user">User</Link>,
                        },
                        {
                            key: "4",
                            icon: <AiFillAppstore/>,
                            label: <Link to="/admin/categories">Categories</Link>,
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;