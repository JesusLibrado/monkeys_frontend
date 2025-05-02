export const estacionesMockInput = [
  {
    id: '1',
    numero: 1,
    disponible: false,
    empleado: {
      nombre: 'Uriel'
    }
  },
  {
    id: '2',
    numero: 2,
    disponible: false,
    empleado: {
      nombre: 'Javier'
    }
  },
  {
    id: '3',
    numero: 3,
    disponible: true,
    empleado: {
      nombre: 'Osvaldo'
    }
  },
  {
    id: '4',
    numero: 4,
    disponible: false,
    empleado: {
      nombre: 'Mariana'
    }
  }
]


export const facturasMockInput = [
  {
    id: '1',
    estacionId: '1',
    folio: 23,
    total: 240.0,
    estatus: "CREADA",
    evento: {
      nombreCliente: 'Juan',
      estatus: "EN_PROGRESO"
    }
  },
  {
    id: '2',
    estacionId: '2',
    folio: 24,
    total: 0.0,
    estatus: "CREADA",
    evento: {
      nombreCliente: 'Luis',
      estatus: "EN_PROGRESO"
    }
  },
  {
    id: '3',
    estacionId: '4',
    folio: 25,
    total: 350.0,
    estatus: "CREADA",
    evento: {
      nombreCliente: 'Salvador',
      estatus: "EN_PROGRESO"
    }
  }
]

export const conceptosFacturaMockInput = [
  {
    facturaId: '1',
    conceptosFactura: [
      {
        id: 'concept-factura-1',
        cantidad: 2,
        total: 60.0,
        producto: {
          nombre: 'Gel p/cabello',
          marca: 'Soavence',
          precioPublico: 30.0
        }
      },
      {
        id: 'concept-factura-2',
        cantidad: 1,
        total: 180.0,
        servicio: {
            nombre: 'Desvanecido',
            categoria: 'CORTE',
            precio: 180.0
        }
      }
    ]
  },
  {
    facturaId: '3',
    conceptosFactura: [
      {
        id: 'concept-factura-3',
        cantidad: 1,
        total: 350.0,
        servicio: {
            nombre: 'Cotizacion Salvador',
            categoria: 'GRECA',
            precio: 350.0
        }
      }
    ]
  }
]

export const productosMockInput = [
  {
    id: 'producto-1',
    nombre: 'Gel p/cabello',
    marca: 'Soavence',
    cantidadDisponible: 10,
    precioPublico: 30.0
  },
  {
    id: 'producto-2',
    nombre: 'Cera p/cabello',
    marca: 'Soavence',
    cantidadDisponible: 2,
    precioPublico: 60.0
  }
]

export const serviciosMockInput = [
  {
    id: 'servicio-1',
    nombre: 'Desvanecido',
    categoria: 'CORTE',
    precio: 180.0
  },
  {
    id: 'servicio-2',
    nombre: 'Tijera',
    categoria: 'CORTE',
    precio: 150.0
  },
  {
    id: 'servicio-3',
    nombre: 'Afeitado plus',
    categoria: 'BARBA',
    precio: 150.0
  },
  {
    id: 'servicio-4',
    nombre: 'Bigote',
    categoria: 'BARBA',
    precio: 150.0
  },
  {
    id: 'servicio-5',
    nombre: 'Premium',
    categoria: 'FACIAL',
    precio: 150.0
  },
]