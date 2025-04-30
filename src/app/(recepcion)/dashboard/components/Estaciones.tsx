'use client'

import ComponentContainerCard from '@/components/ComponentContainerCard';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import EstacionTab from './EstacionTab';

interface EstacionTabItem {
    estacionId: string
    numero: number
    nombreEmpleado: string
    disponible: boolean
  }

const tabContents: EstacionTabItem[] = [
    {
      estacionId: '1',
      numero: 1,
      nombreEmpleado: 'Uriel',
      disponible: false
    },
    {
      estacionId: '2',
      numero: 2,
      nombreEmpleado: 'Javier',
      disponible: true
    },
    {
      estacionId: '3',
      numero: 3,
      nombreEmpleado: 'Osvaldo',
      disponible: true
    },
  ]

const Estaciones = () => {
    return (
      <ComponentContainerCard title='Información de Estaciones'>
          <TabContainer defaultActiveKey="Profile">
              <Nav role="tablist" className="nav-tabs nav-justified nav-bordered nav-bordered-danger mb-3">
              {(tabContents || []).map((tab, idx) => {
                  return (
                  <NavItem as="li" role="presentation" key={idx}>
                      <NavLink eventKey={tab.nombreEmpleado}>
                        <IconifyIcon icon="ri:circle-fill" className={`fs-18 me-1 ${tab.disponible?'text-success':'text-danger'}`} />
                        {tab.nombreEmpleado}
                      </NavLink>
                  </NavItem>
                  )
              })}
              </Nav>
              <TabContent>
              {(tabContents || []).map((tab, idx) => {
                  return (
                  <TabPane eventKey={tab.nombreEmpleado} id={tab.estacionId} key={idx}>
                    <Row>
                      <EstacionTab />
                    </Row>
                  </TabPane>
                  )
              })}
              </TabContent>
          </TabContainer>
      </ComponentContainerCard>
    );
}

export default Estaciones