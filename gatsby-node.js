const moment = require('moment-timezone')

exports.createPages = async function ({actions, graphql}) {
    const {data} = await graphql(`
query CreatePages {
    jedGraph {
        allArea {
            code
        }
    }
}
    `)
    data.jedGraph.allArea.forEach(area => {
        let targetDate = new Date()
        if ((((targetDate.getUTCHours() + 9) % 24) * 60 + targetDate.getUTCMinutes()) < 70) {
            // before 1:10 am JST: avoid having no peak data
            targetDate = new Date(targetDate.getTime() - (1000 * 60 * 60 * 24))
        }
        const targetDateString = moment(targetDate).tz("Asia/Tokyo").format('YYYY-MM-DD')
        // console.log('Target Date: ' + targetDateString)
        const {code} = area
        actions.createPage({
            path: code,
            component: require.resolve('./src/templates/area.tsx'),
            context: {
                code: code,
                targetDate: targetDateString,
            }
        })
    });
}
