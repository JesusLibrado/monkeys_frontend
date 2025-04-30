'use client'

import ComponentContainerCard from '@/components/ComponentContainerCard';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import EstacionTab from './EstacionTab';

import {estacionesMockInput} from '../data';

const Estaciones = () => {

  const [estacionesData, setEstacionesData] = React.useState(estacionesMockInput);
  
  return (
    <ComponentContainerCard 
      title='Información de Estaciones'
      description={<>Verifica y administra el estatus de cada estación</>}
    >
        <TabContainer defaultActiveKey={estacionesData[0].id}>
            <Nav role="tablist" className="nav-tabs nav-justified nav-bordered nav-bordered-danger mb-3">
            {(estacionesData || []).map((tab, idx) => {
                return (
                <NavItem as="li" role="presentation" key={idx}>
                    <NavLink eventKey={tab.id}>
                      <IconifyIcon icon="ri:circle-fill" className={`fs-18 me-1 ${tab.disponible?'text-success':'text-danger'}`} />
                      {tab.empleado.nombre}
                    </NavLink>
                </NavItem>
                )
            })}
            </Nav>
            <TabContent>
            {(estacionesData || []).map((tab, idx) => {
                return (
                <TabPane eventKey={tab.id} id={tab.id} key={idx}>
                  <Row>
                    <EstacionTab id={tab.id} nombreEmpleado={tab.empleado.nombre} numero={tab.numero} />
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