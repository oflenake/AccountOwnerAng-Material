import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  // Properties
  public errorMessage: string = '';
  public dialogConfig;

  // Constructor
  constructor(private router: Router, private dialog: MatDialog) { }

  // Public main handleError function
  public handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error)
    }
    else {
      this.handleOtherError(error);
    }
  }

  // Private helper 500, handle500Error function
  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  // Private helper 404, handle404Error function
  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  // Private helper other, handleOtherError function
  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.dialogConfig.data = { 'errorMessage': this.errorMessage };
    this.dialog.open(ErrorDialogComponent, this.dialogConfig);    // ErrorDialogComponent's template reference
  }

  // Private helper create error message, createErrorMessage function
  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}
