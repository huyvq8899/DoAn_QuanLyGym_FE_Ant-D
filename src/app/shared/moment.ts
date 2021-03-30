import * as moment from 'moment';

export function formatDate(value: any, format: string) {
    const result = moment(value).format(format);
    return result;
}
