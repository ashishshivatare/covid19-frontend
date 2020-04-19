import { Component, OnInit } from '@angular/core';
import { IPatient } from './patient';
import { PatientService } from './patient.service';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'cs-city',
  templateUrl: './city.component.html',
})
export class CityComponent implements OnInit {
  pageTitle: string = 'City component';
  _cityFilter: string;
  errorMessage: any;
  filteredPatientList: IPatient[];
  get cityFilter() {
    return this._cityFilter;
  }
  set cityFilter(value: string) {
    this._cityFilter = value;
    this.filteredPatientList = this.cityFilter
      ? this.performFilter(this.cityFilter)
      : this.patientList;
  }
  patientList: IPatient[];
  constructor(private patientService: PatientService) {}

  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.patientList.filter(
      (patient: IPatient) =>
        patient.detectedcity.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe({
      next: (patientList) => {
        this.patientList = patientList.raw_data;
        this.filteredPatientList = this.patientList;
      },
      error: (err) => (this.errorMessage = err),
    });

    let chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Monthly Expense',
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: [
            { y: 450, name: 'Food' },
            { y: 120, name: 'Insurance' },
            { y: 300, name: 'Traveling' },
            { y: 800, name: 'Housing' },
            { y: 150, name: 'Education' },
            { y: 150, name: 'Shopping' },
            { y: 250, name: 'Others' },
          ],
        },
      ],
    });

    chart.render();
  }
}
