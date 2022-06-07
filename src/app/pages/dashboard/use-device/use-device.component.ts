import { Component, ViewEncapsulation } from '@angular/core';
import { DailyStatusSumaryService } from 'src/app/services/daily-status-sumary.service';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';




@Component({
  selector: 'app-use-device',
  templateUrl: './use-device.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [DailyStatusSumaryService]
})
export class UseDeviceComponent {

  public summaries: any[];
  public summariesInfo: any[];
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
  constructor(public appSettings:AppSettings,public dailyStatussummarieservice:DailyStatusSumaryService) {    
    
  }

  ngOnInit(){
    
    this.getLoads();
  }
  



 getLoads(): void {
  this.dailyStatussummarieservice.getDailyStatusSumary().subscribe( summaries => {
    
   this.summaries=summaries._embedded.dailystatussumary
   this.processsummaries(this.summaries);}
  );    
}


processsummaries(summaries){
 
  summaries.forEach(element => {
    if(this.map.get(element.statusName))
    {
      this.map.get(element.statusName).push({"name":element.date, "value": element.quantityMetric})

    }
    else
    this.map.set(element.statusName,[])
  });
  this.summariesInfo=[]

  this.map.forEach( (val, key) =>  this.summariesInfo.push({name:key,series:val})); // "A 1", "B 2"

}
  public onSelect(event) {
    console.log(event);
  }

 
}
