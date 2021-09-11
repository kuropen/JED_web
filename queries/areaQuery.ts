import { gql } from "@apollo/client";
import getPredictedLastUpdateDate from "../utilities/getPredictedLastUpdateDate";
import { Area, HourlyDemand, PeakElectricity } from "./queryTypes";

export declare type AreaQueryResponse = {
    areaByCode: Pick<Area, "id" | "code" | "name" | "longName" | "officialWeb" | "hasWindData">,
    peakElectricity: Pick<PeakElectricity, "type" | "amount" | "supply" | "percentage" | "expectedHour">[],
    hourlyDemand: Pick<HourlyDemand, "absTime" | "hour" | "amount" | "supply" | "percentage" | "createdAt">[],
}

export declare type AreaStaticQueryResponse = Pick<AreaQueryResponse, "areaByCode">

export declare type AreaQueryResponseMaybeDynamic = Partial<AreaQueryResponse> & AreaStaticQueryResponse

export declare type AreaQueryParamsFragment = {
    code: string,
    targetDate?: string,
}
export declare type AreaQueryParams = Required<AreaQueryParamsFragment>

export const buildAreaQueryParams = (baseParams: AreaQueryParamsFragment): AreaQueryParams => {
    const targetDate = baseParams.targetDate || getPredictedLastUpdateDate()
    return {
        code: baseParams.code,
        targetDate: targetDate,
    }
}

const areaQuery = gql`
query AreaPage ($code: String!, $targetDate: String!) {
    areaByCode(code: $code) {
        id
        code
        name
        longName
        officialWeb
        hasWindData
    }
    peakElectricity(areaCode: $code, date: $targetDate) {
        type
        amount
        supply
        percentage
        expectedHour
    }
    hourlyDemand(areaCode: $code, limit: 12) {
        absTime
        hour
        amount
        supply
        percentage
        createdAt
    }
    #fiveMinDemand(areaCode: $code, limit: 24) {
    #    absTime
    #    amount
    #    solar
    #    wind
    #    createdAt
    #}
}
`

export default areaQuery

export const areaStaticQuery = gql`
query AreaPageStatic ($code: String!) {
    areaByCode(code: $code) {
        id
        code
        name
        longName
        officialWeb
        hasWindData
    }
}
`
