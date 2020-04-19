import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PatientComponent } from './pages/patient/patient.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientStatsComponent } from './pages/patient-stats/patient-stats.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, PatientComponent, PatientStatsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'patients', component: PatientComponent },
      {
        path: 'stats',
        component: PatientStatsComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
