import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'song-selector',
    templateUrl: './song-selector.component.html',
    styleUrls: ['./song-selector.component.less']
  })
  export class SongSelectorComponent implements OnInit{
    
    // @Input() 
    song: any;

    ngOnInit() {
        console.log('ready');
    }
  }