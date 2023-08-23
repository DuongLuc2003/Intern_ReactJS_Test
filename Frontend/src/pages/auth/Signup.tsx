import React, { useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/signin.css';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/auth';
import { Cloudinary } from "cloudinary-core";
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const navigate = useNavigate();
  const [signUp, { isLoading, error }] = useSignupMutation();

  const handleFileChange = async (e: any) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);

    // Upload image to Cloudinary
    try {
      const cloudinary:any = new Cloudinary({ cloud_name: "dkjk0lyhn" }); // Replace with your Cloudinary cloud name
      const uploadResult = await cloudinary.upload(file, {
        upload_preset: "upload-image", // Replace with your Cloudinary upload preset
      });

      console.log("Upload Result:", uploadResult); // Log the upload result
      setPreviewImage(uploadResult.secure_url); // Update the preview image URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = {
        username,
        email,
        password,
        confirmPassword,
        // avatar: selectedFile,
      };

      const result = await signUp(formData);

      // Thực hiện các thao tác cần thiết sau khi đăng ký thành công
      // Ví dụ: Lưu thông tin đăng nhập vào Redux store hoặc localStorage
      toast.success('Đăng ký thành công!');
      navigate('/signin'); // Điều hướng sau khi đăng ký thành công
    } catch (error) {
      // Xử lý lỗi nếu cần
      toast.error('Có lỗi xảy ra khi đăng ký');
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container className="">
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nhập Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Nhập Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Nhập Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Nhập lại Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
                {/* <FormGroup className="form__group">
                  <label htmlFor="avatar">Choose an Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="Choose an Avatar"
                    onChange={handleFileChange}
                  />
                  {previewImage && <img src={previewImage} alt="Preview" />}
                </FormGroup> */}
                <button type="submit" className="buy__btn auth__btn" disabled={isLoading}>
                  {isLoading ? 'Đang đăng ký...' : 'Signup'}
                </button>
                {/* {error && <p className="error-message">{error.message}</p>} */}
                <p>
                  Already have an account? <Link to="/signin">Sign In</Link>{' '}
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;