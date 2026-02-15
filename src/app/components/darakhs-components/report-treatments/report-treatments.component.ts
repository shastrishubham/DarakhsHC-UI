import { Component, OnInit } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-report-treatments',
  templateUrl: './report-treatments.component.html',
  styleUrls: ['./report-treatments.component.css']
})
export class ReportTreatmentsComponent implements OnInit {

  treatmentId: any = 0;
  treatments: TreatmentsInfo[] = [];
  patients: PatientsInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getTreatments();
  }

  getTreatments() {
    this.patientsService.GetTreatments().subscribe((res: TreatmentsInfo[]) => {
      this.treatments = res;
    });
  }

  getPatients() {
    this.patientsService.GetPatientInfoWithTreamentFilter(0, this.fromDt, this.toDt, this.treatmentId).subscribe(res => {
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
