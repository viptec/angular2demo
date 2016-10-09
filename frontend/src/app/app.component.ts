import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFile } from './entity/Projectfile';
 
 
 
@Component({
    selector: 'nesc-app',
    templateUrl: 'app/app.component.html'
    
})
export class AppComponent {
    title = 'NESC1';
    
    query: string;

    project: ProjectFile
 
    constructor(private _router: Router) { 

    }
    ngOnInit() {
        this.project = new ProjectFile();
        this.project.projectId = "1234";
    }
     
}