import React from 'react'
import Stat from './components/Stat'
import Estaciones from './components/Estaciones';
import { Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const DashboardPage = () => {
  return (
    <>
      <Stat />
      <Row>
        <Col xxl={6} xl={12} lg={12} md={12}>
          <Estaciones />
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage