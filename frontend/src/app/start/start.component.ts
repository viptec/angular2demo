import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStartService} from './start.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'start',
    templateUrl: './app/start/start.component.html'
})
export class StartComponent {
 
    isStart : boolean;
    subscription: Subscription;
 
    constructor(private route: ActivatedRoute, public router: Router, private projectStartService: ProjectStartService) {
        
    }
 
    start(){
        console.log('start');
        this.isStart = !this.isStart;
        this.projectStartService.startProject();
    }

    restart(){
        console.log('restart');
        this.isStart = !this.isStart;        
        this.router.navigate(['/']);
    }


    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
    }
 
}