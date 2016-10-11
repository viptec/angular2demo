import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStartService} from './start.service';
import { TranslateService } from '../service/translate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'navmenu',
    templateUrl: '../../app/start/nav.component.html'
})
export class NavComponent {
}