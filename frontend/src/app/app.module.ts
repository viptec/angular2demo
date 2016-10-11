import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { CommonModule, LocationStrategy, HashLocationStrategy }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
 
import { routing } from './app.routing';

import { AppComponent }   from './app.component';

// app sub components:
import { LoadProjectComponent }   from './start/loadproject.component';
import { NavComponent} from './start/nav.component';
import { StartComponent }   from './start/start.component';
import { EscComponent }   from './esc/esc.component';
import { QuickCheckComponent }   from './esc/quickcheck.component';
import { QuickCheckResultComponent }   from './esc/quickcheckresult.component';
import { ModernizationComponent } from './esc/modernization.component';
import { ModOuterWallComponent } from './esc/modOuterWall.component' ;
import { SavingsComponent } from './esc/savings.component';


// services
import { ProjectStartService }   from './start/start.service';
import { QuickCheckService } from './service/quickcheck.service';
import { EscService } from './service/esc.service';
import { ModernizationService } from './service/modernization.service';

// utils
import { KeysPipe } from './util/enumpipe';
import { TranslateService }   from './service/translate.service';
import { TRANSLATION_PROVIDERS} from './service/translations';
import { TranslatePipe } from './util/translate.pipe';

@NgModule({
  imports:      [ 
                    BrowserModule,
                    CommonModule,
                    HttpModule, 
                    FormsModule,
                    ReactiveFormsModule,
                    routing
                ],
  declarations: [ 
                    AppComponent,
                    LoadProjectComponent,
                    NavComponent,
                    StartComponent,
                    EscComponent,
                    QuickCheckComponent,
                    QuickCheckResultComponent,
                    ModernizationComponent,
                    ModOuterWallComponent,
                    SavingsComponent,
                    KeysPipe,
                    TranslatePipe
                ],
  providers: [      ProjectStartService, 
                    QuickCheckService,
                    EscService,
                    ModernizationService,
                    TRANSLATION_PROVIDERS,
                    TranslateService,
                    {provide: LocationStrategy, useClass: HashLocationStrategy}                                        
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }