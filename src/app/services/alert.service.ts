import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AlertService {



  constructor() { }



  printAlerts<T>(alerts: T):string[]{
   return Object.values(alerts).map((alert, counter) => alert.concat(Object.values(alerts)[++counter]))[0]
 }


 

}
