/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import moment from "moment-timezone"

// The first update of the day is 2:10 am JST
const FIRST_UPDATE_MINUTE = 130

const getPredictedLastUpdateDate = () => {
    let targetDate = new Date()
    if ((((targetDate.getUTCHours() + 9) % 24) * 60 + targetDate.getUTCMinutes()) < FIRST_UPDATE_MINUTE) {
        targetDate = new Date(targetDate.getTime() - (1000 * 60 * 60 * 24))
    }
    const targetDateString = moment(targetDate).tz("Asia/Tokyo").format('YYYY-MM-DD')

    return targetDateString
}

export default getPredictedLastUpdateDate
