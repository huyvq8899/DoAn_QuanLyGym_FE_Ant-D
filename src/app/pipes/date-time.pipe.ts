import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
  constructor() { }

  transform(value: string, args?: any): any {
    if (!value) {
      return '';
    }

    const result = moment(value).format('DD/MM/YYYY');
    return result;
  }
}
