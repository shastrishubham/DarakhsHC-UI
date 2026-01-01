import { Component, OnInit } from '@angular/core';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-patient-appointments',
  templateUrl: './report-patient-appointments.component.html',
  styleUrls: ['./report-patient-appointments.component.css']
})
export class ReportPatientAppointmentsComponent implements OnInit {

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

}
