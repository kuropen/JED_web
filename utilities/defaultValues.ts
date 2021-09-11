import { HourlyDemand, PeakElectricity } from "../queries/queryTypes"

const PeakElectricityDefaultValues: PeakElectricity = {
    amount: 0,
    date: new Date().toString(),
    expectedHour: '',
    percentage: 0,
    supply: 0,
    type: "AMOUNT",
}

const HourlyDemandDefaultValues: HourlyDemand = {
    absTime: new Date().toISOString(),
    amount: 0,
    createdAt: new Date().toISOString(),
    hour: 0,
    percentage: 0,
    supply: 0,
}

export {
    PeakElectricityDefaultValues,
    HourlyDemandDefaultValues
}