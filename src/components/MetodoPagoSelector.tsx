'use client'

import { snakeToTitleCase, toSentenceCase } from "@/utils/change-casing";
import { useMemo, useState } from "react";
import Select from 'react-select';

const MetodoPagoSelector = (props: {
    onMetodoPagoChange: Function
}) => {

    const metodosDePago = useMemo(()=>[
        "TRANSFERENCIA",
        "EFECTIVO",
        "TARJETA_CREDITO",
        "TARJETA_DEBITO"
    ], []);
    
    const [selectOptions] = useState<any[]>(
        metodosDePago.map((mdp)=>{
            if(mdp.includes("_")){
                return {
                    label: snakeToTitleCase(mdp),
                    value: mdp
                }
            } else {
                return {
                    label: toSentenceCase(mdp),
                    value: mdp
                }
            }
        })
    );

    function handleSelectionChange(selected: any) {
        props.onMetodoPagoChange(selected.value);
    }

    return (
        <Select
            defaultValue={''}
            placeholder={'Metodo de pago'}
            onChange={handleSelectionChange}
            options={selectOptions}
        />
    );
}

export default MetodoPagoSelector;