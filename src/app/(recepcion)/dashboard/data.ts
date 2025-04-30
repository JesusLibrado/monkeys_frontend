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
    disponible: true,
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
    folio: 23,
    total: 0.0,
    estatus: "CREADA",
    evento: {
      nombreCliente: 'Luis',
      estatus: "EN_PROGRESO"
    }
  }
]

export const conceptosFacturaMockInput = [
  {
    facturaId: '1',
    conceptosFactura: [
      {
        cantidad: 2,
        total: 60.0,
        producto: {
          nombre: 'Gel p/cabello',
          marca: 'Soavence',
          precioPublico: 30.0
        }
      },
      {
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
    facturaId: '2',
    conceptosFactura: []
  }
]