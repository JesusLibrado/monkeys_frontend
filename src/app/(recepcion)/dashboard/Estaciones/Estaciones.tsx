"use client";

import IconifyIcon from "@/wrappers/IconifyIcon";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import EstacionTab from "./EstacionTab";

import { useQuery, gql } from "@apollo/client";
import { useRecepcionContext } from "@/context/useRecepcionContext";
import { toSentenceCase } from "@/utils/change-casing";

// ************** Gql queries ***********

const GET_ESTACIONES = gql`
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
`;

// ************** Exported component --- Estaciones ***********

const Estaciones = () => {
  const { loading, error, data, refetch } = useQuery(GET_ESTACIONES);

  const eventoContext = useRecepcionContext();

  const [estacionesData, setEstacionesData] = React.useState<any[]>([]);

  useEffect(() => {
    if (data) {
      let estaciones = data.estaciones;
      setEstacionesData(estaciones);
      console.log(estaciones);
    }
  }, [data]);

  useEffect(() => {
    if (eventoContext.isEventoUpdated) {
      eventoContext.onNotificationReceived();
      refetch();
    }
  }, [eventoContext.isEventoUpdated]);

  function activeTabClassName(estacion: any) {
    if (!estacion.empleado) {
      return "text-light";
    }
    if (estacion.disponible) {
      return "text-success";
    } else {
      return "text-danger";
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <TabContainer defaultActiveKey={0}>
      <Nav
        role="tablist"
        className="nav-tabs nav-justified nav-bordered nav-bordered-secondary mb-3"
      >
        {(estacionesData || []).map((estacion, idx) => {
          let tabName = `Estación ${estacion.numero}`;
          if (estacion.empleado) {
            tabName = toSentenceCase(estacion.empleado.nombre);
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
          );
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
          );
        })}
      </TabContent>
    </TabContainer>
  );
};

export default Estaciones;
