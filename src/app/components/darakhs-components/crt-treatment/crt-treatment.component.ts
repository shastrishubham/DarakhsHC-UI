import { Component, OnInit } from '@angular/core';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { MastersInfoService } from '../services/masters-info.service';

@Component({
  selector: 'app-crt-treatment',
  templateUrl: './crt-treatment.component.html',
  styleUrls: ['./crt-treatment.component.css']
})
export class CrtTreatmentComponent implements OnInit {

  treatmentInfo = new TreatmentsInfo();
  treatments: TreatmentsInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService, private masterService: MastersInfoService) { }

  ngOnInit(): void {
    if (this.sharedService.treatmentInfo) {
      this.treatmentInfo = this.sharedService.treatmentInfo;
    }
    this.getTreatments();
  }

  getTreatments() {
    this.patientService.GetTreatments().subscribe((res: TreatmentsInfo[]) => {
      this.treatments = res;
    });
  }

  upsertTreatment() {
    const newTreatmentName = this.treatmentInfo.TreamentName?.trim().toLowerCase();

    if (!newTreatmentName) {
      alert('Treatment name is required');
      return;
    }

    const isDuplicate = this.treatments.some(treatment =>
      treatment.TreamentName?.trim().toLowerCase() === newTreatmentName
      && treatment.Id !== this.treatmentInfo.Id   // ignore same record during update
    );

    if (isDuplicate) {
      alert('Treatment already exists');
      return;
    }

    this.masterService.UpsertTreatment(this.treatmentInfo).subscribe(res => {
      alert('Treatment saved successfully');
      this.viewTreatments();
    });

  }

  viewTreatments() {
    this.sharedService.treatmentInfo = null;
    this.router.navigate(['/master-treatment']);
  }


}
