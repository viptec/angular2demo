import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

import { QuickCheckService, QuickCheckResult } from '../service/quickcheck.service';
import { ProjectStartService} from '../start/start.service';

@Component({
    selector: 'quickcheck-result',
    templateUrl: '../../app/esc/quickcheckresult.component.html'
})
export class QuickCheckResultComponent {

    subscription: Subscription;
    subscriptionRestart: Subscription;

    quickCheckResult : QuickCheckResult;
    constructor(private quickCheckService: QuickCheckService, private projectStartService: ProjectStartService){
        this.subscription = quickCheckService.quickChecked$.subscribe(r=>{
            console.log("quickcheck result updated", r);
            this.quickCheckResult = r;
        });
        this.subscriptionRestart = projectStartService.projectRestarted$.subscribe(p => {            
            this.quickCheckResult = null;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();   
        this.subscriptionRestart.unsubscribe();  
    }


    start(){
        console.log('start');
        this.projectStartService.startESC();
    }
}