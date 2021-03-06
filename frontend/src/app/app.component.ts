import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFile, QuickCheck } from './entity/Projectfile';
import { ProjectStartService } from './start/start.service';
import { QuickCheckService } from './service/quickcheck.service';
import { EscService } from './service/esc.service';
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
    subscriptionRestart: Subscription;
    subscriptionESCUpdated : Subscription;

    subscriptionQuickCheckResult: Subscription;
    subscriptionESCStartResult: Subscription;

    showQuickCheck : boolean = false;
    showQuickCheckResult : boolean = false;
    showESC : boolean = false;
    showModernization : boolean = false;
    
 
    constructor(private _router: Router, private projectStartService: ProjectStartService, private quickCheckService: QuickCheckService,private escService: EscService) { 
        
        /* detect changes to the quickcheck form */
        this.subscriptionQuickCheckResult = quickCheckService.quickChecked$.subscribe(r=>{
            this.showQuickCheckResult = true;
            console.log('quickcheck updated');
            if (this.showModernization){
                this.escService.recalcAndUpdateGlobalResult(this.project, true);
            }
            else{
                // just save project
                this.projectStartService.saveProject(this.project);
            }
        });

        /* detect changes to the esc form. in this case, just the the show modernization variable to true */
        this.subscriptionESCUpdated = escService.escUpdateded$.subscribe(r => {
            this.showModernization = true;
        });

        

        /* wait for project is loaded. then set as current project and enable quickcheck */
        this.subscription = projectStartService.projectLoaded$.subscribe(p => {
            this.showQuickCheck = true;
            this.project = p;                
        });
        
        /* on restart, init new empty project and reset */
        this.subscriptionRestart = projectStartService.projectRestarted$.subscribe(p => {
            console.log('project restarted...');
            this.initEmptyProject();
            this.showQuickCheck = false;
            this.showQuickCheckResult = false;
            this.showESC = false;
            this.showModernization = false;
        });

        /* on esc start show esc */
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
        this.subscriptionRestart.unsubscribe();
        this.subscriptionQuickCheckResult.unsubscribe();
        this.subscriptionESCStartResult.unsubscribe();
        this.subscriptionESCUpdated.unsubscribe();
    }

    initEmptyProject(){
        this.project = new ProjectFile();
        this.project.projectId = "not initialized";
        this.project.quickcheck = new QuickCheck();
    }
     
}