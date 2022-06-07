import { Component, ViewEncapsulation } from '@angular/core';
import { SummaryMetricService } from 'src/app/services/summary-metric.service';
import { AppSettings } from '../../../app.settings';


@Component({
  selector: 'app-visitors',
  templateUrl: './metric-status.component.html',
  styleUrls: ['./metric-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SummaryMetricService]
})
export class MetricStatusComponent {


  public colorScheme = {
    domain: ['#F47B00', '#FF0000', '#378D3B', ,'#ff6277']
  };
  public gradient: boolean = false;
  public tooltipDisabled: boolean = false;
  public summaries: any[]=[];
  public visitorsLabelFormat(c): string {
    console.dir(c)
    switch (c.label) {
      case 'on-loaded':
        return `<span class="flag-icon flag-icon-de mr-2"></span>${c.label}`;
      case 'on-unloaded':
        return `<span class="flag-icon flag-icon-fr mr-2"></span>${c.label}`;
      case 'off':
        return `<span class="flag-icon flag-icon-gb mr-2"></span>${c.label}`;
      default:
        return c.label;
    }
  }



  constructor(public appSettings: AppSettings, public summaryMetricService: SummaryMetricService) {

  }


  ngOnInit() {
  /*  setTimeout(() => this.countries = countries);
    this.countries = countries;*/

    this.getSummaries();
  }







  getSummaries(): void {
    this.summaries=[];
    this.summaryMetricService.getSummaryMetric().subscribe(values => {

      values.forEach(element => {

        this.summaries.push({
          name: element.metric,
          value: element.totalMetrics
        })
      });

      this.summaries=[...this.summaries];
      console.dir( this.summaries)
    }
    );


  } public onSelect(event) {
    console.log(event);
  }

}
