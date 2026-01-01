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
import { ItemSerialNosInfo } from '../model/ItemSerialNosInfo';

@Component({
  selector: 'create-item-serialnos',
  templateUrl: './create-item-serialnos.component.html',
  styleUrls: ['./create-item-serialnos.component.css']
})
export class CreateItemSerialNosComponent implements OnInit {

  itemSerialNos = new ItemSerialNosInfo();
  items: ItemInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService, private inventoryService: InventoryInfoService) { }

  ngOnInit(): void {
    if (this.sharedService.itemSerialNos) {
      this.itemSerialNos = this.sharedService.itemSerialNos;
    }
   this.getItems();
  }

  getItems(){
    this.inventoryService.GetItemsWithMRP().subscribe(res=>{
      console.log(res);
      this.items = res;
    });
  }

  upsertItemSerialNos() {
    if(!this.validateForm()){
      return;
    }

    this.inventoryService.UpsertItemSerialNos(this.itemSerialNos).subscribe(res=>{
      if (res != null && res > 0) {
        alert('Data saved successfully..');
        this.clearForm();
        return;
      }
    });
  }


  validateForm(): boolean {
    if (this.itemSerialNos.MS_Item_Id == null || this.itemSerialNos.MS_Item_Id == undefined) {
      alert('Please Select Product.');
      return false;
    }

    if(this.itemSerialNos.SerialNumber == null || this.itemSerialNos.SerialNumber == undefined || this.itemSerialNos.SerialNumber == ''){
      alert('Please Enter Serial Number.')
      return false;
    }
    return true;
  }

  clearForm() {
    this.itemSerialNos = new ItemSerialNosInfo();
  }
}
