import { Injectable } from '@angular/core';
import { PatientsInfo } from '../model/PatientsInfo';
import { PatientsAppointmentInfo } from '../model/PatientsAppointmentInfo';
import { ItemInfo } from '../model/ItemInfo';
import { ItemCompanyInfo } from '../model/ItemCompanyInfo';
import { PatientsSummaryInfo } from '../model/PatientsSummaryInfo';
import { ItemSerialNosInfo } from '../model/ItemSerialNosInfo';
import { ItemTypes } from '../model/ItemTypes';
import { ReferencesInfo } from '../model/ReferencesInfo';
import { TreatmentsInfo } from '../model/TreatmentsInfo';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  patientsInfo: PatientsInfo;
  patientsAppointmentInfo: PatientsAppointmentInfo;
  itemInfo: ItemInfo;
  itemCompanyInfo: ItemCompanyInfo;
  patientsSummaryInfo: PatientsSummaryInfo;
  itemSerialNos: ItemSerialNosInfo;
  referenceInfo: ReferencesInfo;
  treatmentInfo: TreatmentsInfo;
  constructor() { }

  GetItemTypes() {
    const arrayObjects = []
    for (const [propertyKey, propertyValue] of Object.entries(ItemTypes)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      arrayObjects.push({ id: propertyValue, name: propertyKey });
    }
    return arrayObjects;
  }

  getDateFromDateTime(datetime: any) {
    const [date, time] = datetime.split('T');
    return date;
  }
}
