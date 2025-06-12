"use client";

import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import Select from "react-select";
import { toSentenceCase } from "@/utils/change-casing";

// ************** GraphQL queries ***********

const GET_ESTACIONES_DISPONIBLES = gql`
  query EstacionesDisponibles {
    estacionesDisponibles {
      id
      numero
      empleado {
        id
        nombre
      }
    }
  }
`;

// ************** Helpers ***********

const getSelectEstacionOptions = (estaciones: any[]) =>
  estaciones.map((estacion) => ({
    value: estacion.id,
    label: estacion.numero,
  }));

const getSelectEmpleadoOptions = (estaciones: any[]) =>
  estaciones.map((estacion) => {
    let empleado = estacion.empleado;
    return {
      value: empleado.id,
      label: toSentenceCase(empleado.nombre),
    };
  });

// ************** Exported component --- SelectEstacion ***********

const SelectEstacion = (props: { estacionId?: string; onChange: Function }) => {
  const { data, loading, error } = useQuery(GET_ESTACIONES_DISPONIBLES);

  const [idsDictionary, setIdsDictionary] = useState<Map<string, string>>(
    new Map(),
  );

  const [estacionOptions, setEstacionOptions] = useState<any[]>([]);
  const [selectedEstacion, setSelectedEstacion] = useState<any>();
  const [empleadoOptions, setEmpleadoOptions] = useState<any[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<any>();

  function generateIdsDictionary(estacionesObjects: any[]) {
    const dictionary = new Map<string, string>();
    for (let i = 0; i < estacionesObjects.length; i++) {
      const estacionId = estacionesObjects[i].id;
      const empleadoId = estacionesObjects[i].empleado.id;
      dictionary.set(estacionId, empleadoId);
      dictionary.set(empleadoId, estacionId);
    }
    setIdsDictionary(dictionary);
  }

  useEffect(() => {
    if (data) {
      const estacionesDisponibles = data.estacionesDisponibles;
      const estacionOptions = getSelectEstacionOptions(estacionesDisponibles);
      setEstacionOptions(estacionOptions);
      setSelectedEstacion(
        estacionOptions.find((option) => option.value == props.estacionId),
      );
      setEmpleadoOptions(getSelectEmpleadoOptions(estacionesDisponibles));
      generateIdsDictionary(estacionesDisponibles);
    }
  }, [data]);

  useEffect(() => {
    if (selectedEmpleado) {
      const assignedEstacionId = idsDictionary.get(selectedEmpleado.value);
      setSelectedEstacion(
        estacionOptions.find((option) => option.value == assignedEstacionId),
      );
      props.onChange(assignedEstacionId);
    }
  }, [selectedEmpleado]);

  useEffect(() => {
    if (selectedEstacion) {
      const assignedEmpleadoId = idsDictionary.get(selectedEstacion.value);
      setSelectedEmpleado(
        empleadoOptions.find((option) => option.value == assignedEmpleadoId),
      );
      props.onChange(selectedEstacion.value);
    }
  }, [selectedEstacion]);

  return (
    <>
      <Row className="mb-3">
        <Col md={6}>Número de estación</Col>
        <Col xs={6}>
          {loading ? (
            <Spinner />
          ) : (
            <Select
              value={selectedEstacion}
              placeholder={"Estacion"}
              options={estacionOptions}
              onChange={setSelectedEstacion}
            />
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>Nombre del barbero</Col>
        <Col xs={6}>
          {loading ? (
            <Spinner />
          ) : (
            <Select
              value={selectedEmpleado}
              placeholder={"Barbero"}
              options={empleadoOptions}
              onChange={setSelectedEmpleado}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default SelectEstacion;
