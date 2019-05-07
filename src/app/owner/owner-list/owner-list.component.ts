import { RepositoryService } from './../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Owner } from '../../_interface/owner.model';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit  {
  // Properties
  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Owner>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Constructor
  constructor(
    private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }

  // Initialize
  ngOnInit() {
    this.getAllOwners();
  }

  // ngAfterViewInit function
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // GET API - Main Owner App Route: api/owner
  // GET API - Child Owner App Route: api/owner/owners
  // getAllOwnersApi function
  public getAllOwners = () => {
    this.repoService.getData('api/owner')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      },
      (error) => {
        this.errorService.handleError(error);
      })
  }

  // redirectToDetails function
  public redirectToDetails = (id: string) => {
    let url: string = `/owner/details/${id}`;
    this.router.navigate([url]);
  }

  // redirectToUpdate function
  public redirectToUpdate = (id: string) => {

  }

  // redirectToDelete function
  public redirectToDelete = (id: string) => {

  }

  // doFilter custom filtering implementation function
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
