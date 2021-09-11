import { HourlyDemand } from "../queries/queryTypes";

const extractLastUpdate = <T extends Pick<HourlyDemand, "createdAt">> (hd: Array<T>) => (hd[0].createdAt)

export default extractLastUpdate
