import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LoadStatusService } from 'src/app/services/load-status.service';

@Component({
  selector: 'app-load-status',
  templateUrl: './load-status.component.html',
  styleUrls: ['./load-status.component.scss'],
  providers: [ LoadStatusService ]
})
export class LoadStatusComponent implements OnInit {


 


  @ViewChild(DatatableComponent) table: DatatableComponent;

  columns = [
    { prop: 'initDate',name:'Init Date' },
    { prop: 'endDate',name:'End Date' },
    { prop: 'status',name:'Status' }
  ];
  loadingIndicator: boolean = true;
  rows=[];
  temp = [];
  selected:any;

 constructor( public loadStatusService:LoadStatusService,) {
   
  }
  ngOnInit(): void {
    this.getLoads();
  }

  public getLoads(): void {
    this.loadStatusService.getLoads().subscribe( load => 
      
     this.rows=load._embedded.loadprocess
    );    
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

}