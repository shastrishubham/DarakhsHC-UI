import { Component, OnInit } from '@angular/core';
import { PatientEnquiry } from '../model/PatientEnquiry';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-report-enquiries',
  templateUrl: './report-enquiries.component.html',
  styleUrls: ['./report-enquiries.component.css']
})
export class ReportEnquiriesComponent implements OnInit {

  patientEnquiries: PatientEnquiry[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getPatientEnquiries();
  }

  getPatientEnquiries() {
    this.patientsService.GetPatientEnquiries(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patientEnquiries = res;
    });
  }

  CombineAddress(patientRecord: PatientEnquiry) {
    const parts = [
      patientRecord.Address,
      patientRecord.StateName,
      patientRecord.CityName
    ];

    // Filter out null, undefined, or empty strings
    const filteredParts = parts
      .filter(part => part !== null && part !== undefined && part.toString().trim() !== '')
      .map(part => part.toString().trim());

    return filteredParts.join(', ');
  }

}
