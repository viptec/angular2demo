import { Component, Input, SimpleChanges, Pipe, PipeTransform} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl }   from '@angular/forms';
import { ProjectFile, QuickCheck, ModernizationTarget, EnergySource } from '../entity/ProjectFile'; 
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
              includeBuildingModernization : p.quickcheck.includeBuildingModernization
              
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
            console.log('project restarted...');
            this.submitted = false;
        });

        

       this.usages = Object.keys(this.modTargets).filter(enumMember=>{
         var isValueProperty = parseInt(enumMember, 10) >= 0;                 
         return isValueProperty ? false : true;
       });

      
      this.myForm = this._fb.group({
            modernizationTarget : [''],
            includeBuildingModernization : ['']
      });

      

      /*  
      // the short way
      this.myForm = this._fb.group({
            dateCreated : [''],
            projectId : [''],            
            quickcheck : this._fb.group({
              modernizationTarget: ['']
            })
        });
        
      */


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
  includeBuildingModernization : boolean;
  livingSpace : number;
  includeWarmWater : boolean;
  installationConsumption : number;
  energySource : EnergySource;
  numberOfPersons : number;
}