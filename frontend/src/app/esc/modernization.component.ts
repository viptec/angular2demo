import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';


import { ProjectFile } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { ModernizationService } from '../service/modernization.service';
import { EscService, EscResult } from '../service/esc.service';

@Component({
    selector: 'modernization',
    templateUrl: '../../app/esc/modernization.component.html'
})
export class ModernizationComponent {

    subscription: Subscription;
    subscriptionRestart: Subscription;
    subscriptionLoaded: Subscription;
    subscriptionModernization: Subscription;

    public escResult: EscResult;
    public project: ProjectFile;

    public modVisible : string;

    constructor(private projectStartService: ProjectStartService, private escService: EscService, private modernizationService: ModernizationService){

        this.subscription = escService.escUpdateded$.subscribe(r => {
            console.log('ModernizationComponent escUpdated',r);
            if ("global" === r.mode) {
                this.escResult = r.escResult;
            }
        });

        this.subscriptionRestart = projectStartService.projectRestarted$.subscribe(p => {            
            this.escResult = null;
        });

        this.subscriptionModernization = modernizationService.modOpened$.subscribe(m => {
            console.log(m);
            this.modVisible = m;
        });

        this.subscriptionLoaded = projectStartService.projectLoaded$.subscribe(p=>{
            this.project = p;  
        });

    }

    
    showModOuterHull(){        
        this.modernizationService.showModernization("outerHull");
    }

    modernize(m : string){
        this.modernizationService.showModernization(m);
    }
    
    
    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();   
        this.subscriptionRestart.unsubscribe();
        this.subscriptionModernization.unsubscribe();  
    }
}