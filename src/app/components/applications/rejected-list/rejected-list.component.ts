import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/application/application.service';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.css']
})
export class RejectedListComponent implements OnInit {
  applications: any;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.applicationService.getRejected().subscribe(data => {
      this.applications = data.applications;
    })
  }

}
