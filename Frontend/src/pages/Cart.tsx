  import React from 'react'
  import '../styles/cart.css'
  import Helmet from '../components/Helmet/Helmet'
  import CommonSection from '../components/UI/CommonSection'
  import { Container,Row,Col } from "reactstrap"
  import { motion } from 'framer-motion'
  import { cartActions } from '../features/cart/cartSlice'
  import { useSelector, useDispatch } from 'react-redux'
  import { Link } from 'react-router-dom'
  const Cart= () => {
    const carIterms = useSelector((state:any) => state.cart.cartItems)
    const totalAmount = useSelector((state:any)=>state.cart.totalAmount)
    return (
      <Helmet title='Cart'>
        <CommonSection title='Shopping Cart'/>
        <section>
          <Container>
            <Row>
              <Col lg='9'>
                {
                  carIterms.length == 0 ? (<h2 className='fs-4 text-center'>Không có sản phẩm nào trong giỏ hàng</h2>) 
                  : (<table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quanlity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      carIterms.map((item:any,index:any)=> (
                        <Tr item={item} key={index}/>
                      )
                      
                      )
                    }
                    
                  </tbody>
                </table>)
                }
                
              </Col>
              <Col lg='3'>
                <div>
                  <h6 className='d-flex align-items-center justify-content-between'>Subtotal:   
                  <span className='fs-4 fw-bold '>${totalAmount}</span>
                  </h6>
                  
                </div>
                <p className='fs-6 mt-2'>
                  Tasex and-shipping will calculate in checkout
                </p>
                <div>
                  <button className='buy__btn w-100'><Link to='/shop'>Tiếp tục mua hàng</Link></button>
                  <br />
                  <button className='buy__btn w-100 mt-3' ><Link to='/checkout'>Thoát</Link></button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    )
  }
  const Tr= ({item}:any) => {
    const dispatch = useDispatch()
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id));
    }
    return (<tr>
      <td><img src={item.imgUrl} alt="" /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <motion.i whileTap={{scale:1.2}}className='ri-delete-bin-line' onClick={deleteProduct}></motion.i>
      </td>
    </tr>)
  }

  export default Cart