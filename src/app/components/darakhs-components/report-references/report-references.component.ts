import { Component, OnInit } from '@angular/core';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { MastersInfoService } from '../services/masters-info.service';
import { PatientsInfo } from '../model/PatientsInfo';

@Component({
  selector: 'app-report-references',
  templateUrl: './report-references.component.html',
  styleUrls: ['./report-references.component.css']
})
export class ReportReferencesComponent implements OnInit {

  ms_references: ReferencesInfo[] = [];
  patients: PatientsInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  referenceId: any = 0;
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getMsReferences();
    this.getPatients();
  }

  getMsReferences() {
    this.patientsService.GetReferences().subscribe((res: ReferencesInfo[]) => {
      this.ms_references = res;
    });
  }

  getPatients() {
    this.patientsService.GetPatientInfo(0, this.fromDt, this.toDt, this.referenceId).subscribe(res => {
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
