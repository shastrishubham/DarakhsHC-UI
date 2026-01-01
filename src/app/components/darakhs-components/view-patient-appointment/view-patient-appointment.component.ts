import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'view-patient-appointment',
  templateUrl: './view-patient-appointment.component.html',
  styleUrls: ['./view-patient-appointment.component.css']
})
export class ViewPatientAppointmentComponent implements OnInit {

  patientsAppts: PatientsAppointmentInfo[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPatientAppointments();
  }

  getPatientAppointments() {
    this.patientsService.GetPatientAppointments(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patientsAppts = res;
    });
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

  editPatientDetails(patientsApptInfo: PatientsAppointmentInfo) {
    this.sharedService.patientsAppointmentInfo = patientsApptInfo;
    this.router.navigate(['crt-patient-appt']);
  }

  convertToPatient(patientsApptInfo: PatientsAppointmentInfo) {
    if (confirm(`Are you sure you want to convert ${patientsApptInfo.PatientsName} to a master patient?`)) {
      // Create a new master patient object from appointment info
      const patientsInfo = this.CreatePatientsInfoByAppointment(patientsApptInfo);

      // Call service to save/update patient info
      this.patientsService.UpsertPatientsInfo(patientsInfo).subscribe(res => {
        if (!res.IsSuccess && res.ErrorMessage) {

          // Show confirm box
          if (confirm(res.ErrorMessage)) {
            // YES → call API again with isCreateNewRecord = true
            this.createPatientAnyway(patientsInfo);
          } else {
            // NO → do nothing
            return;
          }
        } else {
          // Normal success flow
          alert("Patient saved successfully!");
        }
      });
    }
  }

  createPatientAnyway(patientsInfo: PatientsInfo) {
    this.patientsService.UpsertPatientsInfo(patientsInfo, true)
      .subscribe((response: any) => {
        if (response.IsSuccess) {
          alert("Patient record created successfully.");
        } else {
          alert("Failed to create patient record: " + response.ErrorMessage);
        }
      });
  }

  // Function to map appointment info to patient info
  CreatePatientsInfoByAppointment(patientsApptInfo: PatientsAppointmentInfo): PatientsInfo {
    const patientsInfo = new PatientsInfo();
    patientsInfo.Id = 0; // New patient
    patientsInfo.MS_Comp_Id = patientsApptInfo.MS_Comp_Id;
    patientsInfo.Patients_Appointment_Id = patientsApptInfo.Id;

    const nameParts = patientsApptInfo.PatientsName.split(' ');
    patientsInfo.FName = nameParts[0];
    patientsInfo.LName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    patientsInfo.FullName = `${patientsInfo.FName} ${patientsInfo.LName}`.trim();

    patientsInfo.Mobile1 = patientsApptInfo.Mobile;
    patientsInfo.AddressLine1 = patientsApptInfo.Address;
    patientsInfo.MS_Reference_Id = patientsApptInfo.MS_Reference_Id;

    return patientsInfo;
  }


  createNewAppointment() {
    this.sharedService.patientsAppointmentInfo = null;
    this.router.navigate(['crt-patient-appt']);
  }

}
