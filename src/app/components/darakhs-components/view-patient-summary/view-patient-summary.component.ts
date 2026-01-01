import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'view-patient-summary',
  templateUrl: './view-patient-summary.component.html',
  styleUrls: ['./view-patient-summary.component.css']
})
export class ViewPatientSummaryComponent implements OnInit {

  patientsSummaries: PatientsSummaryInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPatientSummary();
  }

  getPatientSummary() {
    this.patientsService.GetPatientSummary(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patientsSummaries = res;
    });
  }

  convertDateToFormat(value: any) {
    if (value == '0001-01-01T00:00:00') {
      return '';
    }

    if (value == null || value == undefined) {
      return '';
    }

    let latest_date = this.datepipe.transform(value, 'dd-MMM-yyyy HH:mm');
    return latest_date;
  }

  editPatientSummary(patientsSummaryInfo: PatientsSummaryInfo) {
    this.sharedService.patientsSummaryInfo = patientsSummaryInfo;
    this.router.navigate(['crt-patient-sm']);
  }

  deleteSummaryAndInventoriesBySummaryId(patientsSummaryInfo: PatientsSummaryInfo) {
    this.patientsService.DeleteSummaryAndInventoriesBySummaryId(patientsSummaryInfo.Id).subscribe(res => {
      alert('Patient summary deleted successfully.');
      this.getPatientSummary();
    });
  }

  viewPatientSummary(patientsSummaryInfo: PatientsSummaryInfo) {

  }

  createNewPatientSummary() {
    this.sharedService.patientsSummaryInfo = null;
    this.router.navigate(['crt-patient-sm']);
  }



}
