import { Component, Host, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';

import { ProjectFile, BuildingType, BuildingLocation, RoofType, InstallationType } from '../entity/ProjectFile';
import { EscService,EscResultWrapper } from '../service/esc.service';

import { ModernizationService } from '../service/modernization.service';
import { TranslateService } from '../service/translate.service';

import { HouseComponent } from './house.component';


import { Subscription }   from 'rxjs/Subscription';
 
@Component({
    selector: 'tip',
    inputs: ['mode','tip'],
    templateUrl: '../../app/esc/tip.component.html'
})
export class TipComponent {

    public project: ProjectFile;

    public mode : string;

    public modSelected : boolean = false;

    public innerText : string = '';
    public investments : string = '';

    subscriptionLoaded : Subscription;
    subscription : Subscription;

    constructor(@Host() parent: HouseComponent, private escService : EscService, private modernizationService : ModernizationService, private translateService : TranslateService){
        
        this.innerText ='demo';
        this.subscription = escService.escUpdateded$.subscribe(esc => {                        
            if (!this.project) {
                this.project = parent.project;
            }
            if ("outerWall" === this.mode) {
                this.modSelected = this.project.buildingMods.wallInsulation > 0;
                this.innerText = translateService.instant('tip.insulation') + ": " + this.project.buildingMods.wallInsulation * 100.0 + "cm";
                this.investments = this.project.finance.wallInsulation + " €";
            }
        });
        /*
        this.subscriptionLoaded = projectStartService.projectLoaded$.subscribe(p=>{
            this.project = p;  
        });
        */
    }

    modernize(){
        this.modernizationService.showModernization(this.mode);
    }

    trash(){
        console.log('TODO: remove handling for: ', this.mode);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe(); 
        //this.subscriptionLoaded.unsubscribe();    
     }

}