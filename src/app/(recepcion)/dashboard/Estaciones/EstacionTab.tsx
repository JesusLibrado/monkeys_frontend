"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ConceptosFacturaEditor from "@/components/ConceptosFacturaEditor";
import IconifyIcon from "@/wrappers/IconifyIcon";
import CrearConceptoFacturaForm from "@/components/CrearConceptoFacturaForm";
import EmpezarEventoButton from "@/components/EmpezarEventoButton";
import CancelarFacturaButton from "@/components/CancelarFacturaButton";
import { useQuery, gql } from "@apollo/client";
import { useRecepcionContext } from "@/context/useRecepcionContext";
import GuardarFacturaButton from "@/components/GuardarFacturaButton";
import { toSentenceCase } from "@/utils/change-casing";

// ************** GraphQL queries ***********

const GET_EVENTO_BY_ESTACION = gql`
  query EventoByEstacion($estacionId: String!) {
    eventoByEstacion(estacionId: $estacionId) {
      id
      nombreCliente
      estatus
      factura {
        id
        estatus
        folio
        total
      }
      createdAt
      updatedAt
    }
  }
`;

// ************** EstacionHeader ***********

const EstacionHeader = (props: { disponible: boolean; numero: number }) => (
  <div className="d-flex align-items-start justify-content-between mb-4">
    <span>
      <h3 className="m-0 fw-bolder fs-20">Estación # {props.numero}</h3>
    </span>
    {!props.disponible ? (
      <span className="text-end badge me-1 badge-outline-danger rounded-pill">
        Ocupada
      </span>
    ) : (
      <span className="text-end badge me-1 badge-outline-success rounded-pill">
        Disponible
      </span>
    )}
  </div>
);

// ************** Exported component --- EstacionTab ***********

const EstacionTab = (props: {
  estacionId: string;
  empleado: {
    id: string;
    nombre: string;
  };
  numero: number;
}) => {
  const [eventoData, setEventoData] = useState<any>({});
  const [agregarConceptoClicked, setAgregarConcepto] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_EVENTO_BY_ESTACION, {
    variables: { estacionId: props.estacionId },
  });

  const recepcionContext = useRecepcionContext();

  useEffect(() => {
    if (data) {
      let eventoByEstacion = data.eventoByEstacion;
      setEventoData(eventoByEstacion);
    }
  }, [data]);

  useEffect(() => {
    if (recepcionContext.isEventoUpdated) {
      recepcionContext.onNotificationReceived();
      refetch();
    }
  }, [recepcionContext.isEventoUpdated]);

  function toggleAgregarConceptoButton(event: any) {
    event.preventDefault();
    setAgregarConcepto(agregarConceptoClicked ? false : true);
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }

  if (props.empleado === null) {
    return (
      <div className="d-flex align-items-start justify-content-center mb-4">
        <h5>
          Esta estación no tiene un barbero asociado. Solicite ayuda a su
          administrador
        </h5>
      </div>
    );
  }

  if (!eventoData) {
    return (
      <div className="text-center mb-4">
        <EstacionHeader numero={props.numero} disponible={true} />
        <p className="mt-3">
          <EmpezarEventoButton
            className={"btn-soft-primary"}
            estacionId={props.estacionId}
            empleado={props.empleado}
            numero={props.numero}
            label={"Comenzar servicio"}
          />
        </p>
      </div>
    );
  }

  return (
    <div>
      <EstacionHeader numero={props.numero} disponible={false} />
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div>
          <h5 className="fw-bold mb-2 fs-14"> Nombre del cliente: </h5>
          <h6 className="fs-14 mb-2">
            {toSentenceCase(eventoData.nombreCliente ?? "")}
          </h6>
        </div>
        <div>
          <h5 className="fw-bold mb-2 fs-14"> Atendido por: </h5>
          <h6 className="fs-14 mb-2">
            {toSentenceCase(props.empleado.nombre)}
          </h6>
        </div>
      </div>
      <div className="mb-4 d-flex flex-row-reverse gap-2">
        <button
          type="button"
          className={`btn ${agregarConceptoClicked ? "btn-secondary" : "btn-soft-secondary"}`}
          onClick={toggleAgregarConceptoButton}
        >
          <IconifyIcon icon="tabler:circle-plus" className="me-1 fs-16" />
          cotizar greca u otro servicio
        </button>
      </div>
      {!agregarConceptoClicked ? (
        <ConceptosFacturaEditor facturaId={eventoData.factura?.id} />
      ) : (
        <CrearConceptoFacturaForm
          facturaId={eventoData.factura?.id}
          onCloseClicked={toggleAgregarConceptoButton}
        />
      )}
      <div className="d-print-none mb-5">
        <div className="d-flex justify-content-center gap-2">
          <CancelarFacturaButton facturaId={eventoData.factura?.id} />
          <GuardarFacturaButton facturaId={eventoData.factura?.id} />
        </div>
      </div>
    </div>
  );
};

export default EstacionTab;
