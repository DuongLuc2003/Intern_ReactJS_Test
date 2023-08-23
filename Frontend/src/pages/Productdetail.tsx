import React ,{useState,useRef, useEffect}from 'react'
import {Container, Row, Col}from "reactstrap"
import {useParams}from "react-router-dom"
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-detail.css'
import { motion } from 'framer-motion'
import ProuductList from '../components/UI/ProuductList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { useGetProductByIdQuery, useGetProductsQuery } from '../api/product';
import { IProduct } from '../interfaces/product'
const Productdetail = () => {
  const [tab,setTab]=useState('desc')
  const reviewUser:any = useRef('')
  const reviewMsg:any = useRef('')
  const [rating,setRating] = useState(Number)
  const {id} = useParams();
  if (!id) {
    // Xử lý trường hợp id không tồn tại, ví dụ: redirect hoặc hiển thị thông báo lỗi
    return <div>Không tìm thấy sản phẩm!</div>;
  }
  // const product = products.find(item=> item.id == id)
  // const {imgUrl,productName,price,avgRating,reviews,description,shortDesc,category}:any = product
  // const relatedProducts = products.filter(item=> item.category == category);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const { data: allProducts, isLoading: isAllProductsLoading, isError: isAllProductsError } = useGetProductsQuery();
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const dispatch = useDispatch()
  useEffect(() => {
    if (product && id && allProducts) {
      // Xử lý dữ liệu sản phẩm sau khi API trả về và lưu vào biến trạng thái (state)
      const selectedProduct = allProducts.find((item) => item.id === id);
      const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;
      const relatedProducts = allProducts.filter((item:any) => item.category === category);
      setRelatedProducts(relatedProducts);
      setProducts(allProducts || []);
      
      
    }
  }, [product,allProducts,id]);
  
  const submitHandler = (e:any) => {
         e.preventDefault()
         const reviewUserName = reviewUser.current.value
         const reviewUserMsg = reviewMsg.current.value
         const reviewObj = {
          userName: reviewUserName,
          text: reviewUserMsg,
          rating,
         };
         toast.success("Đã gửi đánh giá")
 
  };
  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: product?.imgUrl,
      productName: product?.productName,
      price: product?.price,
    }));
    
    toast.success('Thêm sản phẩm vào giỏ hàng thành công');
  }
  
  return (
    <Helmet title={product?.productName} className='detail__helmet'>
      <CommonSection className='fz-3' title={product?.productName}/>
      <section className='detail_section'>
        <Container>
          <Row>
            <Col lg='6'>
             <img src={product?.imgUrl} alt={product?.productName} />
            </Col>
            <Col lg='6'>
              <div className="product__details">
              <h2>{product?.productName}</h2>
              <div className="product__rating d-flex align-item-center gap-5 mb-4">
                <div>
                  <span ><i className="ri-star-s-fill"></i></span>
                  <span ><i className="ri-star-s-fill"></i></span>
                  <span ><i className="ri-star-s-fill"></i></span>
                  <span ><i className="ri-star-s-fill"></i></span>
                  <span ><i className="ri-star-half-s-fill"></i></span>
                </div>
                <p>(<span>{product?.avgRating}</span>ratings) </p>
              </div>
              <div className="d-flex align-items-center gap-5">
              <span className='product__price'>${product?.price}</span>
              <span>Category: {product?.category}</span>
              </div>
             
             <p className='mt-3'>{product?.shortDesc}</p>
             <motion.button whileTap={{scale:1.2}} className="buy__btn" onClick={addToCart}>Add to Cart</motion.button>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrappe d-flex align-items-center gap-5">
                <h6 className={`${tab == "desc" ? "active_tab" : ""}`} onClick={()=>setTab('desc')}>Description</h6>
                <h6 className={`${tab == "rev" ? "active_tab" : ""}`} onClick={()=>setTab('rev')}>Reviews({product?.reviews.length})</h6>
              </div>
              {
                tab=='desc' ? (<div className="tab__content mt-5">
                <p>{product?.description}</p>
              </div>) : (<div className='product__review mt-5'>
                <div className="review__wrapper"><ul>{product?.reviews.map((item:any,index:any)=> (
                  <li key={index} className='mb-4'>
                    <h6>Jhon Doe</h6>
                    <span>{item.rating} (rating)</span>
                    <p>{item.text}</p>
                    </li>
                ))}</ul>

               <div className="review__form">
                <h1>Leave you experience</h1>
                <form action="" onSubmit={submitHandler}>
                  <div className="form__group">
                    <input type="text" placeholder='Enter name' ref={reviewUser} required/>
                  </div>
                  <div className="form__group d-flex align-item-center gap-5">
                    <motion.span whileTap={{scale:1.1}} onClick={()=>setRating(1)}>1<i className='ri-star-s-fill'></i></motion.span>
                    <motion.span whileTap={{scale:1.1}}onClick={()=>setRating(2)}>2<i className='ri-star-s-fill'></i></motion.span>
                    <motion.span whileTap={{scale:1.1}}onClick={()=>setRating(3)}>3<i className='ri-star-s-fill'></i></motion.span>
                    <motion.span whileTap={{scale:1.1}}onClick={()=>setRating(4)}>4<i className='ri-star-s-fill'></i></motion.span>
                    <motion.span whileTap={{scale:1.1}}onClick={()=>setRating(5)}>5<i className='ri-star-s-fill'></i></motion.span>
                  </div>
                  <div className="form__group">
                    <textarea ref={reviewMsg} rows={4} typeof='text' placeholder='Review Message..' required/>
                  </div>
                  <button className="buy__btn">Submit</button>
                </form>
               </div>
                </div>
                </div>)
              }
              
            </Col>
            <Col lg='12'>
              <h2 className='related__title'>You might also like </h2>
            </Col>
            <ProuductList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Productdetail