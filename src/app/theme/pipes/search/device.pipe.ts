import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DevicePipe', pure: false })
export class DevicePipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(device => {
        if (device.deviceId) {
          return device.deviceId.search(searchText) !== -1;
        }
        else{
          return device.deviceId.search(searchText) !== -1;
        }
      });
    }
  }
}