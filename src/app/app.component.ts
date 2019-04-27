import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { GridOptions } from 'ag-grid-community';

import { LibraryService } from './services/library.service';
import { SongSelectorComponent } from './components/song-selector/song-selector.component';
import { NgbdModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private libraryService: LibraryService) {

  }
  private readonly LIBRARY_URL = 'http://localhost:3000/library';
  
  private title = "Tim's Music Library";
  private gridOptions: GridOptions = {};
  private columnDefs: any[] = [];
  private rowData: any;
  private queryChanged: Subject<any> = new Subject<any>();
  private query: string = '';

  // private songSelectorToggler: string = 'Hide Song Selector';
  private hideSelector


  @ViewChild('songSelector') songSelector: SongSelectorComponent;
  @ViewChild('searchField') searchField: ElementRef;
  @ViewChild('modal') modalComponent: NgbdModalComponent;

  ngOnInit(): void {
    this.queryChanged.pipe(debounceTime(500))
      .subscribe((query: string) => {
        this.setRowData(query);
      });
  }

  onGridReady() {
    this.setColumnDefinitions();
    this.setRowData();

    this.gridOptions.api.sizeColumnsToFit();
  }

  onSelectionChange() {
    this.songSelector.song = this.gridOptions.api.getSelectedNodes()[0].data;
  }

  private setColumnDefinitions() {
    this.columnDefs = [
      {checkboxSelection: true, headerName: 'Title', field: 'title', sortable: true, filter: true},
      {headerName: 'Artist', field: 'artist', sortable: true, filter: true },
      {headerName: 'Album', field: 'album', sortable: true, filter: true },
      {headerName: 'Genre', field: 'genre', sortable: true, filter: true },
      {headerName: 'Release Date', field: 'releaseDate', sortable: true, filter: true }
    ];

    this.gridOptions.api.setColumnDefs(this.columnDefs);
  }

  private setRowData(filter?: string) {
    let url = this.LIBRARY_URL;

    if (filter) {
      url = `${this.LIBRARY_URL}?q=${filter}`; 
    }

    this.libraryService.get(url)
      .subscribe(res => {
        this.rowData = res;
        this.gridOptions.api.setRowData(this.rowData);
      });
    
  }

  private search() {
    this.queryChanged.next(this.searchField.nativeElement.value);
  }

  private delete() {
    let row = this.gridOptions.api.getSelectedNodes()[0];
    if (!row) {
      return;
    }
    this.libraryService.delete(`${this.LIBRARY_URL}/${row.data.id}`)
      .subscribe(res => {
        console.log('Delete');
      });
  }
}
