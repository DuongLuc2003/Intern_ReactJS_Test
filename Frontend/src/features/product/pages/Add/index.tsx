import { useAddProductMutation } from "../../../../api/product";
import { IProduct } from "@interfaces/product";
import { Form, Button, Input, Select } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import React from "react";

type FieldType = {
  productName: string;
  price: number;
  category: string;
  description: string;
};

const AdminProductAdd = () => {
  const categoriesOptions = ["sofa", "chair", "watch", "wireless", "mobile"];
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const onFinish = (values: IProduct) => {
    addProduct(values)
      .unwrap()
      .then(() => navigate("/admin/product"));
  };

  const validatePrice = (rule: any, value: number | string, callback: any) => {
    // ... (code của bạn cho validation giá sản phẩm)
  };

  const validateDescription = (rule: any, value: string, callback: any) => {
    // ... (code của bạn cho validation mô tả sản phẩm)
  };

  return (
    <div className="p-4">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm sản phẩm</h2>
      </header>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="productName"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm!" },
            { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá sản phẩm"
          name="price"
          rules={[
            // Yêu cầu required và validation giá sản phẩm
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<string[]>
          label="Danh mục sản phẩm"
          name="category"
          rules={[
            { required: true, message: "Vui lòng chọn danh mục sản phẩm" },
          ]}
        >
          <Select mode="multiple" placeholder="Chọn danh mục">
            {categoriesOptions.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả sản phẩm"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            { min: 10, message: "Mô tả ít nhất 10 ký tự" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }} className="">
          <Button type="primary" danger htmlType="submit" className="me-3">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Thêm"
            )}
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate("/admin/product")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProductAdd;