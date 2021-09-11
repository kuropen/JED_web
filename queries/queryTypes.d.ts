export declare type Area<T extends Partial<PeakElectricity> = {}, U extends Partial<HourlyDemand> = {}> = {
    id: number,
    code: string,
    name: string,
    longName: string,
    officialWeb: string,
    hasWindData: boolean,
    peak: T[],
    hourly: U[],
}

export declare type PeakType = "AMOUNT" | "PERCENTAGE"

export declare type PeakElectricity = {
    type: PeakType,
    amount: number,
    supply: number,
    percentage: number,
    expectedHour: string,
    date: string,
}

export declare type HourlyDemand = {
    absTime: string,
    hour: number,
    amount: number,
    supply: number,
    percentage: number,
    createdAt: string,
}