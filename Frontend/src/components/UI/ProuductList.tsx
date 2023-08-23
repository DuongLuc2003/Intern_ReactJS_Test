import React from 'react'
import ProductCard from './ProductCard'
const ProuductList = ({data}:any) => {
  return (
  <>
  {
    data?.map((item:any, index:any) => (
      <ProductCard  item={item} key={index}/>
    ))
  }
</>

)

}

export default ProuductList