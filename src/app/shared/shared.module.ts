import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    SuccessDialogComponent,     // Export dialog components:
    ErrorDialogComponent        // Success and Error
  ],
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  entryComponents: [           // Place dialog components inside 'entryComponents' array because they are not going 
    SuccessDialogComponent,    // to use routing, nor app selector when calling these components. They are going to 
    ErrorDialogComponent       // be used as template references for the dialog’s open() function and thus the need 
  ]                            // for the entryComponents array.
})
export class SharedModule { }
