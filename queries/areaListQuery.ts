/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import gql from "graphql-tag";
import { Area } from "./queryTypes";

export declare type AreaListQueryResponse = {
    allArea: AreaListQueryResponseArea[],
}

export declare type AreaListQueryResponseArea = 
    Pick<
        Area, "code"
    >

const areaListQuery = gql`
query AreaListQuery {
    allArea {
        code
    }
}
`

export default areaListQuery
