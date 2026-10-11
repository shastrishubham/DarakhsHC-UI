import { Component, Input } from '@angular/core';
import { TableState } from './table-state';

// Search box, page size and pager around a projected <table>
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  @Input() table: TableState<any>;
  @Input() searchPlaceholder = 'Search...';
  @Input() emptyText = 'No records found.';

}
