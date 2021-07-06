import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AppStateService } from "./app-state.service";

@Injectable({
  providedIn: "root",
})
export class StudentValidatorsService {
  idDuplicateValidators = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const idSelected = control.value;
    const isDuplicate = this.appState.snapshotStudents.some(
      (student) => student.id === idSelected
    );
    if (isDuplicate) {
      return { isDuplicate: true };
    }
    return null;
  };

  constructor(private appState: AppStateService) {}
}
