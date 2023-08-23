import React from 'react'
import { Container,Row,Col,Form,FormGroup} from "reactstrap"
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { useSelector } from "react-redux"
import '../styles/checkout.css'
const Checkout = () => {
  const totalQty = useSelector((state:any)=>state.cart.totalQuantity)
  const totalAmount = useSelector((state:any)=>state.cart.totalAmount)
  return (
    <Helmet title='Checkout'>
      <CommonSection title="Checkout"/>
      <section>
        <Container>
          <Row>
            <Col>
            <h6 className='mb-4 fw-bold'>Billing Information</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                 <input type="text" name='' id='' placeholder='Nhập tên...'/>
              </FormGroup>
              <FormGroup className='form__group'>
                 <input type="email" name='' id='' placeholder='Email...'/>
              </FormGroup>
              <FormGroup className='form__group'>
                 <input type="number" name='' id='' placeholder='Phone...'/>
              </FormGroup>
              <FormGroup className='form__group'>
                 <input type="text" name='' id='' placeholder='Địa chỉ...'/>
              </FormGroup>
              <FormGroup className='form__group'>
                 <input type="text" name='' id='' placeholder='Postal code'/>
              </FormGroup>
              <FormGroup className='form__group'>
                 <input type="text" name='' id='' placeholder='Country'/>
              </FormGroup>
            </Form>
            </Col>
            
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>Total Quantity: <span>{totalQty} items</span></h6>
                <h6>Subtotal: <span>${totalAmount}</span></h6>
                <h6> <span>Shipping: <br />
                free Shipping
                </span>  <span>$0</span></h6>
                <h4>Total Cost: <span>${totalAmount}</span></h4>
                <div className="buy__btn auth__btn w-100">Place an order</div>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout