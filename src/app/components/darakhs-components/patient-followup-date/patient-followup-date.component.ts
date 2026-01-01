import { Component, OnInit } from '@angular/core';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
declare var bootstrap: any;

@Component({
  selector: 'app-patient-followup-date',
  templateUrl: './patient-followup-date.component.html',
  styleUrls: ['./patient-followup-date.component.css']
})
export class PatientFollowupDateComponent implements OnInit {

  followUpPatients: PatientsSummaryInfo[] = [];
  selectedPatient: PatientsSummaryInfo | null = null;
  followUpDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getPatientsFollowUpListByDate();
  }

  getPatientsFollowUpListByDate() {
    this.patientsService.GetPatientsFollowUpListByDate(this.followUpDt).subscribe(res => {
      console.log(res);
      this.followUpPatients = res;
    });
  }

  CombineAddress(patientRecord: PatientsSummaryInfo) {

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

  openPatientPopup(patient: PatientsSummaryInfo) {
    this.selectedPatient = patient;

    const modal = new bootstrap.Modal(
      document.getElementById('patientModal')
    );
    modal.show();
  }

}
