import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'view-patient-record',
  templateUrl: './view-patient-record.component.html',
  styleUrls: ['./view-patient-record.component.css']
})
export class ViewPatientRecordComponent implements OnInit {

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

  editPatientDetails(patientsInfo: PatientsInfo) {
    this.sharedService.patientsInfo = patientsInfo;
    this.router.navigate(['crt-patient']);
  }

  deletePatients(patientsInfo: PatientsInfo) {
    alert('delete is not yet implemented...!!');
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

  createNewPatientRecord() {
    this.sharedService.patientsInfo = null;
    this.router.navigate(['crt-patient']);
  }
}
