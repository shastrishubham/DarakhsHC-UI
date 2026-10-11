import { Component, OnInit } from '@angular/core';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { DatePipe } from '@angular/common';
import { TableState, dateText } from '../data-table/table-state';

@Component({
  selector: 'app-report-patient-appointments',
  templateUrl: './report-patient-appointments.component.html',
  styleUrls: ['./report-patient-appointments.component.css']
})
export class ReportPatientAppointmentsComponent implements OnInit {

   patientsAppts: PatientsAppointmentInfo[] = [];
   table = new TableState<PatientsAppointmentInfo>([
     { key: 'PatientsName', label: 'Name', value: x => x.PatientsName },
     { key: 'Mobile', label: 'Mobile', value: x => x.Mobile },
     { key: 'AppointmentDate', label: 'Appointment Date', value: x => x.AppointmentDate, text: x => dateText(x.AppointmentDate, 'dd-MMM-yyyy hh:mm a') },
     { key: 'EnquiryFor', label: 'Enquiry For', value: x => x.EnquiryFor }
   ]);
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
       this.table.setData(res);
     });
   }

}
