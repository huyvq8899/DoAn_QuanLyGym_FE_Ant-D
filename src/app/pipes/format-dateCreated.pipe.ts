import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'formatCreatedDate'
})
export class FormatCreatedDate implements PipeTransform {
  constructor() { }

  transform(value?: any): any {
    const result = value.split('T')[0];
    return result;
  }
}
