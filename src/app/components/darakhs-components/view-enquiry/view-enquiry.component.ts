import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { DatePipe } from '@angular/common';
import { PatientEnquiry } from '../model/PatientEnquiry';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';

@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.component.html',
  styleUrls: ['./view-enquiry.component.css']
})
export class ViewEnquiryComponent implements OnInit {

  patientEnquiries: PatientEnquiry[] = [];
  fromDt: any = new Date().toISOString().substring(0, 10);
  toDt: any = new Date().toISOString().substring(0, 10);
  selectedEnquiry: PatientEnquiry;
  showApptModal: boolean = false;
  appointmentDateTime= new Date();
  constructor(private route: ActivatedRoute, private router: Router, private patientsService: PatientsInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getPatientEnquiries();
  }

  getPatientEnquiries() {
    this.patientsService.GetPatientEnquiries(0, this.fromDt, this.toDt).subscribe(res => {
      console.log(res);
      this.patientEnquiries = res;
    });
  }

  CombineAddress(patientRecord: PatientEnquiry) {
    const parts = [
      patientRecord.Address,
      patientRecord.StateName,
      patientRecord.CityName
    ];

    // Filter out null, undefined, or empty strings
    const filteredParts = parts
      .filter(part => part !== null && part !== undefined && part.toString().trim() !== '')
      .map(part => part.toString().trim());

    return filteredParts.join(', ');
  }

  createEnquiry() {
    this.sharedService.patientsAppointmentInfo = null;
    this.router.navigate(['crt-enquiry']);
  }

  editPatientEnquiry(patientEnq: PatientEnquiry) {
    this.sharedService.patientEnquiry = patientEnq;
    this.router.navigate(['crt-enquiry']);
  }

  openAppointmentModal(patientEnq: PatientEnquiry) {
    this.selectedEnquiry = patientEnq;
    this.showApptModal = true;
  }

  closeModal() {
    this.showApptModal = false;
    this.appointmentDateTime = null;
  }


  createExistingPatientAppt() {

    let apptInfo = new PatientsAppointmentInfo();
    apptInfo.Patient_Enquiry_Id = this.selectedEnquiry.Id;
    apptInfo.PatientsName = this.selectedEnquiry.Name;
    apptInfo.Mobile = this.selectedEnquiry.Mobile;
    apptInfo.AppointmentDate = this.appointmentDateTime;
    apptInfo.MS_Reference_Id = 0;
    apptInfo.Address = this.selectedEnquiry.Address;
    apptInfo.EnquiryFor = this.selectedEnquiry.EnquiryFor;

    this.patientsService.CreateAppointmentForExistingPatient(apptInfo).subscribe(res => {
      console.log(res);
      if (!res.IsSuccess && res.ErrorMessage) {
        alert(res.ErrorMessage);
      } else {
        // Normal success flow
        this.closeModal();
        alert("Patient saved successfully!");
        this.getPatientEnquiries();
      }
    });
  }



}
