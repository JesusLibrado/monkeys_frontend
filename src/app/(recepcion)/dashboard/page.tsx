import React from "react";
import Estaciones from "./Estaciones/Estaciones";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "react-bootstrap";
import ComponentContainerCard from "@/components/base-ui/ComponentContainerCard";
import IconifyIcon from "@/wrappers/IconifyIcon";

const RecepcionDashboardPage = () => {
  return (
    <Row>
      <Col xxl={8} xl={8} lg={12} md={12}>
        <ComponentContainerCard
          title="Estatus de estaciones"
          description={<>Verifica y administra el estatus de cada estación</>}
        >
          <Estaciones />
        </ComponentContainerCard>
      </Col>
    </Row>
  );
};

export default RecepcionDashboardPage;
