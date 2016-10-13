import { Component, Host, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';

import { ProjectFile, BuildingType, BuildingLocation, RoofType, InstallationType } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { EscService,EscResultWrapper } from '../service/esc.service';
import { ModernizationComponent } from './modernization.component';


import { Subscription }   from 'rxjs/Subscription';
 
@Component({
    selector: 'house',
    templateUrl: '../../app/esc/house.component.html'
})
export class HouseComponent {

    public project: ProjectFile;

    subscriptionLoaded : Subscription;
    subscription : Subscription;

    constructor(@Host() parent: ModernizationComponent, private projectStartService: ProjectStartService, private escService : EscService){
        this.subscription = escService.escUpdateded$.subscribe(esc => {
            console.log('HouseComponent got esc');
        });

        this.subscriptionLoaded = projectStartService.projectLoaded$.subscribe(p=>{
            this.project = p;  
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe(); 
        this.subscriptionLoaded.unsubscribe();    
     }

}