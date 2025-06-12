"use client";

import { toSentenceCase } from "@/utils/change-casing";
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

// ************** Gql***********

const GET_CONCEPTOS_FROM_FACTURA = gql`
  query ConceptosFactura($facturaId: String!) {
    conceptosFactura(facturaId: $facturaId) {
      id
      cantidad
      total
      producto {
        id
        nombre
        marca
        precioPublico
      }
      servicio {
        id
        nombre
        categoria
        precio
      }
    }
  }
`;

const ConceptosFacturaTable = (props: { facturaId: string }) => {
  const [conceptosFacturaData, setConceptosFactura] = useState<any[]>([]);

  const { loading, error, data, refetch } = useQuery(
    GET_CONCEPTOS_FROM_FACTURA,
    {
      variables: { facturaId: props.facturaId },
    },
  );

  useEffect(() => {
    if (data) {
      let conceptosFactura = data.conceptosFactura;
      setConceptosFactura(conceptosFactura);
    }
    if (props.facturaId) {
      refetch();
    }
  }, [data, props.facturaId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mb-4">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table text-center table-nowrap align-middle mb-0">
          <thead>
            <tr className="bg-light bg-opacity-50">
              <th className="border-0" scope="col" style={{ width: 50 }}>
                #
              </th>
              <th className="text-start border-0" scope="col">
                Concepto
              </th>
              <th className="border-0" scope="col">
                Cantidad
              </th>
              <th className="border-0" scope="col">
                Precio unitario
              </th>
              <th className="text-end border-0" scope="col">
                Costo
              </th>
            </tr>
          </thead>
          <tbody id="products-list">
            {(conceptosFacturaData || []).map((concepto, idx) => {
              let titulo = `${concepto.servicio?.categoria} ${concepto.servicio?.nombre}`;
              let precio = concepto.servicio?.precio;
              if (
                concepto.producto &&
                Object.keys(concepto.producto).length > 0
              ) {
                titulo = `${concepto.producto?.nombre} ${toSentenceCase(concepto.producto?.marca)}`;
                precio = concepto.producto.precioPublico;
              }
              return (
                <tr key={concepto.id}>
                  <th scope="row">0{idx + 1}</th>
                  <td className="text-start">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-medium">{titulo}</span>
                    </div>
                  </td>
                  <td>{concepto.cantidad}</td>
                  <td>${precio}</td>
                  <td className="text-end">${concepto.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ConceptosFacturaTable;
