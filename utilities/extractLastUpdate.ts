/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import moment from "moment-timezone";
import { HomeQueryResponseAreaFragment } from "../queries/homeQuery";

const extractLastUpdate = <T extends HomeQueryResponseAreaFragment> (allArea: Array<T | undefined> | undefined) => {
  if (allArea === undefined) {
      return moment().tz("Asia/Tokyo").toISOString()
  }
  let lastUpdateCandidate: Array<number> = []
  allArea.forEach((area) => {
    if (area?.hourly) {
      lastUpdateCandidate.push(new Date(area.hourly[0].createdAt).getTime())
    }
  })
  const lastUpdateTime = lastUpdateCandidate.sort((a, b) => (b - a))[0] || new Date().getTime()
  const lastUpdateDate = moment(new Date(lastUpdateTime)).tz("Asia/Tokyo").toISOString()

  return lastUpdateDate
}

export default extractLastUpdate
