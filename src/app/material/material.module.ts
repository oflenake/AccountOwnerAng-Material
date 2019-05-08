import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
  MatListModule, MatMenuModule, MatTableModule, MatSortModule, MatFormFieldModule,
  MatInputModule, MatPaginatorModule, MatProgressBarModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatCardModule, MatSelectModule, MatExpansionModule,
  MatDatepickerModule, MatNativeDateModule, MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
