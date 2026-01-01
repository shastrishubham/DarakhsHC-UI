import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { TreatmentsInfo } from '../model/TreatmentsInfo';
import { StateInfo } from '../model/StateInfo';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { CityInfo } from '../model/CityInfo';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { InventoryInfoService } from '../services/inventory-info.service';
import { ItemInfo } from '../model/ItemInfo';
import { PatientInventoryInfo } from '../model/PatientInventoryInfo';
import { ItemCompanyInfo } from '../model/ItemCompanyInfo';
import { TaxRateInfo } from '../model/TaxRateInfo';
import { WarehouseInfo } from '../model/WarehouseInfo';
import { MastersInfoService } from '../services/masters-info.service';

@Component({
  selector: 'create-item-company',
  templateUrl: './create-item-company.component.html',
  styleUrls: ['./create-item-company.component.css']
})
export class CreateItemCompanyComponent implements OnInit {

  itemCompanyInfo = new ItemCompanyInfo();
  constructor(private route: ActivatedRoute, private router: Router, private masterService: MastersInfoService,
    private sharedService: SharedDataService, private inventoryService: InventoryInfoService) { }

  ngOnInit(): void {
    if (this.sharedService.itemCompanyInfo) {
      this.itemCompanyInfo = this.sharedService.itemCompanyInfo;
    }
  }


  UpsertItemCompany() {
    if(!this.validateForm()){
      return;
    }

    this.masterService.UpsertItemCompany(this.itemCompanyInfo).subscribe(res => {
      if (res != null && res > 0) {
        alert('Data saved successfully..');
        this.clearForm();
        return;
      }
    });

  }

  validateForm(): boolean {
   
    if(this.itemCompanyInfo.CompanyName == null || this.itemCompanyInfo.CompanyName == undefined || this.itemCompanyInfo.CompanyName == ''){
      alert('Please Enter Item Name.')
      return false;
    }
    
    return true;
  }

  clearForm() {
    this.itemCompanyInfo = new ItemCompanyInfo();
  }
}
