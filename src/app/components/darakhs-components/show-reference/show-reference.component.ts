import { Component, OnInit } from '@angular/core';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { TableState } from '../data-table/table-state';

@Component({
  selector: 'app-show-reference',
  templateUrl: './show-reference.component.html',
  styleUrls: ['./show-reference.component.css']
})
export class ShowReferenceComponent implements OnInit {

  references: ReferencesInfo[] = [];
  table = new TableState<ReferencesInfo>([
    { key: 'Reference', label: 'Name', value: x => x.Reference }
  ]);
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.getReferences();
  }

  getReferences() {
    this.patientService.GetReferences().subscribe((res: ReferencesInfo[]) => {
      this.references = res;
      this.table.setData(res);
    });
  }

  editReference(reference: ReferencesInfo) {
    this.sharedService.referenceInfo = reference;
    this.router.navigate(['/crt-ref']);
  }

  createReference() {
    this.sharedService.referenceInfo = null;
    this.router.navigate(['/crt-ref']);
  }

  deleteReference(reference: ReferencesInfo) {
    alert('Delete reference functionality is not implemented yet.');
  }

}
