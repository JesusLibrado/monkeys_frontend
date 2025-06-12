import ComponentContainerCard from "@/components/base-ui/ComponentContainerCard";
import MetodoPagoSelector from "@/components/MetodoPagoSelector";
import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import IconifyIcon from "@/wrappers/IconifyIcon";
import { gql, useMutation } from "@apollo/client";

const REALIZAR_PAGO = gql`
  mutation RealizarPago($realizarPagoInput: RealizarPagoInput!) {
    realizarPago(realizarPagoInput: $realizarPagoInput) {
      id
      montoRecibido
      metodoPago
      estatus
      createdAt
      updatedAt
    }
  }
`;

const PagoForm = (props: {
  facturaId: string;
  total: number;
  onDone: Function;
}) => {
  const { total, facturaId } = props;
  const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
  const [montoRecibido, setMontoRecibido] = useState(0);
  const [comisionPagoTarjeta, setComisionPagoTarjeta] = useState(0);

  const [realizarPago, { data, loading, error }] = useMutation(REALIZAR_PAGO);

  const montoPorCobrar = selectedMetodoPago.includes("TARJETA")
    ? total + comisionPagoTarjeta
    : total;
  const montoPorDevolver = montoRecibido > total ? montoRecibido - total : 0;
  const disabledButton =
    selectedMetodoPago === "" ||
    (selectedMetodoPago.includes("EFECTIVO") && montoRecibido < montoPorCobrar);

  useEffect(() => {
    if (data) {
      props.onDone();
    }
  }, [data]);

  function pagar() {
    let recibido = montoRecibido;
    let devuelto = 0;
    if (
      selectedMetodoPago === "TRANSFERENCIA" ||
      selectedMetodoPago.includes("TARJETA")
    ) {
      recibido = montoPorCobrar;
    } else {
      devuelto = montoPorDevolver;
    }
    realizarPago({
      variables: {
        realizarPagoInput: {
          facturaId: facturaId,
          montoRecibido: recibido,
          metodoPago: selectedMetodoPago,
          montoDevuelto: devuelto,
          comisionPagoTarjeta: comisionPagoTarjeta,
        },
      },
    });
  }

  return (
    <ComponentContainerCard title={"Información de pago"}>
      <Row>
        <Col xs={12} sm={12} md={8} xl={12} xxl={12}>
          <MetodoPagoSelector onMetodoPagoChange={setSelectedMetodoPago} />
        </Col>
        <Col xs={12} sm={12} md={8} xl={12} xxl={12}>
          <table className="table table-nowrap align-middle">
            <tbody>
              {selectedMetodoPago.includes("TARJETA") && (
                <tr>
                  <td className="fw-medium">Comisión pago con tarjeta</td>
                  <td className="input-group p-0">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      style={{ width: 10 }}
                      className="form-control"
                      onChange={(e) =>
                        setComisionPagoTarjeta(Number(e.target.value))
                      }
                      placeholder={`10`}
                    />
                  </td>
                </tr>
              )}
              <tr className="fs-16">
                <td className="fw-bold">Monto por cobrar</td>
                <td className="fw-bold text-end">${montoPorCobrar}</td>
              </tr>
              {selectedMetodoPago === "EFECTIVO" && (
                <>
                  <tr>
                    <td className="fw-medium">Monto recibido</td>
                    <td className="input-group p-0">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        style={{ width: 10 }}
                        className="form-control"
                        onChange={(e) =>
                          setMontoRecibido(Number(e.target.value))
                        }
                        placeholder={`${total}`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Cambio</td>
                    <td className="text-end">${}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </Col>
        <Col xs={12} sm={12} md={8} xl={12} xxl={12}>
          <div className="mt-4 text-end">
            <Button
              variant="outline-success"
              type="submit"
              className="px-4"
              disabled={disabledButton}
              onClick={pagar}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  Registrar pago
                  <IconifyIcon icon="tabler:check" className="fs-16" />
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </ComponentContainerCard>
  );
};

export default PagoForm;
