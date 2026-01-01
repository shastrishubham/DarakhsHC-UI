import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { StateInfo } from '../model/StateInfo';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { CityInfo } from '../model/CityInfo';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { InventoryInfoService } from '../services/inventory-info.service';
import { ItemInfo } from '../model/ItemInfo';
import { PatientInventoryInfo } from '../model/PatientInventoryInfo';
import { ItemSerialNosInfo } from '../model/ItemSerialNosInfo';
import { ItemTypes } from '../model/ItemTypes';

@Component({
  selector: 'create-patient-summary',
  templateUrl: './create-patient-summary.component.html',
  styleUrls: ['./create-patient-summary.component.css']
})
export class CreatePatientSummaryComponent implements OnInit {

  patientsSummaryInfo = new PatientsSummaryInfo();
  patients: PatientsInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService, private inventoryService: InventoryInfoService) { }

  ngOnInit(): void {
    if (this.sharedService.patientsSummaryInfo != null) {
      this.patientsSummaryInfo = this.sharedService.patientsSummaryInfo;
      if (this.patientsSummaryInfo.IsFollowUpReq && this.patientsSummaryInfo.FollowUpDate) {

        this.patientsSummaryInfo.FollowUpDate = this.sharedService.getDateFromDateTime(this.patientsSummaryInfo.FollowUpDate);

      }
    }
    this.getTodaysPatientsInfo();
  }

  getTodaysPatientsInfo() {
    this.patientService.GetPatientInfo(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patients = res;
    });
  }



  upsertPatientsSummary() {

    if (!this.validateForm()) {
      return;
    }

    if (this.patientsSummaryInfo.MS_Patients_Id) {
      let data = this.patients.find(x => x.Id == this.patientsSummaryInfo.MS_Patients_Id);
      if (data == null) {
        return;
      }

      this.patientsSummaryInfo.VisitDate = data.VisitDate;

      console.log(this.patientsSummaryInfo);
      this.patientService.UpsertPatientSummary(this.patientsSummaryInfo).subscribe(res => {
        if (res != null && res > 0) {
          alert('Data saved successfully..');
          this.clearForm();
          return;
        } else {
          alert('Error while saving data. Please try again later..');
        }
      });
    }
  }

  validateForm(): boolean {

    if (this.patientsSummaryInfo.MS_Patients_Id == null || this.patientsSummaryInfo.MS_Patients_Id == undefined || this.patientsSummaryInfo.MS_Patients_Id < 0 ||
      this.patientsSummaryInfo.MS_Patients_Id == 0) {
      alert('Please Select Patient.');
      return false;
    }

    return true;
  }




  clearForm() {
    this.patientsSummaryInfo = new PatientsSummaryInfo();
  }
}
