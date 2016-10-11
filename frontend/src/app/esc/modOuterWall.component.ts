import { Component, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';


import { ProjectFile } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { ModernizationService } from '../service/modernization.service';
import { EscService, EscResult } from '../service/esc.service';
import { ModernizationComponent } from './modernization.component';

@Component({
    selector: 'modouterwall',
    templateUrl: '../../app/esc/modOuterWall.component.html'
})
export class ModOuterWallComponent {

    public isVisible: boolean = false;
    initialized : boolean;
    public myForm: FormGroup;
    public submitted: boolean;
    public project: ProjectFile;
    subscriptionModernization: Subscription;

    escResult : EscResult;

    constructor(@Host() parent: ModernizationComponent, private modernizationService: ModernizationService, private _fb: FormBuilder, ){
        console.log('XXXXX parent?', parent);
        this.subscriptionModernization = modernizationService.modOpened$.subscribe(m => {
            console.log(m);
            if ("outerWall" === m){
                this.isVisible = true;
            }            
            else {
                this.isVisible = false;
            }


            if (this.isVisible){
                this.project = <ProjectFile> JSON.parse(JSON.stringify(parent.project)); // make a copy to allow cancel handling and throw away values safely 
                console.log("========= MOD =====> ", this.project);
                (<FormGroup>this.myForm).setValue({
                    outerWallCurrent : this.project.building.wallInsulation,
                    outerWallFuture : this.project.buildingMods.wallInsulation              
                },{ onlySelf: true });
            }
        });


        // init form
        this.myForm = this._fb.group({
            outerWallCurrent : [''],
            outerWallFuture : ['']
        });
    }

    closeDialog(){
        this.modernizationService.hideModernization();
    }
    applyDialog(){
        this.modernizationService.hideModernization();
    }

    preview(model: any, isValid: boolean){
        console.log('XXXX preview', model);
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed     
        this.subscriptionModernization.unsubscribe();  
    }
}