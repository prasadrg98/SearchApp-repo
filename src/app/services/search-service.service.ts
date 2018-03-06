import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpModule, Http, Response} from '@angular/http';

class SearchItem {
  constructor(public name: string,
              public url: string,
              public login: string) {
  }
}

@Injectable()
export class SearchServiceService {

  constructor(private http: Http) { }

  search(term: string): Observable<SearchItem[]> {
    let apiURL = '';
    if(term.toString() == "")
    {
      
      apiURL = 'https://api.github.com/search/repositories?q=apple';

    }else
    {   
      
    apiURL = 'https://api.github.com/search/repositories?q=' + term;
    }

    //let apiURL = 'assets/repositories.json';
    return this.http.get(apiURL) 
        .map(res => { 
          return res.json().items.map(item => { 
            return new SearchItem( 
                item.name,
                item.owner.url,
                item.owner.login
            );
          });
        });
  }


}
