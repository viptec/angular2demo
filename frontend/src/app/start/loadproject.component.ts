import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { ProjectStartService} from './start.service';
 
 
@Component({
    selector: 'loadproject',
    template: `<h2>load project{{projectId}}</h2>`
})
export class LoadProjectComponent {
 
    private sub: any;
    projectId: string;
    subscription1: Subscription;
    subscription2: Subscription;

 
    constructor(private route: ActivatedRoute, public router: Router, private projectStartService: ProjectStartService) {
        this.subscription1 = projectStartService.projectLoaded$.subscribe(p => {
            console.log('LoadProjectComponent sub: ', p);
        });

        this.subscription2 = projectStartService.projectCreated$.subscribe(p=>{
            console.log('navigating to', p);
            this.router.navigate(['/projects', p]);
        });
    }
	
	ngOnInit() {
	  this.sub = this.route.params.subscribe(params => {        
            this.projectId = params["id"];
            if (this.projectId) {
                console.log('got projectId ' + this.projectId);
                this.projectStartService.loadProject(this.projectId);
            }
        });

	}

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }
 
     
 
}