import { Component, OnInit } from '@angular/core';
import { PatientEnquiry } from '../model/PatientEnquiry';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { StateInfo } from '../model/StateInfo';
import { CityInfo } from '../model/CityInfo';

@Component({
  selector: 'app-crt-enquiry',
  templateUrl: './crt-enquiry.component.html',
  styleUrls: ['./crt-enquiry.component.css']
})
export class CrtEnquiryComponent implements OnInit {

  patientEnquiry = new PatientEnquiry();
  states: StateInfo[] = [];
  cities: CityInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    if (this.sharedService.patientEnquiry) {
      this.patientEnquiry = this.sharedService.patientEnquiry;
      if (this.patientEnquiry.MS_State_Id && this.patientEnquiry.MS_State_Id != 0) {
        this.getCitiesByStateId(this.patientEnquiry.MS_State_Id);
      }
    }
    this.getStates();
  }

  upsertPatientEnquiry() {

    if (!this.validateForm()) {
      return;
    }

    this.patientService.UpsertPatientEnquiry(this.patientEnquiry).subscribe(res => {
      console.log(res);
      if (res != null && res === 0) {
        alert(res.ErrorMessage);
      } else {
        alert("Patient saved successfully!");
      }
    });
  }

  validateForm(): boolean {
    if (this.patientEnquiry.Name == null || this.patientEnquiry.Name == undefined
      || this.patientEnquiry.Name == '' || this.patientEnquiry.Name == 'null') {
      alert('Please Enter Name.')
      return false;
    }

    if (this.patientEnquiry.Mobile == null || this.patientEnquiry.Mobile == undefined || this.patientEnquiry.Mobile == 0
      || this.patientEnquiry.Mobile < 0) {
      alert('Please Enter Valid Mobile Number.');
      return false;
    }

    if (this.patientEnquiry.EnquiryFor == null || this.patientEnquiry.EnquiryFor == undefined
      || this.patientEnquiry.EnquiryFor == '' || this.patientEnquiry.EnquiryFor == 'null') {
      alert('Please Enter EnquiryFor.')
      return false;
    }

    return true;
  }

  getStates() {
    this.patientService.GetStates().subscribe((res: StateInfo[]) => {
      this.states = res;
    });
  }

  getCitiesByStateId(selectedStateId: number) {
    this.cities = [];
    const stateId = selectedStateId;
    if (!this.patientEnquiry.Id) {
      this.patientEnquiry.MS_City_Id = 0;
    }
    this.patientService.GetCitiesByStateId(stateId).subscribe((res: CityInfo[]) => {
      this.cities = res;
    });
  }

  ClearForm() {
    this.patientEnquiry = new PatientEnquiry();
  }

  viewEnquiries() {
    this.sharedService.patientEnquiry = null;
    this.router.navigate(['/view-enquiry']);
  }
}
