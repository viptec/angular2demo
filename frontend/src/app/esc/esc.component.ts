import { Component, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';

import { ProjectFile, BuildingType, BuildingLocation, RoofType, InstallationType } from '../entity/ProjectFile';
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

    roofTypes: any[];
    instTypes = InstallationType;
    installationTypes: any[];

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
              roofType: this.project.building.roofType,
              hasHeatedRoof : this.project.building.hasHeatedRoof,
              numberOfLevels : this.project.building.numberOfLevels,
              hasHeatedCellar : this.project.building.hasHeatedCellar,
              electricPowerConsumption : this.project.building.electricPowerConsumption,
              yearOfConstruction : this.project.installation.yearOfConstruction,
              installationType : this.project.installation.installationType,
              nominalPower : this.project.installation.nominalPower
              
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


        this.roofTypes = [
            {roofType: RoofType[RoofType.SADDLE], img : 'images/dach_sattel.png'},
            {roofType: RoofType[RoofType.HALF_HIPPED], img : 'images/dach_krueppelwalm.png'},
            {roofType: RoofType[RoofType.HIPPED], img : 'images/dach_walm.png'},
            {roofType: RoofType[RoofType.FLAT], img : 'images/dach_flach.png'},
            {roofType: RoofType[RoofType.SINGLE_PITCH], img : 'images/dach_pult.png'}
        ];

        this.installationTypes = Object.keys(this.instTypes).filter(enumMember=>{
            var isValueProperty = parseInt(enumMember, 10) >= 0;                 
            return isValueProperty ? false : true;
        });


        // init form
        this.myForm = this._fb.group({
            postalCode : [''],
            buildingYearOfConstruction : [''],
            buildingLength : [''],
            buildingWidth : [''],
            buildingLocation : [''],
            roofType : [''],
            hasHeatedRoof : [''],
            numberOfLevels : [''],
            hasHeatedCellar : [''],
            electricPowerConsumption : [''],
            yearOfConstruction : [''],
            installationType : [''],
            nominalPower : ['']
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
       this.project.building.roofType = model.roofType;
       this.project.building.hasHeatedRoof = model.hasHeatedRoof;
       this.project.building.numberOfLevels = model.numberOfLevels;
       this.project.building.hasHeatedCellar = model.hasHeatedCellar;
       this.project.building.electricPowerConsumption = model.electricPowerConsumption;
       this.project.installation.yearOfConstruction = model.yearOfConstruction;
       this.project.installation.installationType = model.installationType;
       this.project.installation.nominalPower = model.nominalPower;
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
    electricPowerConsumption : number;
    yearOfConstruction : number;
    installationType : InstallationType;
    nominalPower : number;
}