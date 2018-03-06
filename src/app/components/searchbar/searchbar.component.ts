import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SearchServiceService } from '../../services/search-service.service';
import {Observable} from 'rxjs';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  providers: [SearchServiceService]
})



export class SearchbarComponent implements OnInit {


  
  searchinput:String;
  // gitUsers: any;

  loading: boolean = false;
  results: Observable<SearchItem[]>;
  searchField: FormControl;

  searchtextLength:number = 0;
  

  

  constructor(private itunes:SearchServiceService) {
   

   }

  

  ngOnInit() {

    $( document ).ready(function() {
      $("#mainlogo").fadeIn(1500);
      $("#searchinput").fadeIn(3500);
  });

    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .do(_ => this.loading = true)
        .do(_ => this.searchtextLength = _.length)
        .switchMap(term => this.itunes.search(term))
        .do(_ => this.animateLogo())
        .do(_ => this.loading = false)
    
  
  }


  animateLogo()
  {
    if(this.searchtextLength == 0)
    {
      $("#mainlogo").animate({
        height: '250px',
        width: '250px'
        }, 600);
    }else
    {
      $("#mainlogo").animate({
        height: '150px',
        width: '150px'
      }, 600);
    }
    
  }





}


class SearchItem {
  constructor(public name: string,
              public url: string,
              public login: string) {
  }
}