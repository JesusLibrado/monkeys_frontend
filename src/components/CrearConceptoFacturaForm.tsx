"use client";

import React, { useEffect } from "react";
import { Card, CardBody, Col, Row, ListGroup, Spinner } from "react-bootstrap";
import IconifyIcon from "@/wrappers/IconifyIcon";
import { Formik } from "formik";
import Select from "react-select";
import { useMutation, gql } from "@apollo/client";
import { useRecepcionContext } from "@/context/useRecepcionContext";

const CREATE_CONCEPTO_FACTURA = gql`
  mutation CreateConceptoFactura(
    $createConceptoFacturaInput: CreateConceptoFacturaInput!
  ) {
    createConceptoFactura(
      createConceptoFacturaInput: $createConceptoFacturaInput
    ) {
      id
      cantidad
      total
      createdAt
      updatedAt
    }
  }
`;

const FormularioConceptoFactura = (props: { onSubmit: Function }) => (
  <Formik
    initialValues={{
      cantidad: 1,
      precio: 0,
      nombre: "",
      categoria: "GRECA",
    }}
    onSubmit={(values, { setSubmitting }) => {
      props.onSubmit(values);
      setSubmitting(false);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue,
    }) => (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={3}>
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <Select
                onChange={(selected) =>
                  setFieldValue("categoria", selected?.value)
                }
                options={[
                  {
                    value: "GRECA",
                    label: "greca",
                  },
                  {
                    value: "OTRO",
                    label: "otro",
                  },
                ]}
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <label htmlFor="input-nombre" className="form-label">
                Concepto
              </label>
              <input
                className="form-control"
                id="input-nombre"
                type="text"
                name="nombre"
                onChange={handleChange}
                value={values.nombre}
                placeholder="Cotizacion greca Juan"
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="mb-3">
              <label htmlFor="input-precio" className="form-label">
                Precio
              </label>
              <input
                className="form-control"
                id="input-precio"
                type="number"
                name="precio"
                min="1"
                onChange={handleChange}
                value={values.precio}
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="mb-3">
              <label htmlFor="input-cantidad" className="form-label">
                Cantidad
              </label>
              <input
                className="form-control"
                id="input-cantidad"
                type="number"
                name="cantidad"
                min="1"
                onChange={handleChange}
                value={values.cantidad}
              />
            </div>
          </Col>
          <Col md={2}>
            <div className="mt-1">
              <br />
              <button
                className={`btn btn-outline-primary ${""}`}
                type="submit"
                disabled={
                  isSubmitting ||
                  values.cantidad < 1 ||
                  values.nombre == "" ||
                  values.precio < 1
                }
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    <IconifyIcon icon="ri:add-line" className="fs-15" /> agregar
                  </>
                )}
              </button>
            </div>
          </Col>
        </Row>
      </form>
    )}
  </Formik>
);

const CrearConceptoFacturaForm = (props: {
  facturaId: string;
  onCloseClicked: any;
}) => {
  const recepcionContext = useRecepcionContext();
  const [createConceptoFactura] = useMutation(CREATE_CONCEPTO_FACTURA);

  function create(servicioInput: any) {
    const { cantidad, precio, nombre, categoria } = servicioInput;
    createConceptoFactura({
      variables: {
        createConceptoFacturaInput: {
          facturaId: props.facturaId,
          cantidad: cantidad,
          servicio: {
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            comisionBarbero: precio,
            ganancia: 0,
          },
        },
      },
    });
    recepcionContext.notifyEventoUpdated();
    props.onCloseClicked();
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-start justify-content-between">
          <h5>Cotizar greca o crear otro tipo de servicio</h5>
          <div className="text-end">
            <button
              type="button"
              className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
              onClick={props.onCloseClicked}
            >
              <IconifyIcon
                icon="solar:close-circle-outline"
                className="fs-20"
              />
            </button>
          </div>
        </div>
        <FormularioConceptoFactura onSubmit={create} />
      </CardBody>
    </Card>
  );
};

export default CrearConceptoFacturaForm;
