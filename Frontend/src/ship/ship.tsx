import React from 'react'
import { Container , Row , Col } from 'reactstrap'
import { motion } from 'framer-motion'
import serviceData from '../assets/data/serviceData'
import './ship.css'
const Ship = () => {
  return <section className='dropship'>
<Container>
    <Row>
        {
            serviceData.map((item,index) => (
        <Col lg='3' md='4' key={index}>
            <motion.div whileTap={{scale:1.1}} className="ship__item" style={{background:`${item.bg}`}}>
                <span><i className={item.icon}></i></span>
                <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                </div>
            </motion.div>
        </Col>
            ))
        }
        
    </Row>
</Container>
  </section>
}

export default Ship