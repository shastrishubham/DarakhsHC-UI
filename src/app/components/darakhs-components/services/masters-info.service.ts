import { Injectable } from '@angular/core';
import { HttpHelper } from './HttpHelper';
import * as myGlobals from '../model/global';
import * as enums from '../model/enums';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemCompanyInfo } from '../model/ItemCompanyInfo';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { TreatmentsInfo } from '../model/TreatmentsInfo';


@Injectable({
  providedIn: 'root'
})
export class MastersInfoService {

  constructor(private httphelper: HttpHelper) { }

  GetItemCompaniesByCompanyId(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/MastersInfo/GetItemCompaniesByCompanyId';
    const queryParams = { CompanyId: myGlobals.CompId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertItemCompany(itemCompanyInfo: ItemCompanyInfo) {
    itemCompanyInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/MastersInfo/UpsertItemCompany';
    //const bodystring = JSON.stringify(itemCompanyInfo);
    return this.httphelper.postMethod(urlString, itemCompanyInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertReference(Reference: ReferencesInfo) {
    Reference.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/MasterInfo/UpsertReference';
    return this.httphelper.postMethod(urlString, Reference, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

   UpsertTreatment(treatment: TreatmentsInfo) {
    treatment.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/MasterInfo/UpsertTreatment';
    return this.httphelper.postMethod(urlString, treatment, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

}
