import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStartService} from './start.service';
import { TranslateService } from '../service/translate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'start',
    templateUrl: '../../app/start/start.component.html'
})
export class StartComponent {
 
    public supportedLangs : any[];
    isStart : boolean;
    subscription: Subscription;
 
    constructor(private route: ActivatedRoute, public router: Router, private projectStartService: ProjectStartService, private translateService: TranslateService) {
        
        this.subscription = projectStartService.projectLoaded$.subscribe(p=>{
            this.isStart = true;
        });
    }
 
    start(){
        console.log('start');
        this.isStart = !this.isStart;
        this.projectStartService.startProject();
    }

    restart(){
        console.log('restart');
        this.isStart = !this.isStart; 
        this.projectStartService.restartProject();       
        this.router.navigate(['/']);
    }

    selectLang(lang: string){
        this.translateService.use(lang);
    }

    isCurrentLang(lang: string) {
      return lang === this.translateService.currentLang;
    }

    ngOnInit(){
        this.supportedLangs = [
            {display: 'Deutsch', value:'de', img: 'images/i18n/flag_germany.png'},
            {display: 'English', value:'en', img: 'images/i18n/flag_usa.png'}
        ];

        this.selectLang('de');
    }


    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();    
    }
 
}