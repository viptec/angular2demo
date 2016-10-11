import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ProjectFile,ModernizationTarget,EnergySource } from '../entity/ProjectFile';


import 'rxjs/add/operator/map'

@Injectable()
export class QuickCheckService {

    private quickCheckSource = new Subject<QuickCheckResult>();
    quickChecked$ = this.quickCheckSource.asObservable();

    constructor(private http: Http) {
    }

    updateQuickCheck(q : QuickCheckResult){
        this.quickCheckSource.next(q);
    }

    calculateQuickCheck(project: ProjectFile): Observable<QuickCheckResult> {
        console.log('calculateQuickCheck calling api', project);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers });

        let payload = new QuickCheckRequest();
        payload.modernizationTarget = project.quickcheck.modernizationTarget;
        payload.energySource = project.installation.energySource;
        payload.includeBuildingModernization = project.quickcheck.includeBuildingModernization;
        payload.livingSpace = project.building.livingSpace;
        payload.includeWarmWater = project.quickcheck.includeWarmWater;
        payload.installationConsumption = project.installation.installationConsumption;

        return this.http.post('http://localhost:9000/api/quickcheck', JSON.stringify(payload), options).map(res => {
            console.log(res);
            return res.json();
        });
        
    }
}

class QuickCheckRequest {
  modernizationTarget : ModernizationTarget;
  includeBuildingModernization : boolean;
  livingSpace : number;
  includeWarmWater : boolean;
  installationConsumption : number;
  energySource : EnergySource;
}
export class QuickCheckResult {
    public costs: number;
    public consumption: number;
    public co2: number;
    public energyCharacteristicValue: number;
}