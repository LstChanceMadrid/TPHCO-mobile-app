let today = new Date()
let todaySplit = today.toLocaleDateString().split('/')
let year = todaySplit[2]

const day = () => {
    if (todaySplit[1] < 10) {
        return '0' + todaySplit[1]
    } else {
        return todaySplit[1]
    }
}

const month = () => {
    if (todaySplit[0] < 10) {
        return '0' + todaySplit[0]
    } else {
        return todaySplit[0]
    }
}

export const TODAY = {
    DAY: day(),
    MONTH: month(),
    YEAR: year
}