/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import gql from "graphql-tag";
import { Area, HourlyDemand, PeakElectricity } from "./queryTypes";

export declare type HomeQueryResponse = {
    allArea: HomeQueryResponseAreaFragment[],
}

export declare type HomeQueryResponseArea = 
    Pick<
        Area<
            Pick<PeakElectricity, "date" | "expectedHour" | "percentage" | "amount" | "supply">,
            Pick<HourlyDemand, "hour" | "absTime" | "percentage" | "amount" | "supply" | "createdAt">
        >, "code" | "name" | "peak" | "hourly"
    >

export declare type HomeQueryResponseAreaFragment =
    Partial<HomeQueryResponseArea> &
    Pick<Area, "code" | "name">

const homeQuery = gql`
query HomeQuery {
    allArea {
        code
        name
        peak {
            date
            expectedHour
            percentage
            amount
            supply
        }
        hourly {
            hour
            absTime
            percentage
            amount
            supply
            createdAt
        }
    }
}
`

export const homeStaticQuery = gql`
query HomeStaticQuery {
    allArea {
        code
        name
    }
}
`

export default homeQuery
