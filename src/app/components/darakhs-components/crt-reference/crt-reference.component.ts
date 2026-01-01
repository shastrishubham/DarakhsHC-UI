import { Component, OnInit } from '@angular/core';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { MastersInfoService } from '../services/masters-info.service';

@Component({
  selector: 'app-crt-reference',
  templateUrl: './crt-reference.component.html',
  styleUrls: ['./crt-reference.component.css']
})
export class CrtReferenceComponent implements OnInit {

  referenceInfo = new ReferencesInfo();
  references: ReferencesInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService, private masterService: MastersInfoService) { }

  ngOnInit(): void {
    if (this.sharedService.referenceInfo) {
      this.referenceInfo = this.sharedService.referenceInfo;
    }
    this.getReferences();
  }

  getReferences() {
    this.patientService.GetReferences().subscribe((res: ReferencesInfo[]) => {
      this.references = res;
    });
  }


  viewReferences() {
    this.sharedService.referenceInfo = null;
    this.router.navigate(['/master-ref']);
  }

  upsertReference() {
    const newRefName = this.referenceInfo.Reference?.trim().toLowerCase();

    if (!newRefName) {
      alert('Reference name is required');
      return;
    }

    const isDuplicate = this.references.some(ref =>
      ref.Reference?.trim().toLowerCase() === newRefName
      && ref.Id !== this.referenceInfo.Id   // ignore same record during update
    );

    if (isDuplicate) {
      alert('Reference already exists');
      return;
    }

    this.masterService.UpsertReference(this.referenceInfo).subscribe(res => {
      alert('Reference saved successfully');
      this.viewReferences();
    });
  }
}
