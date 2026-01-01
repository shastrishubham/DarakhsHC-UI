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
import { ItemTypes } from '../model/ItemTypes';

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemInfo = new ItemInfo();
  itemCompanies: ItemCompanyInfo[] = [];
  taxRates: TaxRateInfo[] = [];
  warehouses: WarehouseInfo[] = [];
  itemTypes: string[] = [];
  itemTypeEnum = ItemTypes;
  constructor(private route: ActivatedRoute, private router: Router, private patientService: PatientsInfoService,
    private sharedService: SharedDataService, private inventoryService: InventoryInfoService) { 
      this.itemTypes = Object.keys(this.itemTypeEnum).filter(k => !isNaN(Number(k)));
    }

  ngOnInit(): void {
    if (this.sharedService.itemInfo) {
      this.itemInfo = this.sharedService.itemInfo;
    } else {
      this.itemInfo.ItemType = ItemTypes.Product;
      this.itemInfo.TotalStock = 0;
    }
   // this.getItemTypes();
    this.getItemsCompany();
    this.getTaxRates();
    this.getWarehouses();
  }

  getItemTypes() {
    this.itemTypes = this.sharedService.GetItemTypes();
    console.log(this.itemTypes);
    if(this.itemInfo.ItemType == undefined || this.itemInfo.ItemType == null 
      || this.itemInfo.ItemType == ItemTypes.None){
        this.itemInfo.ItemType = ItemTypes.Product;
      }
  }

  getItemsCompany() {
    this.inventoryService.GetItemsCompany().subscribe(res => {
      this.itemCompanies = res;
    });
  }

  getTaxRates() {
    this.inventoryService.GetTaxRates().subscribe(res => {
      this.taxRates = res;
    });
  }

  getWarehouses() {
    this.inventoryService.GetWarehouses().subscribe(res => {
      this.warehouses = res;
    });
  }

  upsertItem() {
    if(!this.validateForm()){
      return;
    }


    this.inventoryService.UpsertItem(this.itemInfo).subscribe(res => {
      if (res != null && res > 0) {
        alert('Data saved successfully..');
        this.clearForm();
        return;
      }
    });

  }

  validateForm(): boolean {
    if (this.itemInfo.MS_ItemComp_Id == null || this.itemInfo.MS_ItemComp_Id == undefined) {
      alert('Please Select Company of Item.');
      return false;
    }

    if(this.itemInfo.Name == null || this.itemInfo.Name == undefined || this.itemInfo.Name == ''){
      alert('Please Enter Item Name.')
      return false;
    }

    if(this.itemInfo.MRP == null || this.itemInfo.MRP == undefined || this.itemInfo.MRP < 0) {
      alert('Please Enter Valid MRP of Item.');
      return false;
    }

    if(this.itemInfo.SRate == null || this.itemInfo.SRate == undefined || this.itemInfo.SRate < 0) {
      alert('Please Enter Valid Sale Price of Item.');
      return false;
    }

    // if(this.itemInfo.TotalStock == null || this.itemInfo.TotalStock == undefined 
    //   || this.itemInfo.TotalStock < 0) {
    //   alert('Please Enter Valid Total Stock of Item.');
    //   return false;
    // }
    return true;
  }

  clearForm() {
    this.itemInfo = new ItemInfo();
  }
}
