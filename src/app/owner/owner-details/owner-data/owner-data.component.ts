import { Owner } from './../../../_interface/owner.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-owner-data',
  templateUrl: './owner-data.component.html',
  styleUrls: ['./owner-data.component.css']
})
export class OwnerDataComponent implements OnInit {
  // Properties
  @Input() public owner: Owner;
  @Output() selectEmitt = new EventEmitter();
  public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];

  // Constructor
  constructor() { }

  // Initialize
  ngOnInit() {
  }

  // mat-select onChange event function
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }
}
