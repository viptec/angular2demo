import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFile, QuickCheck } from './entity/Projectfile';
import { ProjectStartService} from './start/start.service';
import { Subscription }   from 'rxjs/Subscription';
 
 
 
@Component({
    selector: 'nesc-app',
    templateUrl: 'app/app.component.html'
    
})
export class AppComponent {
    title = 'NESC1';
    
    query: string;

    project: ProjectFile;

    subscription: Subscription;
    subscription2: Subscription;
    
 
    constructor(private _router: Router, private projectStartService: ProjectStartService) { 
        this.subscription = projectStartService.projectLoaded$.subscribe(p => {
            this.project = p;
        });
        
        this.subscription2 = projectStartService.projectRestarted$.subscribe(p => {
            console.log('project restarted...');
            this.initEmptyProject();
        });
    }
    ngOnInit() {
        this.initEmptyProject();
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
        this.subscription2.unsubscribe();
    }

    initEmptyProject(){
        this.project = new ProjectFile();
        this.project.projectId = "not initialized";
        this.project.quickcheck = new QuickCheck();
    }
     
}