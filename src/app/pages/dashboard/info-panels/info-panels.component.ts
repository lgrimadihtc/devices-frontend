import { Component, ViewEncapsulation } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-info-panels',
  templateUrl: './info-panels.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [StatisticService]
  
})
export class InfoPanelsComponent {
  
  public devices = [{ name:'devices', value:0.0 }];
  public devicesBgColor = { domain: ['#2F3E9E'] };

  public metrics = [{ name:'metric', value:0.0 }];
  public metricsBgColor = { domain: ['#D22E2E'] };

  public totalMetrics = [{ name:'Total metric devices', value:0.0 }];
  public totalMetricsBgColor = { domain: ['#378D3B'] };

  public totalDailys = [{ name:'Total dailys Summary', value:0.0 }];
  public totalDailysBgColor = { domain: ['#0096A6'] };



  public infoLabelFormat(c): string {
    switch(c.data.name) {
      case 'devices':
        return `<i class="fa fa-area-chart mr-2"></i>${c.label}`;
      case 'metric':
        return `<i class="fa fa-thumbs-o-up mr-2"></i>${c.label}`;
      case 'Total metric devices':
        return `<i class="fa fa-download mr-2"></i>${c.label}`;
      case 'Total dailys Summary':
        return `<i class="fa fa-money mr-2"></i>${c.label}`;
    
      default:
        return c.label;
    }
  }

  public infoValueFormat(c): string {
    switch(c.data.extra ? c.data.extra.format : '') {
      case 'currency':
        return `\$${Math.round(c.value).toLocaleString()}`;
      case 'percent':
        return `${Math.round(c.value * 100)}%`;
      default:
        return c.value.toLocaleString();
    }
  }

  public previousShowMenuOption:boolean;
  public previousMenuOption:string;
  public previousMenuTypeOption:string;
  public settings: Settings;
  constructor(public appSettings:AppSettings,public statisticService:StatisticService) {    
 
  }

  public onSelect(event) {
    console.log(event);
  }


  ngOnInit(): void {
    this.getLoads();
  }

  public getLoads(): void {
    this.statisticService.getStatistic().subscribe( data => {
      this.devices[0].value=data.totalDevices
      this.devices = [...this.devices] 
      this.metrics[0].value=data.totalMetric
      this.metrics = [...this.metrics] 
      this.totalMetrics[0].value=data.totalMetricDevices
      this.totalMetrics = [...this.totalMetrics] 
      this.totalDailys[0].value=data.totalDaily
      this.totalDailys = [...this.totalDailys] 
   
    }
    );    

  
  }


  
}
