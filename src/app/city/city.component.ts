import { Component, OnInit } from '@angular/core';
import { IPatient } from './patient';
import { PatientService } from './patient.service';

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
  }
}
