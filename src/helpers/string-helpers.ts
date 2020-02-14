import moment from 'moment'

export const dateToDay = (date: string) => {
    return Number(moment(date).format('D'))
}

export const dateToTime = (date: string) => {
    return moment(date).format('h:mm a')
}
