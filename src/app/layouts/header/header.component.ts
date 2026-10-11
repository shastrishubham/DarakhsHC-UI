import { Component, OnInit, OnDestroy, Inject, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PatientsInfo } from '../../components/darakhs-components/model/PatientsInfo';
import { PatientsInfoService } from '../../components/darakhs-components/services/patients-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchText = '';
  results: PatientsInfo[] = [];
  totalResults = 0;
  activeIndex = -1;
  isOpen = false;
  isLoading = false;
  emptyMessage = '';

  private readonly minLength = 3;
  private readonly maxResults = 8;
  private searchTerms = new Subject<string>();
  private searchSubscription: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, private router: Router,
    private patientsService: PatientsInfoService) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.isLoading = this.canSearch(term)),
      switchMap(term => this.search(term))
    ).subscribe(patients => {
      this.isLoading = false;
      this.totalResults = patients.length;
      this.results = patients.slice(0, this.maxResults);
      this.activeIndex = this.results.length > 0 ? 0 : -1;
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  onSearchChange(value: string) {
    const term = (value || '').trim();
    this.isOpen = term.length > 0;
    if (!this.canSearch(term)) {
      this.results = [];
      this.totalResults = 0;
      this.activeIndex = -1;
      this.emptyMessage = 'Type at least ' + this.minLength + ' characters to search.';
    }
    this.searchTerms.next(term);
  }

  onFocus() {
    this.isOpen = this.searchText.trim().length > 0;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen = false;
      return;
    }
    if (!this.isOpen || this.results.length === 0) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.results.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.results.length) % this.results.length;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.selectPatient(this.results[this.activeIndex]);
    }
  }

  // Opens Existing Patients showing only the patient that was picked
  selectPatient(patient: PatientsInfo) {
    const value = patient.Mobile1 > 0 ? String(patient.Mobile1) : patient.FullName;
    this.router.navigate(['view-exist-patient'], { queryParams: { q: value, id: patient.Id } });
    this.resetSearch();
  }

  // Opens Existing Patients with everything that matches the typed text
  showAllResults() {
    const term = this.searchText.trim();
    if (!this.canSearch(term)) {
      return;
    }
    this.router.navigate(['view-exist-patient'], { queryParams: { q: term } });
    this.resetSearch();
  }

  patientInfo(patient: PatientsInfo): string {
    const parts = [
      patient.Mobile1 > 0 ? patient.Mobile1 : null,
      patient.Mobile2 > 0 ? patient.Mobile2 : null,
      patient.TreamentName,
      patient.CityName
    ];
    return parts.filter(part => part !== null && part !== undefined && part.toString().trim() !== '').join(' | ');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  private canSearch(term: string): boolean {
    return term.length >= this.minLength;
  }

  private search(term: string): Observable<PatientsInfo[]> {
    if (!this.canSearch(term)) {
      return of([]);
    }
    // The API matches part of a name or address, but a mobile number only when it is complete
    this.emptyMessage = /^\d+$/.test(term)
      ? 'No patients found. To search by mobile, type the full number.'
      : 'No patients found.';
    return this.patientsService.GetExistingPatientsInfoByValue(term).pipe(
      catchError(() => of([]))
    );
  }

  private resetSearch() {
    this.searchText = '';
    this.results = [];
    this.totalResults = 0;
    this.activeIndex = -1;
    this.isOpen = false;
    this.searchTerms.next('');
  }
}
