import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  // Properties
  public reportedError: boolean;
  public errorPercentage: number = 0;
  public timer;

  // Constructor
  constructor() { }

  ngOnInit() {
  }

  // CheckBox checkChanged function
  public checkChanged = (event) => {
    this.reportedError = event.checked;

    this.reportedError ? this.startTimer() : this.stopTimer();
  }

  // Private helper startTimer function
  private startTimer = () => {
    this.timer = setInterval(() => {
      this.errorPercentage += 1;

      if (this.errorPercentage === 100) {
        clearInterval(this.timer);
      }
    }, 30);
  }

  // Private helper stopTimer function
  private stopTimer = () => {
    clearInterval(this.timer);
    this.errorPercentage = 0;
  }
}
