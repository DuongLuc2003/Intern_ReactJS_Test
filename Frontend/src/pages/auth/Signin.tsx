import React, { useState } from 'react';
import Helmet from '../../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/signin.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../../api/auth';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const isDisabled = isLoading || !email || !password;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn, { isLoading, error}] = useSigninMutation();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const result = await signIn({ email, password });
    //   const { accessToken } = result.data;

      // Thực hiện các thao tác cần thiết sau khi đăng nhập thành công
      // Ví dụ: Lưu thông tin đăng nhập vào Redux store hoặc localStorage

      navigate('/checkout'); // Điều hướng sau khi đăng nhập thành công
    } catch (error) {
      // Xử lý lỗi nếu cần
      toast.error('Có lỗi xảy ra khi đăng nhập');
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container className="">
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>
              <Form className="auth__form" onSubmit={handleSubmit}>
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
                <button type="submit" className="buy__btn auth__btn" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Login'}
                </button>
                {/* {error && <p className="error-message">{error.message}</p>} */}
                <p>
                  Don't have an account? <Link to="/signup">Create an account</Link>{' '}
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signin;
