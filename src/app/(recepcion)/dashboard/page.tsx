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
        <Col xxl={4} xl={6}>
          <Estaciones />
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage