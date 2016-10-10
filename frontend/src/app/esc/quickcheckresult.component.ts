import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

import { QuickCheckService, QuickCheckResult } from '../service/quickcheck.service';
 
@Component({
    selector: 'quickcheck-result',
    templateUrl: './app/esc/quickcheckresult.component.html'
})
export class QuickCheckResultComponent {

    subscription: Subscription;
    quickCheckResult : QuickCheckResult;
    constructor(private quickCheckService: QuickCheckService){
        this.subscription = quickCheckService.quickChecked$.subscribe(r=>{
            console.log("quickcheck result updated", r);
            this.quickCheckResult = r;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
    }
}