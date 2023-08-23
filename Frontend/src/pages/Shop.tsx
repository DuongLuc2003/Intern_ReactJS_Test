import React, {useState, useEffect} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row , Col } from 'reactstrap'
import '../styles/shop.css'
import ProuductList from '../components/UI/ProuductList'
import { useGetProductsQuery, useRemoveProductMutation } from "../api/product";
import { IProduct } from '../interfaces/product'

type Props = {};
const Shop = () => {
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const { data, isLoading, isError } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    if (data) {
      // Update the productsData state when the data from the API is available
      setProductsData(data);
      setFilteredProducts(data);
    }
  }, [data]);
  const filterProducts = (filterValue: string) => {
    // Filter products based on the selected category
    if (filterValue === 'all') {
      setFilteredProducts(productsData); // No filter, show all products
    } else {
      const filteredProducts = productsData.filter((item) => item.category === filterValue);
      setFilteredProducts(filteredProducts);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    // Filter products based on the search term in product name
    const searchedProducts = productsData.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchedProducts);
  };

  const hanldeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    filterProducts(filterValue);
  };
  return (
   <Helmet title='Shop'>
    <CommonSection title='Products'/>
    <section>
      <Container>
        <Row>
          <Col lg='3' md='3'>
            <div className="filler__widget">
              <select onChange={hanldeFilter} title='filler__sofa'>
                <option value="all">Filler By Category</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
            </div>
          </Col>
          <Col lg='3' md='3'>
          <div className="filler__widget">
              <select title='category_sort'>
                  <option>Sort By Category</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </Col>
          <Col lg='6' md='6'>
          <div className="search__box">
              <input type="text" placeholder='Search...' onChange={handleSearch}/>
              <span><i className="ri-search-2-line"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className='pt-0'>
      <Container>
        <Row>
          {
            filteredProducts.length == 0? (<h1 className='text-center fz-3'>Không có sản phẩm nào!</h1>):(<ProuductList data={filteredProducts}/>)
          }
        </Row>
      </Container>
    </section>
   </Helmet>
  )
}

export default Shop