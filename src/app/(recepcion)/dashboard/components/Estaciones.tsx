'use client'

import ComponentContainerCard from '@/components/ComponentContainerCard';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React, { useEffect } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, Spinner, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import EstacionTab from './EstacionTab';

import { useQuery, gql } from '@apollo/client';
import { toNameCase } from '@/helpers/strings';

// ************** Gql queries ***********

const GET_ESTACIONES = gql `
  query Estaciones {
    estaciones {
      id
      numero
      disponible
      empleado {
        id
        nombre
      }
      createdAt
      updatedAt
    }
  }
`


const Estaciones = () => {

  const { loading, error, data } = useQuery(GET_ESTACIONES);
  
  const [estacionesData, setEstacionesData] = React.useState<any[]>([]);

  useEffect(()=>{
    if(data) {
      let estaciones = data.estaciones;
      setEstacionesData(estaciones);
    }
  }, [data]);

  function activeTabClassName(estacion: any) {
    if(!estacion.empleado){
      return 'text-light';
    }
    if(estacion.disponible) {
       return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  if(loading){
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }
  
  return (
    <TabContainer defaultActiveKey={0}>
      <Nav role="tablist" className="nav-tabs nav-justified nav-bordered nav-bordered-secondary mb-3">
      {(estacionesData || []).map((estacion, idx) => {
          let tabName = `Estación ${estacion.numero}`;
          if(estacion.empleado){
            tabName = toNameCase(estacion.empleado.nombre)
          }
          return (
          <NavItem as="li" role="presentation" key={idx}>
              <NavLink eventKey={idx}>
                <IconifyIcon 
                  icon="ri:circle-fill" 
                  className={`fs-18 me-1 ${activeTabClassName(estacion)}`} 
                />
                {tabName}
              </NavLink>
          </NavItem>
          )
      })}
      </Nav>
      <TabContent>
      {(estacionesData || []).map((estacion, idx) => {
          return (
          <TabPane eventKey={idx} id={estacion.id} key={idx}>
            <Row>
              <Col sm={12}>
                <Card className="shadow-none border">
                  <CardBody>
                    <EstacionTab 
                      estacionId={estacion.id} 
                      empleado={estacion.empleado} 
                      numero={estacion.numero} 
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          )
      })}
      </TabContent>
    </TabContainer>
  );
}

export default Estaciones