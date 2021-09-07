const PeakElectricityDefaultValues: GatsbyTypes.JED_PeakElectricity = {
    id: 0,
    areaId: 0,
    amount: 0,
    createdAt: new Date().toISOString(),
    date: new Date().toString(),
    expectedHour: '',
    isTomorrow: false,
    percentage: 0,
    reservePct: 0,
    supply: 0,
    type: "AMOUNT",
    updatedAt: new Date().toISOString()
}

const HourlyDemandDefaultValues: GatsbyTypes.JED_HourlyDemand = {
    id: 0,
    absTime: new Date().toISOString(),
    amount: 0,
    areaId: 0,
    createdAt: new Date().toISOString(),
    date: new Date().toISOString(),
    hour: 0,
    percentage: 0,
    supply: 0,
    updatedAt: new Date().toISOString(),
}

export {
    PeakElectricityDefaultValues,
    HourlyDemandDefaultValues
}