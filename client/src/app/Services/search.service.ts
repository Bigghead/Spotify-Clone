import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';


@Injectable()

export class SearchService {

    searchTerm: string;
    newSearch = new Subject<string>();
    activeSearchTab = new Subject<any>();


}