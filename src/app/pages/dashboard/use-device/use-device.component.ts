import { Component, ViewEncapsulation } from '@angular/core';
import { DailyStatusSumaryService } from 'src/app/services/daily-status-sumary.service';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { cost } from '../dashboard.data';

function getNewTime(d){
  let h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s = (d.getSeconds()<10?'0':'') + d.getSeconds(),
      time = h + ":" + m + ":" + s;
  return time;
}

@Component({
  selector: 'app-use-device',
  templateUrl: './use-device.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DailyStatusSumaryService]
})
export class UseDeviceComponent {

  public sumarys: any[];
  public sumarysInfo: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient:boolean = true;
  public tooltipDisabled:boolean = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time';
  public showYAxisLabel = true;
  public yAxisLabel = 'Use';
  public colorScheme = {
    domain: ['#E7E55D','#0096A6','#3FC422' ,'#D22E2E']
  }; 
  public autoScale = true;
  
  public previousShowMenuOption:boolean;
  public previousMenuOption:string;
  public previousMenuTypeOption:string;
  public settings: Settings;

   map = new Map();
  constructor(public appSettings:AppSettings,public dailyStatusSumaryService:DailyStatusSumaryService) {    
    
  }

  ngOnInit(){
    
    this.getLoads();
  }
  



 getLoads(): void {
  this.dailyStatusSumaryService.getDailyStatusSumary().subscribe( sumarys => {
    
   this.sumarys=sumarys._embedded.dailystatussumary
   this.processSumarys(this.sumarys);}
  );    
}


processSumarys(sumarys){
 
  sumarys.forEach(element => {
    if(this.map.get(element.statusName))
    {
      this.map.get(element.statusName).push({"name":element.date, "value": element.quantityMetric})

    }
    else
    this.map.set(element.statusName,[])
  });
  this.sumarysInfo=[]

  this.map.forEach( (val, key) =>  this.sumarysInfo.push({name:key,series:val})); // "A 1", "B 2"

}
  public onSelect(event) {
    console.log(event);
  }

 
}
