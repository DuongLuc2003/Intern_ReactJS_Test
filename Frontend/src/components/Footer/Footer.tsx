import React from 'react'
import './footer.css'
import logo from '../../assets/images/eco-logo.png';
import {Container,Row,Col,ListGroup, ListGroupItem} from "reactstrap"
import { Link } from 'react-router-dom'
const Footer = () => {
  const year = new Date().getFullYear()
  return  (<footer className='footer qt-9'>
  <Container>
    <Row>
      <Col lg='4'>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 className='text-white mb-4'>Multimart</h1>
        </div>
        <p className="footer__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cumque dolor labore eveniet vitae nulla itaque soluta sit provident consectetur laboriosam ?  
        </p>
      </Col>
      <Col lg='3'>
        <div className="footer__quick-links">
          <h4 className="quick__links-title">TopCategories</h4>
          <ListGroup>
            <ListGroupItem className='ps-0 border-0'>
              <Link to='#'>Mobile Phones</Link>
            </ListGroupItem >
            <ListGroupItem className='ps-0 border-0'>
              <Link to='#'>Modern Sofa</Link>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0'> 
              <Link to='#'>Arm Chair</Link>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0'>
              <Link to='#'>Smart Watches</Link>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
      <Col lg='2'>
      <div className="footer__quick-links">
          <h4 className="quick__links-title">useful Links</h4>
          <ListGroup>
            <ListGroupItem className='ps-0 border-0'>
              <Link to='/shop'>Shop</Link>
            </ListGroupItem >
            <ListGroupItem className='ps-0 border-0'>
              <Link to='/cart'>Cart</Link>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0'> 
              <Link to='/login'>Login</Link>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0'>
              <Link to='#'>Privacy Policy</Link>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
      <Col lg='3'>
      <div className="footer__quick-links">
          <h4 className="quick__links-title">Concact</h4>
          <ListGroup className='footer__contact'>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i className="ri-map-pin-line"></i></span>
              <p>Xuan Do, Cu Khoi, Long Bien, Ha Noi</p>
            </ListGroupItem >
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
            <span><i className="ri-phone-line"></i></span>
              <p>+84977771467</p>
            </ListGroupItem>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
              <span><i className="ri-mail-line"></i></span>
              <p>lucck131103@gmail.com</p>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>

      <Col lg='12'>
        <p className="footer__copyright">
          Coppyright {year} developed by Muhibur Rahman. All rights reserved.
        </p>
      </Col>
    </Row>
  </Container>
 </footer>)
   
}

export default Footer