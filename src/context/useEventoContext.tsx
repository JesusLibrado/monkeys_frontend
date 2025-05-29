'use client'

import { sleep } from "@/utils/promise";
import { createContext, useContext, useState } from "react";

interface EventoContextType {
    isEventoUpdated: boolean,
    onNotificationReceived: Function,
    notifyEventoUpdated: Function,
}

export const EventoContext = createContext<EventoContextType | undefined>(undefined);

export const useEventoContext = () => {
  const context = useContext(EventoContext)
  if (!context) {
    throw new Error('useEventoContext can only be used within EventoProvider')
  }
  return context
}

export const EventoProvider = (props: {children: any}) => {

    const [isEventoUpdated, setIsEventoUpdated] = useState(false);

    function acknowledgeNotification() {
        setIsEventoUpdated(false);
    }

    async function eventoIsUpdated() {
        await sleep(1000);
        console.log("sending notification");
        setIsEventoUpdated(true);
    }
    
    return (
        <EventoContext.Provider 
            value={{
                isEventoUpdated: isEventoUpdated,
                notifyEventoUpdated: eventoIsUpdated,
                onNotificationReceived: acknowledgeNotification
            }}
        >
            {props.children}
        </EventoContext.Provider>
    )
}