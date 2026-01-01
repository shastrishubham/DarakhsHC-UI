import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { StateInfo } from '../model/StateInfo';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { CityInfo } from '../model/CityInfo';

@Component({
  selector: 'create-patient-record',
  templateUrl: './create-patient-record.component.html',
  styleUrls: ['./create-patient-record.component.css']
})
export class CreatePatientRecordComponent implements OnInit {

  patientRecord = new PatientsInfo();
  treatments: TreatmentsInfo[] = [];
  references: ReferencesInfo[] = [];
  states: StateInfo[] = [];
  cities: CityInfo[] = [];
  isUserSelectOtherReference = false;
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    if (this.sharedService.patientsInfo != null) {
      this.patientRecord = this.sharedService.patientsInfo;
    }

    this.getTreatments();
    this.getReferences();
    this.getStates();
    this.getCitiesByStateId();
  }

  getTreatments() {
    this.patientService.GetTreatments().subscribe((res: TreatmentsInfo[]) => {
      this.treatments = res;
    });
  }

  getReferences() {
    this.patientService.GetReferences().subscribe((res: ReferencesInfo[]) => {
      this.references = res;
    });
  }

  getStates() {
    this.patientService.GetStates().subscribe((res: StateInfo[]) => {
      this.states = res;
    });
  }

  getCitiesByStateId() {
    const stateId = 1;
    this.patientService.GetCitiesByStateId(stateId).subscribe((res: CityInfo[]) => {
      this.cities = res;
    });
  }

  upsertPatientsRecord() {
    if (!this.validateForm()) {
      return;
    }

    this.patientRecord.FullName = this.getPatientFullName(this.patientRecord);

    this.patientService.UpsertPatientsInfo(this.patientRecord).subscribe(res => {
      console.log(res);
      if (!res.IsSuccess && res.ErrorMessage) {
        // Show confirm box
        if (confirm(res.ErrorMessage)) {
          // YES → call API again with isCreateNewRecord = true
          this.createPatientAnyway(this.patientRecord);
        } else {
          // NO → do nothing
          return;
        }
      } else {
        // Normal success flow
        this.ClearForm();
        alert("Patient saved successfully!");
      }
    });
  }

  createPatientAnyway(patientsInfo: PatientsInfo) {
    this.patientService.UpsertPatientsInfo(patientsInfo, true)
      .subscribe((response: any) => {
        if (response.IsSuccess) {
          alert("Patient record created successfully.");
        } else {
          alert("Failed to create patient record: " + response.ErrorMessage);
        }
      });
  }

  validateForm(): boolean {

    if (this.patientRecord.FName == null || this.patientRecord.FName == undefined || this.patientRecord.FName == ''
      || this.patientRecord.FName == 'null') {
      alert('Please Enter Patient Name.')
      return false;
    }

    if (this.patientRecord.Mobile1 == null || this.patientRecord.Mobile1 == undefined || this.patientRecord.Mobile1 == 0 ||
      this.patientRecord.Mobile1 < 0) {
      alert('Please Enter Valid Mobile Number.');
      return false;
    }

    if (this.patientRecord.AddressLine1 == null || this.patientRecord.AddressLine1 == undefined || this.patientRecord.AddressLine1 == '' ||
      this.patientRecord.AddressLine1 == 'null') {
      alert('Please Enter Patient Address.');
      return false;
    }

    if (this.patientRecord.MS_Reference_Id == null || this.patientRecord.MS_Reference_Id == undefined ||
      this.patientRecord.MS_Reference_Id == 0) {
      alert('Please Select Reference.');
      return false;
    }

    let isOtherReference = this.references.find(x => x.Id == this.patientRecord.MS_Reference_Id);
    if (isOtherReference != null && isOtherReference.Reference == 'Other'
      && (this.patientRecord.OtherReferenceName == '' || this.patientRecord.OtherReferenceName == undefined
        || this.patientRecord.OtherReferenceName == null)) {
      alert('Please Enter Other Reference');
      return false;
    }

    if (this.patientRecord.MS_Treament_Id == null || this.patientRecord.MS_Treament_Id == undefined ||
      this.patientRecord.MS_Treament_Id == 0) {
      alert('Please Select Patient Visit For.');
      return false;
    }

    return true;
  }

  onChangeReference(value) {
    let isOtherReference = this.references.find(x => x.Id == value);
    if (isOtherReference != null && isOtherReference.Reference == 'Other') {
      this.isUserSelectOtherReference = true;
      return;
    }
    this.isUserSelectOtherReference = false;
    return;
  }

  ClearForm() {
    this.patientRecord = new PatientsInfo();
  }

  getPatientFullName(patientRecord: PatientsInfo): string {
    let fullName = '';
    if (patientRecord.FName != null && patientRecord.FName != undefined) {
      fullName += patientRecord.FName + ' ';
    }
    if (patientRecord.LName != null && patientRecord.LName != undefined) {
      fullName += patientRecord.LName;
    }
    return fullName.trim();
  }

}
