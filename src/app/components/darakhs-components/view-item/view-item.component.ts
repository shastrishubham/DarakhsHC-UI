import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { DatePipe } from '@angular/common';
import { ItemInfo } from '../model/ItemInfo';
import { InventoryInfoService } from '../services/inventory-info.service';

@Component({
  selector: 'view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  items: ItemInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private inventoryService: InventoryInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.inventoryService.GetItems().subscribe(res=>{
      console.log(res);
      this.items = res;
    });
  }

  editItemDetails(itemInfo: ItemInfo){
    this.sharedService.itemInfo = itemInfo;
    this.router.navigate(['crt-item']);
  }

  deleteItem(itemInfo: ItemInfo){
    alert('delete is not yet implemented...!!');
  }

  createNewItem() {
    this.sharedService.itemInfo = null;
    this.router.navigate(['crt-item']);
  }
}
