import { Component, OnInit } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-report-patient-records',
  templateUrl: './report-patient-records.component.html',
  styleUrls: ['./report-patient-records.component.css']
})
export class ReportPatientRecordsComponent implements OnInit {

  patients: PatientsInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getPatientInfo();
  }

  getPatientInfo() {
    this.patientsService.GetPatientInfo(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patients = res;
    });
  }

  CombineMobiles(patientRecord: PatientsInfo) {
    if (patientRecord.Mobile2 != 0) {
      return patientRecord.Mobile1 + ' / ' + patientRecord.Mobile2;
    }
    return patientRecord.Mobile1;
  }

  CombineAddress(patientRecord: PatientsInfo) {

    const parts = [
      patientRecord.AddressLine1,
      patientRecord.AddressLine2,
      patientRecord.StateName,
      patientRecord.CityName
    ];

    // Filter out null, undefined, or empty strings
    const filteredParts = parts
      .filter(part => part !== null && part !== undefined && part.toString().trim() !== '')
      .map(part => part.toString().trim());

    // Add postal code only if > 0
    if (patientRecord.PostalCode && patientRecord.PostalCode > 0) {
      filteredParts.push(patientRecord.PostalCode.toString());
    }

    return filteredParts.join(', ');
  }


}
