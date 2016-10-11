import { Component,Input } from '@angular/core';

import { Subscription }   from 'rxjs/Subscription';



import { ProjectStartService} from '../start/start.service';
import { EscService, EscResult } from '../service/esc.service';

@Component({
    selector: 'savings',
    inputs: ['mode'],
    templateUrl: '../../app/esc/savings.component.html'
})

export class SavingsComponent {

    
    public mode: string;

    subscription: Subscription;
    subscriptionRestart: Subscription;
    public escResult: EscResult;

    constructor(private projectStartService: ProjectStartService, private escService: EscService){
        this.subscription = escService.escUpdateded$.subscribe(r => {
            if (this.mode === r.mode) {
                console.log('SavingsComponent escUpdated',this.mode, r);
                this.escResult = r.escResult;
            }
        });

        this.subscriptionRestart = projectStartService.projectRestarted$.subscribe(p => {            
            this.escResult = null;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();   
        this.subscriptionRestart.unsubscribe();  
    }
}