import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { StateInfo } from '../model/StateInfo';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { CityInfo } from '../model/CityInfo';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';

@Component({
  selector: 'create-patient-appointment',
  templateUrl: './create-patient-appointment.component.html',
  styleUrls: ['./create-patient-appointment.component.css']
})
export class CreatePatientAppointmentComponent implements OnInit {

  patientsAppointmentInfo = new PatientsAppointmentInfo();
  FName: string;
  LName: string;
  references: ReferencesInfo[] = [];
  isUserSelectOtherReference = false;
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    if (this.sharedService.patientsAppointmentInfo) {
      this.patientsAppointmentInfo = this.sharedService.patientsAppointmentInfo;
      if (this.patientsAppointmentInfo.PatientsName != '' && this.patientsAppointmentInfo.PatientsName != null) {
        this.FName = this.patientsAppointmentInfo.PatientsName.split(' ')[0];
        this.LName = this.patientsAppointmentInfo.PatientsName.split(' ')[1];
      }
    }
    this.getReferences();
  }

  getReferences() {
    this.patientService.GetReferences().subscribe((res: ReferencesInfo[]) => {
      this.references = res;
    });
  }

  upsertPatientAppointment() {

    if (!this.validateForm()) {
      return;
    }

    if (this.FName == '' || this.FName == null || this.FName == undefined) {
      alert('Please enter patient name...');
      return;
    }
    if (!this.IsAppointmentDateValid(this.patientsAppointmentInfo.AppointmentDate)) {
      alert('Appointment Date cannot be less than todays date');
      return;
    }
    if (!this.LName || this.LName == '' || this.LName == null || this.LName == undefined) {
      this.LName = '';
    }
    this.patientsAppointmentInfo.PatientsName = this.FName + ' ' + this.LName;
    this.patientService.UpsertPatientAppointment(this.patientsAppointmentInfo).subscribe(res => {
      console.log(res);
      if (!res.IsSuccess && res.ErrorMessage) {
        alert(res.ErrorMessage);
      } else {
        // Normal success flow
        alert("Patient saved successfully!");
      }
    });
  }

  validateForm(): boolean {
    if (this.FName == null || this.FName == undefined || this.FName == '' || this.FName == 'null') {
      alert('Please Enter Patient Name.')
      return false;
    }

    if (this.patientsAppointmentInfo.Mobile == null || this.patientsAppointmentInfo.Mobile == undefined || this.patientsAppointmentInfo.Mobile == 0
      || this.patientsAppointmentInfo.Mobile < 0) {
      alert('Please Enter Valid Mobile Number.');
      return false;
    }

    if (this.patientsAppointmentInfo.AppointmentDate == null || this.patientsAppointmentInfo.AppointmentDate == undefined) {
      alert('Please Enter Appointment Date.');
      return false;
    }
    return true;
  }

  IsAppointmentDateValid(appointmentDate: Date) {
    var date = new Date();
    var apptDate = new Date(appointmentDate);


    return apptDate > date ? true : false;
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
    this.FName = null;
    this.LName = null;
    this.patientsAppointmentInfo = new PatientsAppointmentInfo();
  }

  viewAppointments() {
    this.sharedService.patientsAppointmentInfo = null;
    this.router.navigate(['/view-patient-appt']);
  }

}
