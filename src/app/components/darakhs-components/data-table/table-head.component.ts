import { Component, Input } from '@angular/core';
import { TableColumn, TableState } from './table-state';

// Sortable header row
@Component({
  selector: 'thead[appTableHead]',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent {

  @Input() table: TableState<any>;
  // Adds a leading "#" column
  @Input() serial = false;
  // Adds a trailing column for the row links
  @Input() actions = false;
  @Input() actionsLabel = 'Action';

  ariaSort(col: TableColumn<any>): string | null {
    if (this.table.sortKey !== col.key) {
      return null;
    }
    return this.table.sortDir === 'asc' ? 'ascending' : 'descending';
  }

  sortIcon(col: TableColumn<any>): string {
    if (this.table.sortKey !== col.key) {
      return 'bi-arrow-down-up dt-sort-idle';
    }
    return this.table.sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }

}
