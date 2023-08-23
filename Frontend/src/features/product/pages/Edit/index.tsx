import { useGetProductByIdQuery, useUpdateProductMutation } from "../../../../api/product";
import { IProduct } from "@interfaces/product";
import { Button, Form, Input, Skeleton ,Select} from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
type FieldType = {
    name: string;
    price: number;
    category:string
    description:string
};
const AdminProductEdit = () => {
    const categoriesOptions = ["sofa", "chair", "watch", "wireless", "mobile"];
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: productData?.productName,
            price: productData?.price,
        });
    }, [productData]);
    // Custom validation function for price field
    const validatePrice = (rule: any, value: number | string, callback: any) => {
        if (!value || value === "") {
          callback("Vui lòng nhập giá sản phẩm!"); // Thông báo khi không nhập gì
        } else {
          const priceNumber = Number(value);
          if (isNaN(priceNumber) || priceNumber < 0) {
            callback("Giá sản phẩm phải là số và lớn hơn hoặc bằng 0"); // Thông báo khi giá trị không hợp lệ
          } else if (priceNumber.toString().length < 2) {
            callback("Giá sản phẩm phải có ít nhất 2 chữ số"); // Thông báo khi giá trị không đủ 2 chữ số sau dấu thập phân
          } else {
            callback();
          }
        }
      };
      const validateDescription = (rule: any, value: string, callback: any) => {
        if (!value || value.trim() === "") {
          callback("Vui lòng nhập mô tả sản phẩm!");
        } else {
          callback();
        }
      };
    const onFinish = (values: IProduct) => {
        updateProduct({ ...values, id: idProduct })
            .unwrap()
            .then(() => navigate("/admin/product"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa sản phẩm : {productData?.productName}</h2>
            </header>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
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
            rules={[ // Yêu cầu required
              { validator: validatePrice }, // Sử dụng hàm kiểm tra giá trị hợp lệ
            ]}
          >
                        
                        <Input />
                    </Form.Item>
                    <Form.Item<string[]>
                label="Danh mục sản phẩm"
                name="category"
                rules={[ 
                { required: true, message: "Vui lòng chọn dang mục sản phẩm" },
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
                

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" danger htmlType="submit" className="me-2">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Sửa"
                            )}
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="ml-2"
                            onClick={() => navigate("/admin/product")}
                        >
                            Quay lại
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default AdminProductEdit;