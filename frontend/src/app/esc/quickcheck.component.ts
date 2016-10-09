import { Component, Input, SimpleChanges,Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup }   from '@angular/forms';
import { ProjectFile,QuickCheck,ModernizationTarget } from '../entity/ProjectFile'; 
 



@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}
@Component({
    selector: 'quickcheck',
    templateUrl: './app/esc/quickcheck.component.html'
})
export class QuickCheckComponent {

     @Input()
     project: ProjectFile;

     usages: ModernizationTarget[];

     ngOnInit() {
         this.usages = [ModernizationTarget.USAGE, ModernizationTarget.CO2, ModernizationTarget.HEATING, ModernizationTarget.INDEPENDENT, ModernizationTarget.REGENERATIVE];
     }
}