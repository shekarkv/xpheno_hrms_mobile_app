import { Component, Output, EventEmitter, Input, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'cs-map-layout-3',
  templateUrl: 'map-layout-3.page.html',
  styleUrls: ['map-layout-3.page.scss'],
})
export class MapLayout3Page implements OnChanges, AfterViewInit {
  @Input() data: any;

  // viewEntered = false; 
  viewEntered = true;
  // locations = [
  //   {
  //     lat:24.799448,
  //     lng:120.979021,
  //     label:"sultapaliya",
  //     description:"test 1"
  //   },
  //   {
  //     lat:24.799450,
  //     lng:120.989100,
  //     label:"Hebbal",
  //     description:"test 2"
  //   }
  // ];

  constructor() {  
  }

  ngAfterViewInit() {
    // this.viewEntered = true;
  }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;

    console.log("map data - "+JSON.stringify(this.data));
  }
}
