import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../../_interface/owner.model';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  // Properties
  public ownerForm: FormGroup;
  private dialogConfig;
  public owner: Owner;

  // Constructor
  constructor(
    private location: Location, private repository: RepositoryService, private dialog: MatDialog,
    private errorService: ErrorHandlerService, private activeRoute: ActivatedRoute
  ) { }

  // Initialize
  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    // Success and Error dialogConfig for the opened dialog function
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.getByIDOwnerApi();
  }

  // Public main hasError ownerForm control validation function
  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  // Public onCancel event function
  public onCancel = () => {
    this.location.back();
  }

  // Private helper getByIDOwnerApi function
  private getByIDOwnerApi = () => {
    let ownerId: string = this.activeRoute.snapshot.params['id'];

    let byIDOwnerUrl: string = `api/owner/${ownerId}`;

    this.repository.getRepoApi(byIDOwnerUrl)
      .subscribe(res => {
        this.owner = res as Owner;
        this.ownerForm.patchValue(this.owner);
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  // Public updateOwnerApi function using ownerFormValue object, If ownerForm group is valid
  public updateOwnerApi = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  }

  // Private helper executeOwnerUpdate function using ownerFormValue object, passed from the ownerForm group
  private executeOwnerUpdate = (ownerFormValue) => {

    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = ownerFormValue.dateOfBirth;
    this.owner.address = ownerFormValue.address;

    let apiUrl = `api/owner/${this.owner.id}`;
    this.repository.updateRepoApi(apiUrl, this.owner)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
      )
  }
}
