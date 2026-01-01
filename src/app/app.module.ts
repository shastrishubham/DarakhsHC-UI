import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { CreatePatientRecordComponent } from './components/darakhs-components/create-patient-record/create-patient-record.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { HttpHelper } from './components/darakhs-components/services/HttpHelper';
import { PatientsInfoService } from './components/darakhs-components/services/patients-info.service';
import { ViewPatientRecordComponent } from './components/darakhs-components/view-patient-record/view-patient-record.component';
import { InventoryInfoService } from './components/darakhs-components/services/inventory-info.service';
import { CreatePatientSummaryComponent } from './components/darakhs-components/create-patient-summary/create-patient-summary.component';
import { ViewPatientSummaryComponent } from './components/darakhs-components/view-patient-summary/view-patient-summary.component';
import { DatePipe } from '@angular/common';
import { CreatePatientAppointmentComponent } from './components/darakhs-components/create-patient-appointment/create-patient-appointment.component';
import { ViewPatientAppointmentComponent } from './components/darakhs-components/view-patient-appointment/view-patient-appointment.component';
import { CreateItemComponent } from './components/darakhs-components/create-item/create-item.component';
import { ViewItemComponent } from './components/darakhs-components/view-item/view-item.component';
import { ViewItemCompanyComponent } from './components/darakhs-components/view-item-company/view-item-company.component';
import { CreateItemCompanyComponent } from './components/darakhs-components/create-item-company/create-item-company.component';
import { ViewExistingPatientsComponent } from './components/darakhs-components/view-existing-patients/view-existing-patients.component';
import { ViewItemSerialNosComponent } from './components/darakhs-components/view-item-serialnos/view-item-serialnos.component';
import { CreateItemSerialNosComponent } from './components/darakhs-components/create-item-serialnos/create-item-serialnos.component';
import { ItemTypeDescriptionPipe } from './components/darakhs-components/model/ItemTypeDescriptionPipe';
import { PatientDashboardComponent } from './components/darakhs-components/patient-dashboard/patient-dashboard.component';
import { PatientFollowupDateComponent } from './components/darakhs-components/patient-followup-date/patient-followup-date.component';
import { ReportPatientAppointmentsComponent } from './components/darakhs-components/report-patient-appointments/report-patient-appointments.component';
import { ReportPatientRecordsComponent } from './components/darakhs-components/report-patient-records/report-patient-records.component';
import { CrtReferenceComponent } from './components/darakhs-components/crt-reference/crt-reference.component';
import { ShowReferenceComponent } from './components/darakhs-components/show-reference/show-reference.component';
import { CrtTreatmentComponent } from './components/darakhs-components/crt-treatment/crt-treatment.component';
import { ShowTreatmentComponent } from './components/darakhs-components/show-treatment/show-treatment.component';
import { NgSelectModule } from '@ng-select/ng-select';
//import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    CreatePatientRecordComponent,
    ViewPatientRecordComponent,
    CreatePatientSummaryComponent,
    ViewPatientSummaryComponent,
    CreatePatientAppointmentComponent,
    ViewPatientAppointmentComponent,
    CreateItemComponent,
    ViewItemComponent,
    ViewItemCompanyComponent,
    CreateItemCompanyComponent,
    ViewExistingPatientsComponent,
    ViewItemSerialNosComponent,
    CreateItemSerialNosComponent,
    ItemTypeDescriptionPipe,
    PatientDashboardComponent,
    PatientFollowupDateComponent,
    ReportPatientAppointmentsComponent,
    ReportPatientRecordsComponent,
    CrtReferenceComponent,
    ShowReferenceComponent,
    CrtTreatmentComponent,
    ShowTreatmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    HttpHelper,
    PatientsInfoService,
    InventoryInfoService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
