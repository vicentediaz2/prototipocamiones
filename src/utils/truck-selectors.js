const TRUCK_SELECTOR_CONFIG = {
  insideCodes: ["inside", "unloading", "waiting_dock", "inspection"]
};

export function getTruckStatus(truck) {
  return truck.currentStatus;
}

export function getTruckTableRow(truck) {
  return {
    id: truck.id,
    plate: truck.plate,
    location: truck.currentLocation,
    process: truck.currentProcess,
    status: getTruckStatus(truck),
    entryAt: truck.entryAt,
    dock: truck.dock,
    driverName: truck.driverName,
    cargoType: truck.cargoType,
    priority: truck.priority
  };
}

export function isTruckInsidePlant(truck) {
  return (
    TRUCK_SELECTOR_CONFIG.insideCodes.includes(truck.presenceState) ||
    TRUCK_SELECTOR_CONFIG.insideCodes.includes(getTruckStatus(truck)?.code)
  );
}

export function getPlantTrucks(trucks) {
  return trucks.filter(isTruckInsidePlant).map(getTruckTableRow);
}

export function getRealtimeTruckRows(trucks) {
  return trucks.map(getTruckTableRow);
}

export function getTruckById(trucks, truckId) {
  return trucks.find((truck) => truck.id === truckId) ?? null;
}
