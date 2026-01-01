import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { DatePipe } from '@angular/common';
import { ItemInfo } from '../model/ItemInfo';
import { InventoryInfoService } from '../services/inventory-info.service';
import { ItemSerialNosInfo } from '../model/ItemSerialNosInfo';

@Component({
  selector: 'view-item-serialnos',
  templateUrl: './view-item-serialnos.component.html',
  styleUrls: ['./view-item-serialnos.component.css']
})
export class ViewItemSerialNosComponent implements OnInit {

  itemsSerialNos: ItemSerialNosInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private inventoryService: InventoryInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getItemsSerialNumbers();
  }

  getItemsSerialNumbers() {
    this.inventoryService.GetItemsSerialNumbers().subscribe(res=>{
      console.log(res);
      this.itemsSerialNos = res;
    });
  }

  editItemDetails(itemInfo: ItemSerialNosInfo){
    this.sharedService.itemSerialNos = itemInfo;
    this.router.navigate(['crt-item-serialnos']);
  }

  deleteItem(itemInfo: ItemSerialNosInfo){
    alert('delete is not yet implemented...!!');
  }

  createNewItemSerialNos() {
    this.sharedService.itemSerialNos = null;
    this.router.navigate(['crt-item-serialnos']);
  }
}
