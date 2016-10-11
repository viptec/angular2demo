import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ProjectFile,ModernizationTarget,EnergySource } from '../entity/ProjectFile';



import 'rxjs/add/operator/map'

@Injectable()
export class EscService {

    private escUpdateSource = new Subject<EscResultWrapper>();
    escUpdateded$ = this.escUpdateSource.asObservable();

    constructor(private http: Http) {
    }

    calculateEsc(project: ProjectFile): Observable<EscResult> {
        console.log('calculateEsc calling api', project);
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:9000/api/calc', JSON.stringify(project), options).map(res => {
            console.log(res);
            return res.json();
        });
    }

    updateEsc(escResult: EscResultWrapper) {
        console.log('esc service updateESC', escResult);
        this.escUpdateSource.next(escResult);
    }
}

export class EscResultWrapper {
    public escResult : EscResult;
    public mode: String = 'global';
}

export class EscResult {
    public hull: Hull;
    public hullModernized: Hull;
    public installation: Installation;
    public heatLoad: HeatLoad;
    public selectedHeater : Heater;
    public suggestedHeaters : Heater[];
    public simulationResult : SimulationResult;
    public savingsResult : SavingsResult;
    public selectedHeaterPriceRange: PriceRange;
}

export class Hull {
    public qnh : number;
    public qnTrans : number;
    public qnWindow : number;
    public qnRoof : number;
    public qnCellar : number;
    public qnOuterWall : number;
    public qnVentilation : number;
    public thermalCapacity : number;
    public heatLoadBuilding : number;
}

export class Installation {
    public qnw : number;
    public qnh : number;
    public etaw : number;
    public etak : number;
    public qbn : number;
    public consumptionWarmWater : number;
    public consumptionHeating : number;
    public heater: Heater;
}

export class HeaterData {
    public id : number;
    public f1 : number;
    public f2 : number;
    public f3 : number;
    public f4 : number;
    public f5 : number;
    public f6 : number;
    public f7 : number;
    public f8 : number;
}

export class HeatLoad{
    public heatLoad: number;
}

export class Heater {
    public leistung_von : number;
    public leistung_bis : number;
    public qbn : number;
    public etakneu : number;
    public brennstoff_typ : string;
    public info_url : string;
    public id : number;
    public aufstellart : string;
    public name : string;
    public baureihe : string;
    public preiskategorie : number;
    public elektrische_leistung : number;
    public image_path : string;
    public kategorie : string;
    public bauart : string;
    public etawneu : number;
    public image3d_path : string;
    public energietraeger : string;
    public nennwaermeleistung : number;
    public material_nr : string;
    public verlust_faktor : number;
    public wirkungsgrad_heizung : number;
    public wirkungsgrad_warmwasser : number;
    public stirling_brennstoff_typ : number;
    public stirling_etaw : number;
    public stirling_etak : number;
    public stirling_leistung_von : number;
    public stirling_leistung_bis : number;
    public stirling_qbn : number;
    public stirling_elektrische_leistung : number;
    public stirling_foerder_jahre : number;
    public stirling_foerder_volumen : number;
    public stirling_wartung : number;
    public stirling_kategorie : string;
    public spitzenlast_brennstoff_typ : number;
    public spitzenlast_etaw : number;
    public spitzenlast_etak : number;
    public spitzenlast_leistung_von : number;
    public spitzenlast_leistung_bis : number;
    public spitzenlast_qbn : number;
    public spitzenlast_elektrische_leistung : number;
    public spitzenlast_kategorie : string;
    public grundlast_neukessel : number;
    public spitzlast_neukessel : number;
}


export class SimulationResult {
    public buildingHeatLoad : number;
    public minimalOutsideTemperature : number;
    public sumPortions : number;
    public heatingHours : number;
    public qKessel : number;
    public installationResults: InstallationResult[];
}

export class InstallationResult {
    public qnb : number;
    public generatedPower : number;
    public remainingPower : number;
    public runtime : number;
    public portion : number;
    public consumption : number;
}

export class SavingsResult {
    public savingsTotal : number;
    public firstYearSavingsConsumption : number;
    public firstYearSavingsCosts : number;
    public firstYearSavingsCO2 : number;
}

export class PriceRange {
    public lowerLimit: number;
    public upperLimit: number;
}