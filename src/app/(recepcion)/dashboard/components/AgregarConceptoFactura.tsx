'use client'

import ChoicesFormInput from '@/components/forms/ChoicesFormInput';
import React, { useEffect } from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

import {conceptosFacturaMockInput} from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const AgregarConceptosFactura = (props: {
    facturaId: string,
    onCloseClicked: any
}) => {

    return (
        <Card>
            <CardBody>
                <div className="d-flex align-items-start justify-content-between">
                    <h5>Agregar productos o servicios</h5>
                    <div className='text-end'>
                        <button 
                            type="button" 
                            className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                            onClick={props.onCloseClicked}
                        >
                            <IconifyIcon icon="solar:close-circle-outline" className="fs-20" />
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                      <p className="text-muted">Escribe o selecciona el nombre del producto/servicio</p>
                      <ChoicesFormInput className="form-control" id="choices-single-groups" data-choices data-choices-groups data-placeholder="Selecciona un producto o servicio">
                        <option>Selecciona un producto o servicio</option>
                        <optgroup label="UK">
                          <option value="London">London</option>
                          <option value="Manchester">Manchester</option>
                          <option value="Liverpool">Liverpool</option>
                        </optgroup>
                        <optgroup label="FR">
                          <option value="Paris">Paris</option>
                          <option value="Lyon">Lyon</option>
                          <option value="Marseille">Marseille</option>
                        </optgroup>
                        <optgroup label="DE" disabled>
                          <option value="Hamburg">Hamburg</option>
                          <option value="Munich">Munich</option>
                          <option value="Berlin">Berlin</option>
                        </optgroup>
                        <optgroup label="US">
                          <option value="New York">New York</option>
                          <option value="Washington" disabled>Washington</option>
                          <option value="Michigan">Michigan</option>
                        </optgroup>
                        <optgroup label="SP">
                          <option value="Madrid">Madrid</option>
                          <option value="Barcelona">Barcelona</option>
                          <option value="Malaga">Malaga</option>
                        </optgroup>
                        <optgroup label="CA">
                          <option value="Montreal">Montreal</option>
                          <option value="Toronto">Toronto</option>
                          <option value="Vancouver">Vancouver</option>
                        </optgroup>
                      </ChoicesFormInput>
                    </div>
            </CardBody>
        </Card>
    );
}

export default AgregarConceptosFactura;