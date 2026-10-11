import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { DatePipe } from '@angular/common';
import { TableState, dateText } from '../data-table/table-state';

@Component({
  selector: 'view-patient-summary',
  templateUrl: './view-patient-summary.component.html',
  styleUrls: ['./view-patient-summary.component.css']
})
export class ViewPatientSummaryComponent implements OnInit {

  patientsSummaries: PatientsSummaryInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  table = new TableState<PatientsSummaryInfo>([
    { key: 'PatientsName', label: 'Name', value: x => x.PatientsName },
    { key: 'VisitDate', label: 'Visit Date', value: x => x.VisitDate, text: x => dateText(x.VisitDate, 'dd-MMM-yyyy hh:mm a') },
    { key: 'Remark', label: 'Description', value: x => x.Remark },
    { key: 'NextVisitDate', label: 'Next Visit Date', value: x => x.NextVisitDate, text: x => dateText(x.NextVisitDate, 'dd-MMM-yyyy hh:mm a') },
    { key: 'FollowUpDate', label: 'Follow-Up Req/Date', value: x => x.FollowUpDate, text: x => this.followUpText(x) },
    { key: 'Amount', label: 'Amount', value: x => x.Amount }
  ]);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPatientSummary();
  }

  getPatientSummary() {
    this.patientsService.GetPatientSummary(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patientsSummaries = res;
      this.table.setData(res);
    });
  }

  followUpText(patientsSummaryInfo: PatientsSummaryInfo) {
    const followUpDate = dateText(patientsSummaryInfo.FollowUpDate, 'dd-MMM-yyyy');
    return (patientsSummaryInfo.IsFollowUpReq ? 'Yes' : 'No') + (followUpDate ? ' (' + followUpDate + ')' : '');
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
