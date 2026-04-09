const HEADER_META = {
  windowTitle: "Panel de Acceso de Logistica y Camiones",
  sectionTitle: "Panel de Gestion Logistica",
  searchPlaceholder: "Buscar",
  userName: "Benjamin Ortega",
  userRole: "Operador",
  scheduleLabel: "30 de Marzo 2026 - 12:00 AM"
};

const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "grid", viewTitle: "Panel de Gestion Logistica" },
  { id: "fleet", label: "Log Camiones", icon: "truck", viewTitle: "Ultimos Movimientos De Camiones" },
  { id: "sensors", label: "En Planta", icon: "wifi", viewTitle: "Camiones Dentro De Planta" },
  { id: "alerts", label: "Alertas", icon: "alert", viewTitle: "Panel de Gestion Logistica" },
  { id: "reports", label: "Truck Events", icon: "report", viewTitle: "Vista Bruta De Truck Events" },
  { id: "settings", label: "Configuracion", icon: "settings", viewTitle: "Panel de Gestion Logistica" }
];

const KPI_CARDS = [
  {
    id: "active-trucks",
    label: "Camiones Activos:",
    value: "0",
    delta: "(0%)",
    accent: "teal",
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "today-income",
    label: "Ingresos Monitoreados:",
    value: "0",
    delta: "(0%)",
    accent: "blue",
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "recent-alerts",
    label: "Alertas Recientes:",
    value: "0",
    delta: "(0%)",
    accent: "amber",
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    id: "sensor-availability",
    label: "Sensores Operativos:",
    value: "0/0",
    delta: "(0%)",
    accent: "teal",
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
];

const TRUCK_EVENTS = [
  { eventoId: "mov-0088", truckId: "001", plate: "BOPPA5A", estado: "salir", fecha: "2026-04-10", hora: "08:06:00" },
  { eventoId: "mov-0087", truckId: "012", plate: "MW56LXT", estado: "salir", fecha: "2026-04-10", hora: "07:58:00" },
  { eventoId: "mov-0086", truckId: "003", plate: "BH031NR", estado: "salir", fecha: "2026-04-10", hora: "07:49:00" },
  { eventoId: "mov-0085", truckId: "002", plate: "B2P0A3B", estado: "salir", fecha: "2026-04-10", hora: "07:41:00" },
  { eventoId: "mov-0084", truckId: "008", plate: "JH82LPA", estado: "salir", fecha: "2026-04-10", hora: "07:30:00" },
  { eventoId: "mov-0083", truckId: "004", plate: "K8PBA4B", estado: "entrar", fecha: "2026-04-10", hora: "07:22:00" },
  { eventoId: "mov-0082", truckId: "006", plate: "RR2PSCR", estado: "entrar", fecha: "2026-04-10", hora: "07:15:00" },
  { eventoId: "mov-0081", truckId: "001", plate: "BOPPA5A", estado: "entrar", fecha: "2026-04-10", hora: "07:07:00" },
  { eventoId: "mov-0080", truckId: "012", plate: "MW56LXT", estado: "entrar", fecha: "2026-04-10", hora: "06:58:00" },
  { eventoId: "mov-0079", truckId: "011", plate: "PQ11DKA", estado: "salir", fecha: "2026-04-10", hora: "06:51:00" },
  { eventoId: "mov-0078", truckId: "010", plate: "TR84QMN", estado: "salir", fecha: "2026-04-10", hora: "06:42:00" },
  { eventoId: "mov-0077", truckId: "009", plate: "LS29WQA", estado: "salir", fecha: "2026-04-10", hora: "06:33:00" },
  { eventoId: "mov-0076", truckId: "007", plate: "D92PREB", estado: "salir", fecha: "2026-04-10", hora: "06:27:00" },
  { eventoId: "mov-0075", truckId: "005", plate: "D93PATA", estado: "salir", fecha: "2026-04-10", hora: "06:19:00" },
  { eventoId: "mov-0074", truckId: "003", plate: "BH031NR", estado: "entrar", fecha: "2026-04-10", hora: "06:12:00" },
  { eventoId: "mov-0073", truckId: "002", plate: "B2P0A3B", estado: "entrar", fecha: "2026-04-10", hora: "06:06:00" },
  { eventoId: "mov-0072", truckId: "008", plate: "JH82LPA", estado: "entrar", fecha: "2026-04-09", hora: "15:43:00" },
  { eventoId: "mov-0071", truckId: "004", plate: "K8PBA4B", estado: "salir", fecha: "2026-04-09", hora: "15:35:00" },
  { eventoId: "mov-0070", truckId: "006", plate: "RR2PSCR", estado: "salir", fecha: "2026-04-09", hora: "15:27:00" },
  { eventoId: "mov-0069", truckId: "011", plate: "PQ11DKA", estado: "entrar", fecha: "2026-04-09", hora: "15:18:00" },
  { eventoId: "mov-0068", truckId: "010", plate: "TR84QMN", estado: "entrar", fecha: "2026-04-09", hora: "15:10:00" },
  { eventoId: "mov-0067", truckId: "009", plate: "LS29WQA", estado: "entrar", fecha: "2026-04-09", hora: "15:01:00" },
  { eventoId: "mov-0066", truckId: "007", plate: "D92PREB", estado: "entrar", fecha: "2026-04-09", hora: "14:53:00" },
  { eventoId: "mov-0065", truckId: "005", plate: "D93PATA", estado: "entrar", fecha: "2026-04-09", hora: "14:44:00" },
  { eventoId: "mov-0064", truckId: "001", plate: "BOPPA5A", estado: "salir", fecha: "2026-04-09", hora: "14:35:00" },
  { eventoId: "mov-0063", truckId: "012", plate: "MW56LXT", estado: "salir", fecha: "2026-04-09", hora: "14:27:00" },
  { eventoId: "mov-0062", truckId: "003", plate: "BH031NR", estado: "salir", fecha: "2026-04-09", hora: "14:19:00" },
  { eventoId: "mov-0061", truckId: "002", plate: "B2P0A3B", estado: "salir", fecha: "2026-04-09", hora: "14:07:00" },
  { eventoId: "mov-0060", truckId: "008", plate: "JH82LPA", estado: "salir", fecha: "2026-04-09", hora: "13:54:00" },
  { eventoId: "mov-0059", truckId: "004", plate: "K8PBA4B", estado: "entrar", fecha: "2026-04-09", hora: "13:46:00" },
  { eventoId: "mov-0058", truckId: "006", plate: "RR2PSCR", estado: "entrar", fecha: "2026-04-09", hora: "13:38:00" },
  { eventoId: "mov-0057", truckId: "011", plate: "PQ11DKA", estado: "salir", fecha: "2026-04-09", hora: "13:31:00" },
  { eventoId: "mov-0056", truckId: "010", plate: "TR84QMN", estado: "salir", fecha: "2026-04-09", hora: "13:24:00" },
  { eventoId: "mov-0055", truckId: "009", plate: "LS29WQA", estado: "salir", fecha: "2026-04-09", hora: "13:16:00" },
  { eventoId: "mov-0054", truckId: "001", plate: "BOPPA5A", estado: "entrar", fecha: "2026-04-09", hora: "13:03:00" },
  { eventoId: "mov-0048", truckId: "006", plate: "RR2PSCR", estado: "salir", fecha: "2026-04-09", hora: "12:10:00" },
  { eventoId: "mov-0041", truckId: "001", plate: "BOPPA5A", estado: "salir", fecha: "2026-04-09", hora: "12:02:00" },
  { eventoId: "mov-0047", truckId: "011", plate: "PQ11DKA", estado: "entrar", fecha: "2026-04-09", hora: "11:54:00" },
  { eventoId: "mov-0046", truckId: "010", plate: "TR84QMN", estado: "entrar", fecha: "2026-04-09", hora: "11:46:00" },
  { eventoId: "mov-0045", truckId: "009", plate: "LS29WQA", estado: "entrar", fecha: "2026-04-09", hora: "11:41:00" },
  { eventoId: "mov-0044", truckId: "008", plate: "JH82LPA", estado: "entrar", fecha: "2026-04-09", hora: "11:35:00" },
  { eventoId: "mov-0043", truckId: "007", plate: "D92PREB", estado: "entrar", fecha: "2026-04-09", hora: "11:29:00" },
  { eventoId: "mov-0042", truckId: "005", plate: "D93PATA", estado: "entrar", fecha: "2026-04-09", hora: "11:24:00" }
];

const TRUCK_STATUSES = {
  unloading: { code: "unloading", text: "Descargando", tone: "green" },
  inTransit: { code: "in_transit", text: "En Transito", tone: "blue" },
  completed: { code: "completed", text: "Salida Registrada", tone: "amber" },
  rejected: { code: "rejected", text: "Rechazado", tone: "red" },
  waitingDock: { code: "waiting_dock", text: "Esperando Anden", tone: "amber" },
  inspection: { code: "inspection", text: "Inspeccion", tone: "blue" }
};

const TRUCKS = [
  {
    id: "001",
    plate: "BOPPA5A",
    driverName: "Carlos Silva",
    company: "Logisur",
    cargoType: "Pallets retail",
    currentLocation: "Muelle 01",
    currentProcess: "Descarga de pallets",
    currentStatus: TRUCK_STATUSES.unloading,
    entryAt: "03:03:17:00",
    dock: "Muelle 01",
    priority: "Alta"
  },
  {
    id: "002",
    plate: "B2P0A3B",
    driverName: "Ramon Reyes",
    company: "Ruta Cargo",
    cargoType: "Alimentos secos",
    currentLocation: "Acceso Sur",
    currentProcess: "En Transito",
    currentStatus: TRUCK_STATUSES.inTransit,
    entryAt: "03:03:21:00",
    dock: null,
    priority: "Media"
  },
  {
    id: "003",
    plate: "BH031NR",
    driverName: "Patricio Lopez",
    company: "Andes Supply",
    cargoType: "Envases",
    currentLocation: "Salida Oriente",
    currentProcess: "Manufacturando",
    currentStatus: TRUCK_STATUSES.completed,
    entryAt: "03:03:11:00",
    dock: null,
    priority: "Baja"
  },
  {
    id: "004",
    plate: "K8PBA4B",
    driverName: "Marta Gomez",
    company: "Cargas del Valle",
    cargoType: "Componentes",
    currentLocation: "Control Calidad",
    currentProcess: "Manufacturando",
    currentStatus: TRUCK_STATUSES.rejected,
    entryAt: "03:03:23:00",
    dock: null,
    priority: "Alta"
  },
  {
    id: "005",
    plate: "D93PATA",
    driverName: "Juan Perez",
    company: "Frio Express",
    cargoType: "Insumos refrigerados",
    currentLocation: "Muelle 02",
    currentProcess: "Recepcion de insumos",
    currentStatus: TRUCK_STATUSES.unloading,
    entryAt: "03:03:27:00",
    dock: "Muelle 02",
    priority: "Alta"
  },
  {
    id: "006",
    plate: "RR2PSCR",
    driverName: "Pedro Castillo",
    company: "Ruta Cargo",
    cargoType: "Bobinas",
    currentLocation: "Patio Externo",
    currentProcess: "En Transito",
    currentStatus: TRUCK_STATUSES.inTransit,
    entryAt: "03:03:23:00",
    dock: null,
    priority: "Media"
  },
  {
    id: "007",
    plate: "D92PREB",
    driverName: "Diego Fuentes",
    company: "Logisur",
    cargoType: "Cajas mixtas",
    currentLocation: "Muelle 03",
    currentProcess: "Descarga parcial",
    currentStatus: TRUCK_STATUSES.unloading,
    entryAt: "03:03:33:00",
    dock: "Muelle 03",
    priority: "Media"
  },
  {
    id: "008",
    plate: "JH82LPA",
    driverName: "Oscar Marin",
    company: "Transportes Neva",
    cargoType: "Quimicos industriales",
    currentLocation: "Patio Norte",
    currentProcess: "Espera validacion",
    currentStatus: TRUCK_STATUSES.waitingDock,
    entryAt: "03:04:03:00",
    dock: "Muelle 04",
    priority: "Alta"
  },
  {
    id: "009",
    plate: "LS29WQA",
    driverName: "Andrea Soto",
    company: "Cargas Urbanas",
    cargoType: "Productos limpieza",
    currentLocation: "Muelle 05",
    currentProcess: "Descarga total",
    currentStatus: TRUCK_STATUSES.unloading,
    entryAt: "03:04:18:00",
    dock: "Muelle 05",
    priority: "Alta"
  },
  {
    id: "010",
    plate: "TR84QMN",
    driverName: "Elena Ruiz",
    company: "Andes Supply",
    cargoType: "Contenedores plasticos",
    currentLocation: "Control Calidad",
    currentProcess: "Revision documental",
    currentStatus: TRUCK_STATUSES.inspection,
    entryAt: "03:04:23:00",
    dock: null,
    priority: "Media"
  },
  {
    id: "011",
    plate: "PQ11DKA",
    driverName: "Luis Herrera",
    company: "Pacifica Cargo",
    cargoType: "Electrodomesticos",
    currentLocation: "Muelle 06",
    currentProcess: "Descarga por lote",
    currentStatus: TRUCK_STATUSES.unloading,
    entryAt: "03:04:31:00",
    dock: "Muelle 06",
    priority: "Alta"
  },
  {
    id: "012",
    plate: "MW56LXT",
    driverName: "Paula Torres",
    company: "Frio Express",
    cargoType: "Despacho consolidado",
    currentLocation: "Salida Sur",
    currentProcess: "Cierre de guia",
    currentStatus: TRUCK_STATUSES.completed,
    entryAt: "03:04:36:00",
    dock: null,
    priority: "Baja"
  }
];

const TRUCK_TABLE = {
  title: "Monitoreo En Tiempo Real - Camiones",
  headers: ["ID Camion", "Matricula", "Ubicacion", "Estado", "Hora Entrada"]
};

const TRAFFIC_CHART = {
  title: "Flujo De Trafico Por Hora (Hoy)",
  labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  barsA: [32, 28, 36, 24, 18, 42, 26, 18, 20, 40, 30, 22],
  barsB: [22, 30, 20, 16, 20, 34, 24, 26, 18, 32, 22, 12],
  line: [24, 22, 20, 18, 22, 28, 24, 23, 21, 20, 22, 28]
};

const OPERATIONS_PANEL = {
  title: "Operacion Del Turno",
  highlights: [
    { label: "Muelles Activos", value: "7 / 9", tone: "teal" },
    { label: "Tiempo Promedio", value: "41 min", tone: "blue" },
    { label: "Alertas Criticas", value: "2", tone: "red" }
  ],
  dockAssignments: [
    { dock: "Muelle 01", truckId: "001", task: "Descarga de pallets", tone: "green" },
    { dock: "Muelle 02", truckId: "005", task: "Recepcion de insumos", tone: "green" },
    { dock: "Muelle 03", truckId: "007", task: "Descarga parcial", tone: "green" },
    { dock: "Muelle 04", truckId: "008", task: "Esperando validacion", tone: "amber" }
  ],
  alerts: [
    { title: "Anden 05 con retraso", detail: "17 min por sobre SLA de descarga", tone: "red" },
    { title: "Sensor patio norte inestable", detail: "Ultima lectura hace 2 min", tone: "amber" },
    { title: "Despacho nocturno confirmado", detail: "Ventana 23:30 - 00:10", tone: "blue" }
  ]
};

const FACILITY_PANEL = {
  title: "Estado De Sensor IOT",
  sensors: [
    { label: "Fibase Cloud", state: "Connected", tone: "amber" },
    { label: "ESP32 Nodes", state: "Offline", tone: "teal" },
    { label: "Gate Reader 01", state: "Stable", tone: "teal" },
    { label: "Balanza Patio", state: "Stable", tone: "amber" }
  ],
  recentLogs: [
    {
      id: "seed-log-01",
      sensorName: "Gate Reader 01",
      level: "INFO",
      timestamp: "2026-04-09T11:12:12.000Z"
    },
    {
      id: "seed-log-02",
      sensorName: "Balanza Patio",
      level: "WARN",
      timestamp: "2026-04-09T11:16:23.000Z"
    },
    {
      id: "seed-log-03",
      sensorName: "ESP32 Node 04",
      level: "INFO",
      timestamp: "2026-04-09T11:19:41.000Z"
    },
    {
      id: "seed-log-04",
      sensorName: "Yard Cam 02",
      level: "ERROR",
      timestamp: "2026-04-09T11:22:09.000Z"
    },
    {
      id: "seed-log-05",
      sensorName: "Dock Sensor 07",
      level: "INFO",
      timestamp: "2026-04-09T11:28:55.000Z"
    }
  ]
};

export const dashboardData = {
  brandName: "Modelo Alpha",
  header: HEADER_META,
  sidebarItems: SIDEBAR_ITEMS,
  kpiCards: KPI_CARDS,
  trucks: TRUCKS,
  truckEvents: TRUCK_EVENTS,
  truckStateSummary: { total: TRUCKS.length, inside: 7, outside: 5, unknown: 0 },
  truckTable: TRUCK_TABLE,
  trafficChart: TRAFFIC_CHART,
  operationsPanel: OPERATIONS_PANEL,
  facilityPanel: FACILITY_PANEL
};
