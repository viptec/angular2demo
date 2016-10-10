import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFile, QuickCheck } from './entity/Projectfile';
import { ProjectStartService } from './start/start.service';
import { QuickCheckService } from './service/quickcheck.service';
import { Subscription }   from 'rxjs/Subscription';
 
 
 
@Component({
    selector: 'nesc-app',
    templateUrl: '../app/app.component.html'
    
})
export class AppComponent {
    title = 'NESC1';
    
    query: string;

    project: ProjectFile;

    subscription: Subscription;
    subscription2: Subscription;

    subscriptionQuickCheckResult: Subscription;
    subscriptionESCStartResult: Subscription;

    showQuickCheck : boolean = false;
    showQuickCheckResult : boolean = false;
    showESC : boolean = false;
    showModernization : boolean = false;
    
 
    constructor(private _router: Router, private projectStartService: ProjectStartService, private quickCheckService: QuickCheckService) { 
        
        this.subscriptionQuickCheckResult = quickCheckService.quickChecked$.subscribe(r=>{
            this.showQuickCheckResult = true;
        });

        this.subscription = projectStartService.projectLoaded$.subscribe(p => {
            this.showQuickCheck = true;
            this.project = p;                
        });
        
        this.subscription2 = projectStartService.projectRestarted$.subscribe(p => {
            console.log('project restarted...');
            this.initEmptyProject();
            this.showQuickCheck = false;
            this.showQuickCheckResult = false;
            this.showESC = false;
            this.showModernization = false;
        });

        this.subscriptionESCStartResult = projectStartService.projectESCStarted$.subscribe(p=>{            
            this.showESC = true;
        });
    }
    ngOnInit() {
        this.initEmptyProject();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
        this.subscription2.unsubscribe();
        this.subscriptionQuickCheckResult.unsubscribe();
        this.subscriptionESCStartResult.unsubscribe();
    }

    initEmptyProject(){
        this.project = new ProjectFile();
        this.project.projectId = "not initialized";
        this.project.quickcheck = new QuickCheck();
    }
     
}