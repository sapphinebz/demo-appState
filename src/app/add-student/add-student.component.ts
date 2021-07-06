import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppStateService } from "../app-state.service";
import { Student } from "../student.model";
import { StudentValidatorsService } from "../student.validators";

@Component({
  selector: "app-add-student",
  template: `
    <ng-container [formGroup]="studentFormGroup">
      <div>
        id:
        <input
          formControlName="id"
          type="number"
          name="studentId"
          id="studentId"
        />
        <span
          *ngIf="
            idForm.invalid && idForm.hasError('isDuplicate') && idForm.touched
          "
          style="color:red"
        >
          id นี้ซ้ำกับในระบบ
        </span>
        <span
          *ngIf="
            idForm.invalid && idForm.hasError('required') && idForm.touched
          "
          style="color:red"
        >
          กรอกด้วย
        </span>
      </div>

      <div>
        name:
        <input
          formControlName="name"
          type="text"
          name="studentName"
          id="studentName"
        />
        <span
          *ngIf="
            nameForm.invalid &&
            nameForm.hasError('required') &&
            nameForm.touched
          "
          style="color:red"
        >
          กรอกด้วย
        </span>
      </div>
      <div>
        age:
        <input
          formControlName="age"
          type="number"
          name="studentAge"
          id="studentAge"
        />
        <span
          *ngIf="
            ageForm.invalid && ageForm.hasError('required') && ageForm.touched
          "
          style="color:red"
        >
          กรอกด้วย
        </span>
      </div>
      <div>
        <button (click)="addStudent()">add</button>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class AddStudentComponent implements OnInit {
  readonly idForm = new FormControl(null, [
    Validators.required,
    this.studentValidatorsService.idDuplicateValidators,
  ]);

  readonly nameForm = new FormControl(null, Validators.required);

  readonly ageForm = new FormControl(null, Validators.required);

  public readonly studentFormGroup = new FormGroup({
    id: this.idForm,
    name: this.nameForm,
    age: this.ageForm,
  });

  constructor(
    private appState: AppStateService,
    private studentValidatorsService: StudentValidatorsService
  ) {}

  ngOnInit(): void {}

  addStudent() {
    this.studentFormGroup.markAllAsTouched();
    if (this.studentFormGroup.valid) {
      const student: Student = this.studentFormGroup.getRawValue();
      this.appState.addStudent(student);
      this.studentFormGroup.reset();
    }
  }
}
