import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { CommonModule, LocationStrategy, HashLocationStrategy }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
 
import { routing } from './app.routing';

import { AppComponent }   from './app.component';
import { LoadProjectComponent }   from './start/loadproject.component';
import { StartComponent }   from './start/start.component';
import { ProjectStartService }   from './start/start.service';

import { EscComponent }   from './esc/esc.component';
import { QuickCheckComponent }   from './esc/quickcheck.component';

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
                    StartComponent,
                    EscComponent,
                    QuickCheckComponent
                ],
  providers: [ProjectStartService, 
              {provide: LocationStrategy, useClass: HashLocationStrategy}                    
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }