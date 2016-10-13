import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import 'rxjs/add/operator/map'

@Injectable()
export class ReportService {
    private reportOpenSource = new Subject<string>();
    reportOpened$ = this.reportOpenSource.asObservable();


    showReport(dummy : string){
        this.reportOpenSource.next(dummy);
    }
   
}