import moment from 'moment'

export const capitalizeString = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();


export const dateToDay = (date: string) => {
    return Number(moment(date).format('D'))
}
