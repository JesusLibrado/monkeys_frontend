import React from 'react'
import Stat from './components/Stat'
import OrdersChart from './components/OrdersChart'
import Statistics from './components/Statistics'
import TotalRevenue from './components/TotalRevenue'
import UserCard from './components/UserCard'
import BrandsListingCard from './components/BrandsListingCard'
import SellingProductsCard from './components/SellingProductsCard'
import { Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const DashboardPage = () => {
  return (
    <>
      <Stat />
      <Row>
        <Col xxl={4} xl={6}>
          <OrdersChart />
        </Col>
        <Col xxl={4} xl={6}>
          <Statistics />
        </Col>
        <Col xxl={4} xl={12}>
          <TotalRevenue />
        </Col>
      </Row>
      <UserCard />
      <Row>
        <Col xxl={6}>
          <BrandsListingCard />
        </Col>
        <Col xxl={6}>
          <SellingProductsCard />
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage