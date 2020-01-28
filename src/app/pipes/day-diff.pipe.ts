
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayDiff'
})
export class DayDiffPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // let temp =  value.toDate().getTime();
    

    var today = new Date().getTime();
    // var day = new Date(value).getTime();
    var day = value.toDate().getTime();
    var diff = Math.floor((today - day) / (1000*3600*24));
    if (diff == 0) {
      return "Today"
    } else if (diff == 1) {
      return "1 day ago"
    } else {
      return diff + " days ago"
    }
  }

}
