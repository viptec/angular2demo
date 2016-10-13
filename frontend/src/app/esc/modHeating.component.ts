import { Component, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';


import { ProjectFile } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { ModernizationService } from '../service/modernization.service';
import { EscService, EscResult, EscResultWrapper } from '../service/esc.service';
import { ModernizationComponent } from './modernization.component';

@Component({
    selector: 'modheating',
    templateUrl: '../../app/esc/modHeating.component.html'
})
export class ModHeatingComponent {

    private parentComponent : ModernizationComponent;
    public isVisible: boolean = false;
    initialized : boolean;
    public myForm: FormGroup;
    public submitted: boolean;
    public projectCopy: ProjectFile;
    public project: ProjectFile;
    public showInvestments : boolean = false;

    subscriptionModernization: Subscription;

    escResult : EscResult;

    constructor(@Host() parent: ModernizationComponent, private projectStartService: ProjectStartService, private modernizationService: ModernizationService, private escService: EscService, private _fb: FormBuilder, ){
        
        this.parentComponent = parent;
        this.subscriptionModernization = modernizationService.modOpened$.subscribe(m => {
            console.log(m);
            if ("heating" === m){
                this.isVisible = true;
            }            
            else {
                this.isVisible = false;
            }


            if (this.isVisible){
                this.project = parent.project;
                this.projectCopy = <ProjectFile> JSON.parse(JSON.stringify(parent.project)); // make a copy to allow cancel handling and throw away values safely 
                console.log("========= MOD =====> ", this.projectCopy);
                (<FormGroup>this.myForm).setValue({
                    outerWallCurrent : this.projectCopy.building.wallInsulation,
                    outerWallFuture : this.projectCopy.buildingMods.wallInsulation,
                    investments : this.projectCopy.finance.wallInsulation
                },{ onlySelf: true });

                if (!this.initialized){
                     this.myForm.valueChanges.debounceTime(400).subscribe(data => {                                               
                        //if (this.submitted){
                            this.preview(data, true);
                        //}
                    });
                    this.initialized = true;
                }


                this.preview(this.myForm.value, true);
            }
        });


        // init form
        this.myForm = this._fb.group({
            investments : [''],
            outerWallCurrent : [''],
            outerWallFuture : ['']
        });


    }

    closeDialog(){
        this.modernizationService.hideModernization();
    }
    applyDialog(){
        
        // copy values to original project
        this.project.building.wallInsulation = this.myForm.value.outerWallCurrent;
        this.project.buildingMods.wallInsulation = this.myForm.value.outerWallFuture;
        this.project.finance.wallInsulation = this.myForm.value.investments;
        

        // call recalcuate again to update esc results and save project
        let escWrapper = new EscResultWrapper();
        escWrapper.escResult = this.escResult;
        escWrapper.mode = "global";
        this.escService.updateEsc(escWrapper);
        this.projectStartService.saveProject(this.project);
        this.modernizationService.hideModernization();
        
    }

    preview(model:ModOuterWallForm, isValid: boolean){
        if (model.outerWallFuture > 0){
            this.showInvestments = true;
        }
        else {
            this.showInvestments = false;
        }
        this.projectCopy.buildingMods.wallInsulation = model.outerWallFuture;
        this.projectCopy.building.wallInsulation = model.outerWallCurrent;
        this.projectCopy.finance.wallInsulation = model.investments;

        this.escService.calculateEsc(this.projectCopy).subscribe(r=>{
            console.log('mod outer wall preview: ', r);
            this.escResult = r;
            let escWrapper = new EscResultWrapper();
            escWrapper.escResult = r;
            escWrapper.mode = "heating";
            this.escService.updateEsc(escWrapper);
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed     
        this.subscriptionModernization.unsubscribe();  
    }
}

class ModOuterWallForm {
    investments: number;
    outerWallCurrent : number;
    outerWallFuture : number;
}