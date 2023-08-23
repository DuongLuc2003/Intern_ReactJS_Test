import React  , {useState,useEffect}from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container , Row, Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img.png'
import '../styles/home.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Ship from '../ship/ship'
import Clock from '../components/UI/Clock'
import ProuductList from '../components/UI/ProuductList'
import counterImg from '../assets/images/counter-timer-img.png'
import { useGetProductsQuery, useRemoveProductMutation } from "../api/product";
import { IProduct } from '../interfaces/product'
type Props = {};
const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
 
  const [trendingProducts, setTrendingProducts] = useState<IProduct[]>([]);
  const [bestSalesProducts, setBestSalesProducts] = useState<IProduct[]>([]);
  const [mobileProducts, setMobileProducts] = useState<IProduct[]>([]);
  const [wirelessProducts, setWirelessProducts] = useState<IProduct[]>([]);
  const [popularProducts, setPopularProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products) {
      // Filter products once the data is available
      const filteredTrendingProducts = products.filter((item) => item.category === 'chair');
      const filteredBestSalesProducts = products.filter((item) => item.category === 'sofa');
      const filteredMobileProducts = products.filter((item) => item.category === 'mobile');
      const filteredWirelessProducts = products.filter((item) => item.category === 'wireless');
      const fillerPopularProducts = products.filter((item) => item.category === 'watch');

      setTrendingProducts(filteredTrendingProducts);
      setBestSalesProducts(filteredBestSalesProducts);
      setMobileProducts(filteredMobileProducts);
      setWirelessProducts(filteredWirelessProducts);
      setPopularProducts(fillerPopularProducts);
    }
  }, [products]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Xử lý trạng thái khi gặp lỗi
  if (isError) {
    return <div>Oops! Có lỗi xảy ra khi tải dữ liệu.</div>;
  }
  const year = new Date().getFullYear();
    return <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero__suntitle">
                  Trending product in {year}
                </p>
                <h2>Make your Interior More Minimalist & Modern</h2>
                <p>Introducing our revolutionary product, designed to enhance your daily life with cutting-edge technology and unparalleled performance. 
                  Experience the future of innovation and unlock a world of endless possibilities with our latest offering.</p>

                <motion.button whileTap={{scale:1.3}} className='buy__btn'><Link to='/shop'>SHOP NOW</Link></motion.button>
              </div>
            </Col>
            
            <Col lg='6' md='6'>
                   <div className="hero__img">
                    <img src={heroImg} alt="" />
                   </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Ship/>
      <section className="trending_products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Trending Product</h2>
            </Col>
            <ProuductList data={trendingProducts}/>
          </Row>
        </Container>
      </section>

      <section className='best_sales'>
         <Container>
         <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Best Sales</h2>
            </Col>
            <ProuductList data={bestSalesProducts}/>
          </Row>
         </Container>
      </section>
      <section className="timer_count">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="clock_top-content">
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
              </div>
               <Clock/>
               <motion.button whileTap={{scale:1.1}} className='buy__btn store__btn'><Link to="/shop">Visit Store</Link></motion.button>
            </Col>
             <Col lg='6' md='6' className="text-end">
               <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>New Arrivals</h2>
            </Col>
            <ProuductList data={mobileProducts}/>
            <ProuductList data={wirelessProducts}/>
          </Row>
        </Container>
      </section>

      <section className="popular__category">
      <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title '>Popular in Category</h2>
            </Col>
            <ProuductList data={popularProducts}/>
          </Row>
        </Container>
      </section>
      <section className="footer">
        
      </section>
    </Helmet>
  
}

export default Home