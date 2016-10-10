import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate, Params } from '@angular/router';

import { ProjectFile } from '../entity/Projectfile';

import 'rxjs/add/operator/map'

@Injectable()
export class ProjectStartService {


     // Observable string sources
    private projectLoadSource = new Subject<ProjectFile>();
    private projectCreateSource = new Subject<string>();
    private projectRestartSource = new Subject<string>();
    private projectESCStartSource = new Subject<string>();

    projectLoaded$ = this.projectLoadSource.asObservable();
    projectCreated$ = this.projectCreateSource.asObservable();
    projectRestarted$ = this.projectRestartSource.asObservable();
    projectESCStarted$ = this.projectESCStartSource.asObservable();

    constructor(private http: Http) {
    }

    startProject(){

        // 
        this.createProjectId().subscribe(p=>{
            console.log('result: ', p.projectId);
            this.projectCreateSource.next(p.projectId);
        });
                    
    }

    loadProject(projectId: string){
        console.log('ProjectStartService.loadProject ' + projectId);
        this.loadProjectFromBackend(projectId).subscribe(p=>{
            this.projectLoadSource.next(p);
        });
        
    }

    restartProject(){
        this.projectRestartSource.next('not initialized yet');
    }

    startESC(){
        this.projectESCStartSource.next('start');
    }

    // misc backend calls

    createProjectId(): Observable<ProjectIdResult> {
        console.log('create project id calling api');
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:9000/api/start', options).map(res => {
            console.log(res);
            return res.json();
        });
        
    }

    loadProjectFromBackend(projectId: string): Observable<ProjectFile> {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({ headers: headers }); 

        return this.http.get('http://localhost:9000/api/loadProject/'+projectId, options).map(res => {
            console.log(res);
            return res.json();
        });
    }



}
export class ProjectIdResult {
    projectId: string;
}