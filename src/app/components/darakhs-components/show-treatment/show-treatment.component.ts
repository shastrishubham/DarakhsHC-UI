import { Component, OnInit } from '@angular/core';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-show-treatment',
  templateUrl: './show-treatment.component.html',
  styleUrls: ['./show-treatment.component.css']
})
export class ShowTreatmentComponent implements OnInit {

  treatments: TreatmentsInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService) { }


  ngOnInit(): void {
    this.getTreatments();
  }

  getTreatments() {
    this.patientService.GetTreatments().subscribe((res: TreatmentsInfo[]) => {
      this.treatments = res;
    });
  }

  editTreatment(treatment: TreatmentsInfo) {
    this.sharedService.treatmentInfo = treatment;
    this.router.navigate(['/crt-treatment']);
  }

  createTreatment() {
    this.sharedService.treatmentInfo = null;
    this.router.navigate(['/crt-treatment']);
  }

}
