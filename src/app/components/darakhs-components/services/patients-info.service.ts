import { Injectable } from '@angular/core';
import { HttpHelper } from './HttpHelper';
import * as myGlobals from '../model/global';
import * as enums from '../model/enums';
import { PatientsInfo } from '../model/PatientsInfo';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { PatientInventoryInfo } from '../model/PatientInventoryInfo';

@Injectable({
  providedIn: 'root'
})
export class PatientsInfoService {

  constructor(private httphelper: HttpHelper) { }

  GetDashboardStats(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetDashboardStats';
    const queryParams = { CompanyId: companyId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetTreatments(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetTreatments';
    const queryParams = { CompanyId: companyId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetReferences(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetReferences';
    const queryParams = { CompanyId: companyId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetStates() {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetStates';
    return this.httphelper.getMethod(urlString, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetCitiesByStateId(stateId: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetCitiesByStateId';
    const queryParams = { StateId: stateId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertPatientsInfo(patientsInfo: PatientsInfo, isCreateNewRecord: boolean = false) {
    patientsInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/UpsertPatientsInfo?isCreateNewRecord=' + isCreateNewRecord;
    //const bodystring = JSON.stringify(patientsInfo);
    return this.httphelper.postMethod(urlString, patientsInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetPatientInfo(companyId: any = myGlobals.CompId, fromDt: any = null, toDt: any = null) {
    if (companyId == null || companyId == undefined || companyId == 0) {
      companyId = myGlobals.CompId;
    }
    if (fromDt == null || fromDt == undefined) {
      fromDt = new Date().toISOString().substring(0, 10);
    }
    if (toDt == null || toDt == undefined) {
      toDt = new Date().toISOString().substring(0, 10);
    }
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientInfo';
    const queryParams = { CompanyId: companyId, fromDt: fromDt, toDt: toDt };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetTodaysPatientsInfo(companyId: any = myGlobals.CompId) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetTodaysPatientsInfo';
    const queryParams = { CompanyId: companyId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertPatientSummary(patientsSummaryInfo: PatientsSummaryInfo) {
    patientsSummaryInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/UpsertPatientSummary';
    //const bodystring = JSON.stringify(patientsSummaryInfo);
    return this.httphelper.postMethod(urlString, patientsSummaryInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetPatientSummary(companyId: any = myGlobals.CompId, fromDt: any = null, toDt: any = null) {
    if (companyId == null || companyId == undefined || companyId == 0) {
      companyId = myGlobals.CompId;
    }
    if (fromDt == null || fromDt == undefined) {
      fromDt = new Date().toISOString().substring(0, 10);
    }
    if (toDt == null || toDt == undefined) {
      toDt = new Date().toISOString().substring(0, 10);
    }
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientsSummaries';
    const queryParams = { CompanyId: companyId, fromDt: fromDt, toDt: toDt };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  UpsertPatientAppointment(appointmentInfo: PatientsAppointmentInfo) {
    appointmentInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/UpsertPatientAppointment';
    //const bodystring = JSON.stringify(appointmentInfo);
    return this.httphelper.postMethod(urlString, appointmentInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  CreateAppointmentForExistingPatient(appointmentInfo: PatientsAppointmentInfo) {
    appointmentInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/CreateAppointmentForExistingPatient';
   // const bodystring = JSON.stringify(appointmentInfo);
    return this.httphelper.postMethod(urlString, appointmentInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetPatientAppointments(companyId: any = myGlobals.CompId, fromDt: any = null, toDt: any = null) {
    if (companyId == null || companyId == undefined || companyId == 0) {
      companyId = myGlobals.CompId;
    }
    if (fromDt == null || fromDt == undefined) {
      fromDt = new Date().toISOString().substring(0, 10);
    }
    if (toDt == null || toDt == undefined) {
      toDt = new Date().toISOString().substring(0, 10);
    }
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientAppointments';
    const queryParams = { CompanyId: companyId, fromDt: fromDt, toDt: toDt };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetPatientInventoriesBySummaryId(patientSummaryId: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientInventoriesBySummaryId';
    const queryParams = { PatientSummaryId: patientSummaryId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  DeleteSummaryAndInventoriesBySummaryId(SummaryId: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/DeleteSummaryAndInventoriesBySummaryId';
    const queryParams = { SummaryId: SummaryId };
    return this.httphelper.postMethod(urlString, null, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  DeleteInventoyByInventoryId(patientInventoryInfo: PatientInventoryInfo) {
    patientInventoryInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/DeleteInventoyByInventoryId';
    //const bodystring = JSON.stringify(patientInventoryInfo);
    return this.httphelper.postMethod(urlString, patientInventoryInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  CreateExistingPatientAppointment(patientsInfo: PatientsInfo) {
    patientsInfo.MS_Comp_Id = myGlobals.CompId;
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/CreateExistingPatientAppointment';
    //const bodystring = JSON.stringify(patientsInfo);
    return this.httphelper.postMethod(urlString, patientsInfo, null, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetExistingPatientsInfoByValue(value: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetExistingPatientsInfoByValue';
    const queryParams = { CompanyId: myGlobals.CompId, value: value };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

  GetPatientHistoriesById(patientId: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientHistoriesById';
    const queryParams = { compId: myGlobals.CompId, patientId: patientId };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }

   GetPatientsFollowUpListByDate(followUpDt: any) {
    const urlString = myGlobals.HrmsAPIUrl + 'api/PatientsInfo/GetPatientsFollowUpListByDate';
    const queryParams = { compId: myGlobals.CompId, followUpDt: followUpDt };
    return this.httphelper.getMethod(urlString, queryParams, enums.HttpContentType.Json, enums.HttpAccept.Json, false);
  }
}
