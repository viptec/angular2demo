import { Component, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl }   from '@angular/forms';
import { ProjectFile, QuickCheck, ModernizationTarget, EnergySource, BuildingType } from '../entity/ProjectFile'; 
import { QuickCheckService } from '../service/quickcheck.service';
import { ProjectStartService} from '../start/start.service';

import { Subscription }   from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';



@Component({
    selector: 'quickcheck',
    templateUrl: '../../app/esc/quickcheck.component.html'
})
export class QuickCheckComponent {

     @Input()
     project: ProjectFile;

     modTargets = ModernizationTarget;

     usages: any[];

     bt_ONE_FAMILY_HOUSE : string = BuildingType[BuildingType.ONE_FAMILY_HOUSE];
     bt_MULTI_FAMILY_HOUSE : string = BuildingType[BuildingType.MULTI_FAMILY_HOUSE];

     es_HEATING_OIL : string = EnergySource[EnergySource.HEATING_OIL];
     es_GAS : string = EnergySource[EnergySource.GAS];

     public myForm: FormGroup;
     public submitted: boolean;
     initialized : boolean;
     public events: any[] = [];

     subscription: Subscription;
     subscriptionRestart: Subscription;


     constructor(private _fb: FormBuilder, private quickCheckService: QuickCheckService, private projectStartService: ProjectStartService) {

       this.subscription = projectStartService.projectLoaded$.subscribe(p=>{
            console.log('init',this.project, p);   
            this.project = p;
            (<FormGroup>this.myForm).setValue({
              modernizationTarget : p.quickcheck.modernizationTarget,
              includeBuildingModernization : p.quickcheck.includeBuildingModernization,
              buildingType : p.building.buildingType,
              livingSpace : p.building.livingSpace,
              energySource : p.installation.energySource,
              includeWarmWater : p.quickcheck.includeWarmWater,
              numberOfPersons : p.building.numberOfPersons,
              installationConsumption : p.installation.installationConsumption
              
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

        this.subscriptionRestart = projectStartService.projectRestarted$.subscribe(p => {            
            this.submitted = false;
        });

        

       this.usages = Object.keys(this.modTargets).filter(enumMember=>{
         var isValueProperty = parseInt(enumMember, 10) >= 0;                 
         return isValueProperty ? false : true;
       });

      
      this.myForm = this._fb.group({
            modernizationTarget : [''],
            includeBuildingModernization : [''],
            buildingType : [''],
            livingSpace: [''],
            energySource : [''],
            includeWarmWater : [''],
            numberOfPersons : [''],
            installationConsumption : ['']
      });

      

     


     }

     ngOnInit() {             
        // 
     }

     ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe(); 
        this.subscriptionRestart.unsubscribe();   
     }

     save(model: QuickCheckForm, isValid: boolean){
       console.log('saving ', model, isValid);
       this.project.quickcheck.modernizationTarget = model.modernizationTarget;
       this.project.quickcheck.includeBuildingModernization = model.includeBuildingModernization;
       this.project.building.buildingType = model.buildingType;
       this.project.building.livingSpace = model.livingSpace;
       this.project.installation.energySource = model.energySource;
       this.project.quickcheck.includeWarmWater = model.includeWarmWater;
       this.project.building.numberOfPersons = model.numberOfPersons;
       this.project.installation.installationConsumption = model.installationConsumption;

       this.quickCheckService.calculateQuickCheck(this.project).subscribe(r=>{
          console.log(r);
          this.quickCheckService.updateQuickCheck(r);
          this.submitted = true;
          //this.projectStartService.saveProject(this.project);
       });
     }
}

export class QuickCheckForm {
  modernizationTarget : ModernizationTarget;
  buildingType : BuildingType;
  includeBuildingModernization : boolean;
  livingSpace : number;
  includeWarmWater : boolean;
  installationConsumption : number;
  energySource : EnergySource;
  numberOfPersons : number;
}