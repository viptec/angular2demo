import { Component, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';

import { ProjectFile, BuildingType, BuildingLocation, RoofType } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { EscService,EscResultWrapper } from '../service/esc.service';


import { Subscription }   from 'rxjs/Subscription';
 
@Component({
    selector: 'esc',
    templateUrl: '../../app/esc/esc.component.html'
})
export class EscComponent {


    @Input()
    project: ProjectFile;
    public myForm: FormGroup;
    public submitted: boolean;
    initialized : boolean;

    buildingLocs = BuildingLocation;
    buildingLocations: any[];

    subscription: Subscription;


    constructor(private _fb: FormBuilder, private projectStartService: ProjectStartService, private escService : EscService) {
        this.subscription = projectStartService.projectESCStarted$.subscribe(p=>{
            console.log('got esc start event',p, this.project);

             (<FormGroup>this.myForm).setValue({
              postalCode : this.project.building.postalCode,
              buildingYearOfConstruction : this.project.building.buildingYearOfConstruction,
              buildingLength : this.project.building.buildingLength,
              buildingWidth : this.project.building.buildingWidth,
              buildingLocation : this.project.building.buildingLocation,
              
            },{ onlySelf: true });

            if (!this.initialized){
              this.myForm.valueChanges.debounceTime(400).subscribe(data => {
                console.log('form changes', data);
                if (this.submitted){
                    this.save(data, true);
                }
              });
              this.initialized = true;
            }
        });
        
        
        this.buildingLocations = Object.keys(this.buildingLocs).filter(enumMember=>{
            var isValueProperty = parseInt(enumMember, 10) >= 0;                 
            return isValueProperty ? false : true;
        });


        // init form
        this.myForm = this._fb.group({
            postalCode : [''],
            buildingYearOfConstruction : [''],
            buildingLength : [''],
            buildingWidth : [''],
            buildingLocation : ['']
        });
    }

    /* save form changes: recalcuate and store project file */
    save(model: ESCForm, isValid: boolean){
       console.log('saving ', model, isValid);

       this.project.building.postalCode = model.postalCode;
       this.project.building.buildingYearOfConstruction = model.buildingYearOfConstruction;
       this.project.building.buildingLength = model.buildingLength;
       this.project.building.buildingWidth = model.buildingWidth;
       this.project.building.buildingLocation = model.buildingLocation;
       // TODO: copy other params
       
       this.escService.calculateEsc(this.project).subscribe(r=>{
           console.log("calc response ", r);
           this.submitted = true;
           let escWrapper = new EscResultWrapper();
           escWrapper.escResult = r;
           escWrapper.mode = "global";
           this.escService.updateEsc(escWrapper);
           this.projectStartService.saveProject(this.project);
       });
       
       
    }
    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
     }
}

export class ESCForm {
    postalCode: string;
    buildingYearOfConstruction: number;
    buildingType: BuildingType;
    buildingLocation:  BuildingLocation;
    buildingLength: number;
    buildingWidth: number;
    numberOfLevels: number;
    hasHeatedRoof: boolean;
    hasHeatedCellar: boolean;
    roofType: RoofType;
}