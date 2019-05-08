import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { OwnerForCreation } from '../../_interface/ownerForCreation.model';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {
  // Properties
  public ownerForm: FormGroup;
  private dialogConfig;

  // Constructor
  constructor(
    private location: Location, private repository: RepositoryService,
    private dialog: MatDialog, private errorService: ErrorHandlerService
  ) { }

  // Initialize
  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    // Success dialogConfig to be used as a template reference for the dialog’s open() function
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }
  }

  // Public main hasError ownerForm control validation function
  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  // Public onCancel event function
  public onCancel = () => {
    this.location.back();
  }

  // Public createOwner using ownerFormValue, If ownerForm is valid function
  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  // Private helper executeOwnerCreation using ownerFormValue object, passed from the ownerForm group function
  private executeOwnerCreation = (ownerFormValue) => {
    let owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: ownerFormValue.dateOfBirth,
      address: ownerFormValue.address
    }

    let apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig); // SuccessDialogComponent's template reference

        // Subscribing to the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      })
      )
  }
}
