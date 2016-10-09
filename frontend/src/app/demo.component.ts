import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
 
 
@Component({
    selector: 'demo',
    templateUrl: './app/demo.component.html'
})
export class DemoComponent {
 
    private sub: any;
    projectId: string;

 
    constructor(fb: FormBuilder, private route: ActivatedRoute) {
        
    }
	
	ngOnInit() {
	  this.sub = this.route.params.subscribe(params => {        
            this.projectId = params["id"];
        });

	}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
 
    onSubmit(username: string, password: string) {
       console.log('onsubmit');
    }
 
    onLogout() {
        
    }
 
    get showLoginForm(): boolean {
		// this.router.navigate(['/services']);
        return false;
    }    
 
}