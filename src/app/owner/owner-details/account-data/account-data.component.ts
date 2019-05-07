import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {
  // Properties
  @Input() public accounts: Account[];

  // Constructor
  constructor() { }

  // Initialize
  ngOnInit() {
  }

}
