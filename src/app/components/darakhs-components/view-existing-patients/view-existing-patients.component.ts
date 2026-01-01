import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { DatePipe } from '@angular/common';
import { PatientHistory } from '../model/PatientHistory';

@Component({
  selector: 'view-existing-patients',
  templateUrl: './view-existing-patients.component.html',
  styleUrls: ['./view-existing-patients.component.css']
})
export class ViewExistingPatientsComponent implements OnInit {

  value: string;
  patients: PatientsInfo[] = [];
  selectedPatient: PatientsInfo;
  selectedPatientSummary: PatientHistory;
  showApptModal: boolean = false;
  showSummaryModal = false;
  appointmentDateTime: string = '';
  patientHistory: PatientHistory[] = [];
  IsShowPatientHistory: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    // this.getPatientAppointments();
  }

  getExistingPatientsInfoByValue() {
    if (this.value.length > 4) {
      this.patientsService.GetExistingPatientsInfoByValue(this.value).subscribe(res => {
        console.log(res);
        if (res != null && res.length > 0) {
          this.patients = res;
          this.IsShowPatientHistory = false;
        } else {
          alert('No records found...!!');
          this.patients = [];
        }
      });
    }
  }

  /* Appointment */
  openModal(patient: PatientsInfo) {
    this.selectedPatient = patient;
    this.showApptModal = true;
  }

  closeModal() {
    this.showApptModal = false;
    this.appointmentDateTime = '';
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

  deletePatients(patientsApptInfo: PatientsAppointmentInfo) {
    alert('delete is not yet implemented...!!');
  }

  createExistingPatientAppt() {

    let apptInfo = new PatientsAppointmentInfo();
    apptInfo.PatientsName = this.selectedPatient.FullName;
    apptInfo.Mobile = this.selectedPatient.Mobile1;
    apptInfo.AppointmentDate = this.appointmentDateTime;
    apptInfo.MS_Reference_Id = this.selectedPatient.MS_Reference_Id;
    apptInfo.Address = this.CombineAddress(this.selectedPatient);
    apptInfo.EnquiryFor = 'General Checkup';

    this.patientsService.CreateAppointmentForExistingPatient(apptInfo).subscribe(res => {
      console.log(res);
      if (!res.IsSuccess && res.ErrorMessage) {
        alert(res.ErrorMessage);
      } else {
        // Normal success flow
        this.closeModal();
        alert("Patient saved successfully!");
      }
    });
  }

  viewPatientHistory(patientsInfo: PatientsInfo) {
    this.patientsService.GetPatientHistoriesById(patientsInfo.Id).subscribe(res => {
      if (res != null && res.length > 0) {
        this.patientHistory = res;
        if (this.patientHistory.length > 0) {
          this.IsShowPatientHistory = true;
        }
      }
    });
  }

  openSummary(patientSummary: PatientHistory) {
    this.showSummaryModal = true;
    this.selectedPatientSummary = patientSummary;
  }

  closeSummaryModal() {
    this.showSummaryModal = false;
    this.selectedPatientSummary = null;
  }

  printSummary() {
    window.print();
  }

  checkInPatient(patientsInfo: PatientsInfo) {


    if (confirm(`Are you sure you want to Check-In ${patientsInfo.FullName} as a existing patient?`)) {
      let isNotToCreateNewRecord = true;

      // Call service to save/update patient info
      this.patientsService.UpsertPatientsInfo(patientsInfo, isNotToCreateNewRecord).subscribe(res => {
        if (!res.IsSuccess && res.ErrorMessage) {
          alert(res.ErrorMessage);
        } else {
          // Normal success flow
          this.closeModal();
          alert("Patient check-in successfully!");
        }
      });

    }
  }

}
