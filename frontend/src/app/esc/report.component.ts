import { Component, Input } from '@angular/core';

import { ProjectFile, BuildingType, BuildingLocation, RoofType, InstallationType } from '../entity/ProjectFile';
import { ProjectStartService} from '../start/start.service';
import { EscService,EscResultWrapper } from '../service/esc.service';
import { ReportService } from '../service/report.service';

import { Subscription }   from 'rxjs/Subscription';
 
@Component({
    selector: 'report',
    templateUrl: '../../app/esc/report.component.html'
})
export class ReportComponent {
    @Input()
    project: ProjectFile;

    public showReport : boolean = false; 
    public buildingDescription : string = 'Demo';
    public buildingDescription2 : string = 'Test';

    subscription: Subscription;

    constructor(private reportService : ReportService) {
        this.subscription = reportService.reportOpened$.subscribe(r=>{
            this.showReport = true;
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();          
    }
}