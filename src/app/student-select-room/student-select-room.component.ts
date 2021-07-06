import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AppStateService } from "../app-state.service";
import { Room } from "../room.model";
import { Student } from "../student.model";

@Component({
  selector: "app-student-select-room",
  template: `
    <span>{{ student.name }}</span>

    <span>
      :room
      <select [formControl]="selectedRoomForm">
        <option *ngFor="let room of rooms" [value]="room.name">
          {{ room.name }}
        </option>
      </select>
    </span>
    <span><button (click)="addStudentToRoom(student)">add</button></span>
    <span>
      :student
      <button (click)="removeStudent(student)">remove</button></span
    >
  `,
  styles: [],
})
export class StudentSelectRoomComponent implements OnInit {
  @Input() student!: Student;
  @Input() rooms!: Room[];
  selectedRoomForm = new FormControl();

  get selectedRoom(): Room | null {
    const nameRoomSelected = this.selectedRoomForm.value;
    const found = this.rooms.find((rm) => rm.name === nameRoomSelected);
    return found || null;
    // if(found){
    //   return found;
    // }else{
    //   return null;
    // }
  }

  constructor(private appState: AppStateService) {}

  ngOnInit(): void {}

  addStudentToRoom(student: Student) {
    if (this.selectedRoom) {
      this.appState.addStudentToRoom(student, this.selectedRoom);
    }
    // const selectedRoom = this.selectedRoom;
    // if (!selectedRoom?.students.includes(student)) {
    //   this.selectedRoom?.students.push(student);
    // }
  }

  removeStudent(student: Student) {
    this.appState.removeStudent(student);
  }
}
