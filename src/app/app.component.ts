import { Component } from "@angular/core";
import { AppStateService } from "./app-state.service";
import { Room } from "./room.model";
import { Student } from "./student.model";

@Component({
  selector: "app-root",
  template: `
    <h2>Add Student</h2>
    <app-add-student></app-add-student>

    <h2>Students</h2>
    <div *ngFor="let student of students$ | async">
      <app-student-select-room
        [student]="student"
        [rooms]="$any(rooms$ | async)"
      ></app-student-select-room>
    </div>
    <div>count students: {{ countStudents$ | async }}</div>

    <ng-container *ngFor="let room of rooms$ | async">
      <app-room-students [room]="room"></app-room-students>
    </ng-container>

    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = "behaviorState";

  students$ = this.appState.students$;
  rooms$ = this.appState.rooms$;
  countStudents$ = this.appState.countStudent$;

  constructor(readonly appState: AppStateService) {
    // this.rooms$.subscribe((room) => {
    //   console.log("change", room);
    // });
  }

  addStudentToRoom(student: Student, room: Room) {
    console.log(student, room);
  }
}
