import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/application/application.service';

@Component({
  selector: 'app-accepted-list',
  templateUrl: './accepted-list.component.html',
  styleUrls: ['./accepted-list.component.css']
})
export class AcceptedListComponent implements OnInit {
  applications: any;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getAccepted().subscribe(data => {
      this.applications = data.applications;
    })
  }

}
