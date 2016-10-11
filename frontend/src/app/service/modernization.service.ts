import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


import 'rxjs/add/operator/map'

@Injectable()
export class ModernizationService {
    private modOpenSource = new Subject<string>();
    modOpened$ = this.modOpenSource.asObservable();


    showModernization(modernization : string){
        this.modOpenSource.next(modernization);
    }

    hideModernization(){
        this.modOpenSource.next(null);
    }
}