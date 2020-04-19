import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { PatientStatsService } from './patient-stats.service';
import { IDatapoints } from './IDatapoints';
@Component({
  selector: 'app-patient-stats',
  templateUrl: './patient-stats.component.html',
  styleUrls: ['./patient-stats.component.css'],
})
export class PatientStatsComponent implements OnInit {
  errorMessage: any;
  dataPointsConfirmedCases: IDatapoints[] = [];
  dataPointsRecoveredCases: IDatapoints[] = [];
  dataPointsDeceasedCases: IDatapoints[] = [];
  constructor(private patientStats: PatientStatsService) {}

  ngOnInit(): void {
    this.patientStats.getPatientsStats().subscribe({
      next: (patientStats) => {
        console.log(patientStats.piechart);
        for (let key in patientStats.piechart[1].sumstatesconfirmed) {
          this.dataPointsConfirmedCases.push({
            y: patientStats.piechart[1].sumstatesconfirmed[key],
            name: key,
          });
        }
        for (let key in patientStats.piechart[3].sumstatesrecovered) {
          this.dataPointsRecoveredCases.push({
            y: patientStats.piechart[3].sumstatesrecovered[key],
            name: key,
          });
        }
        for (let key in patientStats.piechart[2].sumstatesdeceased) {
          this.dataPointsDeceasedCases.push({
            y: patientStats.piechart[2].sumstatesdeceased[key],
            name: key,
          });
        }
        console.log(this.dataPointsRecoveredCases);
        let chartConfirmedCases = new CanvasJS.Chart('chartConfirmedCases', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Confirmed Cases',
          },
          data: [
            {
              type: 'pie',
              toolTipContent: '<b>{name}</b>:{y}',
              indexLabel: '{name} - #percent%',
              dataPoints: this.dataPointsConfirmedCases,
            },
          ],
        });

        let chartRecoveredCases = new CanvasJS.Chart('chartRecoveredCases', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Recovered Cases',
          },
          data: [
            {
              type: 'pie',
              toolTipContent: '<b>{name}</b>:{y}',
              indexLabel: '{name} - #percent%',
              dataPoints: this.dataPointsRecoveredCases,
            },
          ],
        });
        let chartDeceasedCases = new CanvasJS.Chart('chartDeceasedCases', {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: 'Deceased Cases',
          },
          data: [
            {
              type: 'pie',
              toolTipContent: '<b>{name}</b>:{y}',
              indexLabel: '{name} - #percent%',
              dataPoints: this.dataPointsDeceasedCases,
            },
          ],
        });
        chartConfirmedCases.render();
        chartRecoveredCases.render();
        chartDeceasedCases.render();
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
