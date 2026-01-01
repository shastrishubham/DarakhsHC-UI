import { Injectable } from '@angular/core';
import { HttpHelper } from './HttpHelper';
import * as myGlobals from '../model/global';
import * as enums from '../model/enums';
// import { HttpClient, Response, HttpHeaders, RequestOptions, URLSearchParams } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemInfo } from '../model/ItemInfo';
import { ItemSerialNosInfo } from '../model/ItemSerialNosInfo';


@Injectable({
  providedIn: 'root'
})
export class InventoryInfoService {

  constructor(private httphelper: HttpHelper) { }

  GetAvailableItems(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetAvailableItems';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetItems(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetItems';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetItemsCompany(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetItemsCompany';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetTaxRates(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetTaxRates';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetWarehouses(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetWarehouses';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertItem(itemInfo: ItemInfo) {
    itemInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/UpsertItem';
    //const bodystring = JSON.stringify(itemInfo);
    return this.httphelper.postMethod(urlString, itemInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetItemsSerialNumbers(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetItemsSerialNumbers';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertItemSerialNos(itemInfo: ItemSerialNosInfo) {
    itemInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/UpsertItemSerialNos';
    //const bodystring = JSON.stringify(itemInfo);
    return this.httphelper.postMethod(urlString, itemInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetItemsSerialNumberByItemId(itemId: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetItemsSerialNumberByItemId';
    const queryParams = { ItemId: itemId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetItemsWithMRP(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/InventoryInfo/GetItemsWithMRP';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }
}
