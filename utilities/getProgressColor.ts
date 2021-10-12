/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
function getProgressColor(percentage: number): string {
    if (percentage >= 97) {
        return "red.600"
    }
    if (percentage >= 95) {
        return "orange.500"
    }
    if (percentage >= 93) {
        return "yellow.500"
    }
    if (percentage >= 85) {
        return "green.500"
    }
    return "cyan.500"
}

export default getProgressColor
