import moment from 'moment';

export const horaMes = (date: string) => {
    let today = moment(date);
    return today.format('HH:mm a');
}