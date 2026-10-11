import { formatDate } from '@angular/common';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
    key: string;
    label: string;
    // Raw value, used for sorting
    value: (row: T) => any;
    // Text shown in the cell, used for searching. Defaults to value.
    text?: (row: T) => any;
    sortable?: boolean;
}

interface IndexedRow<T> {
    row: T;
    text: string[];
}

export function dateText(value: any, format: string): string {
    if (value == null || value === '') {
        return '';
    }
    try {
        return formatDate(value, format, 'en-US');
    } catch {
        return '';
    }
}

// Client side searching, sorting and paging for a list of rows
export class TableState<T> {

    // Matched against every column
    search = '';

    sortKey: string | null = null;
    sortDir: SortDirection = 'asc';

    page = 1;
    pageSize = 10;
    pageSizes = [10, 25, 50, 100];

    pageRows: T[] = [];
    pageList: number[] = [];
    total = 0;
    sourceTotal = 0;
    totalPages = 1;

    private index: IndexedRow<T>[] = [];
    private matched: T[] = [];
    private collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

    constructor(public columns: TableColumn<T>[]) { }

    setData(rows: T[]) {
        const data = rows || [];
        this.index = data.map(row => ({
            row,
            text: this.columns.map(col => this.cellText(col, row))
        }));
        this.sourceTotal = data.length;
        this.page = 1;
        this.apply();
    }

    onCriteriaChange() {
        this.page = 1;
        this.apply();
    }

    // asc -> desc -> original order
    toggleSort(key: string) {
        if (this.sortKey !== key) {
            this.sortKey = key;
            this.sortDir = 'asc';
        } else if (this.sortDir === 'asc') {
            this.sortDir = 'desc';
        } else {
            this.sortKey = null;
            this.sortDir = 'asc';
        }
        this.page = 1;
        this.apply();
    }

    setPageSize(size: any) {
        this.pageSize = Number(size) || 10;
        this.page = 1;
        this.paginate();
    }

    goTo(page: number) {
        this.page = page;
        this.paginate();
    }

    get from(): number {
        return this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
    }

    get to(): number {
        return Math.min(this.page * this.pageSize, this.total);
    }

    // Row number for the "#" column
    serial(indexOnPage: number): number {
        return (this.page - 1) * this.pageSize + indexOnPage + 1;
    }

    private apply() {
        const words = this.search.trim().toLowerCase().split(/\s+/).filter(word => word !== '');
        // Every word typed must appear in some column of the row
        let items = this.index.filter(item =>
            words.every(word => item.text.some(text => text.includes(word)))
        );

        const sortCol = this.columns.find(col => col.key === this.sortKey);
        if (sortCol) {
            const dir = this.sortDir === 'asc' ? 1 : -1;
            items = items
                .map((item, position) => ({ item, position, value: sortCol.value(item.row) }))
                .sort((a, b) => {
                    const aEmpty = this.isEmpty(a.value);
                    const bEmpty = this.isEmpty(b.value);
                    // Empty values stay at the bottom in both directions
                    if (aEmpty || bEmpty) {
                        return aEmpty === bEmpty ? a.position - b.position : (aEmpty ? 1 : -1);
                    }
                    const result = this.compare(a.value, b.value);
                    return result !== 0 ? result * dir : a.position - b.position;
                })
                .map(x => x.item);
        }

        this.matched = items.map(item => item.row);
        this.total = this.matched.length;
        this.paginate();
    }

    private paginate() {
        this.totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
        this.page = Math.min(Math.max(1, this.page), this.totalPages);
        const start = (this.page - 1) * this.pageSize;
        this.pageRows = this.matched.slice(start, start + this.pageSize);
        this.pageList = this.buildPageList();
    }

    // First, last and the pages around the current one; 0 marks a gap
    private buildPageList(): number[] {
        const pages: number[] = [];
        for (let p = 1; p <= this.totalPages; p++) {
            if (p === 1 || p === this.totalPages || Math.abs(p - this.page) <= 1) {
                pages.push(p);
            } else if (pages[pages.length - 1] !== 0) {
                pages.push(0);
            }
        }
        return pages;
    }

    private cellText(col: TableColumn<T>, row: T): string {
        const value = col.text ? col.text(row) : col.value(row);
        return value == null ? '' : String(value).trim().toLowerCase();
    }

    private isEmpty(value: any): boolean {
        return value == null || value === '';
    }

    private compare(a: any, b: any): number {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return this.collator.compare(String(a), String(b));
    }
}
