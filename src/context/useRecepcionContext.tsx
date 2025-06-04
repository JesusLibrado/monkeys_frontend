'use client'

import { sleep } from "@/utils/promise";
import { createContext, useContext, useState } from "react";

interface RecepcionContextType {
    isEventoUpdated: boolean,
    onNotificationReceived: Function,
    notifyEventoUpdated: Function,
    addFolioFactura: Function,
    getFolioFactura: Function
}

export const RecepcionContext = createContext<RecepcionContextType | undefined>(undefined);

export const useRecepcionContext = () => {
  const context = useContext(RecepcionContext)
  if (!context) {
    throw new Error('useRecepcionContext can only be used within RecepcionProvider')
  }
  return context
}

export const RecepcionProvider = (props: {children: any}) => {

    const [isEventoUpdated, setIsEventoUpdated] = useState(false);
    const [folioFactura, setFolioFactura] = useState<Map<number, string>>(new Map);

    function acknowledgeNotification() {
        setIsEventoUpdated(false);
    }

    async function eventoIsUpdated() {
        await sleep(1000);
        setIsEventoUpdated(true);
    }

    function getFacturaId (folio: number) {
        return folioFactura.get(folio);
    }
    
    function addFolio(folio: number, facturaId: string) {
        folioFactura.set(folio, facturaId);
    }
    
    return (
        <RecepcionContext.Provider 
            value={{
                isEventoUpdated: isEventoUpdated,
                notifyEventoUpdated: eventoIsUpdated,
                onNotificationReceived: acknowledgeNotification,
                addFolioFactura: addFolio,
                getFolioFactura: getFacturaId
            }}
        >
            {props.children}
        </RecepcionContext.Provider>
    )
}