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
