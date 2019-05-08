import { Component, OnInit } from '@angular/core';
import { Owner } from './../../_interface/owner.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/repository.service';
import { ErrorHandlerService } from './../../shared/error-handler.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  // Properties
  public owner: Owner;
  public showAccounts;

  // Constructor
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  // Initialize
  ngOnInit() {
    this.getByIDOwnerApi();
  }

  // GET API - Main Owner App Route: api/owner
  // GET API - Child Owner App Route: api/owner/owners/4/account
  // Private helper getByIDOwnerApi function
  private getByIDOwnerApi = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let byIDOwnerUrl: string = `api/owner/${id}/account`;

    this.repository.getRepoApi(byIDOwnerUrl)
      .subscribe(res => {
        this.owner = res as Owner;
      },
      (error) => {
        this.errorHandler.handleError(error);
      })
  }
}
