import React from 'react'
import Stat from './components/Stat'
import Estaciones from './components/Estaciones';
import { Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'
import ComponentContainerCard from '@/components/ComponentContainerCard';

export const metadata: Metadata = { title: 'Recepción' }

const DashboardPage = () => {
  return (
    <>
      {/* <Stat /> */}
      <Row>
        <Col xxl={6} xl={12} lg={12} md={12}>
          <ComponentContainerCard 
            title='Estatus de estaciones'
            description={<>Verifica y administra el estatus de cada estación</>}
          >
            <Estaciones />
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage