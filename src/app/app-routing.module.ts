import { NgModule, ViewRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { CreatePatientRecordComponent } from './components/darakhs-components/create-patient-record/create-patient-record.component';
import { ViewPatientRecordComponent } from './components/darakhs-components/view-patient-record/view-patient-record.component';
import { CreatePatientSummaryComponent } from './components/darakhs-components/create-patient-summary/create-patient-summary.component';
import { ViewPatientSummaryComponent } from './components/darakhs-components/view-patient-summary/view-patient-summary.component';
import { CreatePatientAppointmentComponent } from './components/darakhs-components/create-patient-appointment/create-patient-appointment.component';
import { ViewPatientAppointmentComponent } from './components/darakhs-components/view-patient-appointment/view-patient-appointment.component';
import { CreateItemComponent } from './components/darakhs-components/create-item/create-item.component';
import { ViewItemComponent } from './components/darakhs-components/view-item/view-item.component';
import { CreateItemCompanyComponent } from './components/darakhs-components/create-item-company/create-item-company.component';
import { ViewItemCompanyComponent } from './components/darakhs-components/view-item-company/view-item-company.component';
import { ViewExistingPatientsComponent } from './components/darakhs-components/view-existing-patients/view-existing-patients.component';
import { ViewItemSerialNosComponent } from './components/darakhs-components/view-item-serialnos/view-item-serialnos.component';
import { CreateItemSerialNosComponent } from './components/darakhs-components/create-item-serialnos/create-item-serialnos.component';
import { PatientDashboardComponent } from './components/darakhs-components/patient-dashboard/patient-dashboard.component';
import { PatientFollowupDateComponent } from './components/darakhs-components/patient-followup-date/patient-followup-date.component';
import { ReportPatientAppointmentsComponent } from './components/darakhs-components/report-patient-appointments/report-patient-appointments.component';
import { ReportPatientRecordsComponent } from './components/darakhs-components/report-patient-records/report-patient-records.component';
import { ShowTreatmentComponent } from './components/darakhs-components/show-treatment/show-treatment.component';
import { ShowReferenceComponent } from './components/darakhs-components/show-reference/show-reference.component';
import { CrtReferenceComponent } from './components/darakhs-components/crt-reference/crt-reference.component';
import { CrtTreatmentComponent } from './components/darakhs-components/crt-treatment/crt-treatment.component';

const routes: Routes = [
  { path: '', component: PatientDashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'form-editors', component: FormsEditorsComponent },
  { path: 'form-elements', component: FormsElementsComponent },
  { path: 'form-layouts', component: FormsLayoutsComponent },
  { path: 'icons-bootstrap', component: IconsBootstrapComponent },
  { path: 'icons-boxicons', component: IconsBoxiconsComponent },
  { path: 'icons-remix', component: IconsRemixComponent },
  { path: 'list-group', component: ListGroupComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'spinners', component: SpinnersComponent },
  { path: 'tables-data', component: TablesDataComponent },
  { path: 'tables-general', component: TablesGeneralComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'crt-patient', component: CreatePatientRecordComponent },
  { path: 'view-patient', component: ViewPatientRecordComponent },
  { path: 'crt-patient-sm', component: CreatePatientSummaryComponent },
  { path: 'view-patient-sm', component: ViewPatientSummaryComponent },
  { path: 'crt-patient-appt', component: CreatePatientAppointmentComponent },
  { path: 'view-patient-appt', component: ViewPatientAppointmentComponent },
  { path: 'crt-item', component: CreateItemComponent },
  { path: 'view-item', component: ViewItemComponent },
  { path: 'pat-followup', component: PatientFollowupDateComponent },
  { path: 'crt-item-comp', component: CreateItemCompanyComponent },
  { path: 'view-item-comp', component: ViewItemCompanyComponent },
  { path: 'view-exist-patient', component: ViewExistingPatientsComponent },
  { path: 'view-item-serialnos', component: ViewItemSerialNosComponent },
  { path: 'crt-item-serialnos', component: CreateItemSerialNosComponent },

  // Reports
  { path: 'rt-pat-appt', component: ReportPatientAppointmentsComponent },
  { path: 'rt-pat-records', component: ReportPatientRecordsComponent },

  // Master
  { path: 'master-ref', component: ShowReferenceComponent },
  { path: 'master-treatment', component: ShowTreatmentComponent },
  { path: 'crt-ref', component: CrtReferenceComponent },
  { path: 'crt-treatment', component: CrtTreatmentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
