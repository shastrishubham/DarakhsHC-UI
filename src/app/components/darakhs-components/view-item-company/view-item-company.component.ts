import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsInfoService } from '../services/patients-info.service';
import { SharedDataService } from '../services/shared-data.service';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { DatePipe } from '@angular/common';
import { ItemInfo } from '../model/ItemInfo';
import { InventoryInfoService } from '../services/inventory-info.service';
import { ItemCompanyInfo } from '../model/ItemCompanyInfo';
import { MastersInfoService } from '../services/masters-info.service';

@Component({
  selector: 'view-item-company',
  templateUrl: './view-item-company.component.html',
  styleUrls: ['./view-item-company.component.css']
})
export class ViewItemCompanyComponent implements OnInit {

  itemCompanies: ItemCompanyInfo[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private masterService: MastersInfoService,
    private sharedService: SharedDataService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.GetItemCompaniesByCompanyId();
  }

  GetItemCompaniesByCompanyId(){
    this.masterService.GetItemCompaniesByCompanyId().subscribe(res=>{
      console.log(res);
      this.itemCompanies = res;
    });
  }

  editItemCompanyDetails(itemCompanyInfo: ItemCompanyInfo){
    this.sharedService.itemCompanyInfo = itemCompanyInfo;
    this.router.navigate(['crt-item-comp']);
  }

  deleteItemCompany(itemCompanyInfo: ItemCompanyInfo){
    alert('delete is not yet implemented...!!');
  }

  createNewItemCompany() {
    this.sharedService.itemInfo = null;
    this.router.navigate(['crt-item-comp']);
  }
}
