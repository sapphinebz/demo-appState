import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Room } from "./room.model";
import { Student } from "./student.model";

interface AppState {
  students: Student[];
  rooms: Room[];
}

const initState: AppState = {
  students: [
    { id: 0, name: "Thanadon", age: 22 },
    { id: 1, name: "Supawon", age: 30 },
    { id: 2, name: "Iris", age: 25 },
  ],
  rooms: [
    { id: 0, name: "Room 1", students: [] },
    { id: 1, name: "Room 2", students: [] },
  ],
};

@Injectable({
  providedIn: "root",
})
export class AppStateService {
  // Observable
  // Replay 1
  // Multicast
  private appState = new BehaviorSubject<AppState>(initState);

  students$ = this.appState.pipe(map((state) => state.students));
  countStudent$ = this.students$.pipe(map((students) => students.length));
  rooms$ = this.appState.pipe(map((state) => state.rooms));

  get snapshotRooms() {
    return this.appState.getValue().rooms;
  }

  get snapshotStudents() {
    return this.appState.getValue().students;
  }

  constructor() {}

  addStudentToRoom(student: Student, targetRoom: Room) {
    this.snapshotRooms.forEach((room) => {
      const index = room.students.findIndex((st) => st.id === student.id);
      if (index > -1) {
        room.students.splice(index, 1);
      }
    });
    targetRoom.students.push(student);

    const currState = this.appState.getValue();
    this.appState.next(currState);
  }

  addStudent(student: Student) {
    const currState = this.appState.getValue();
    currState.students.push(student);
    this.appState.next(currState);
  }

  removeStudent(student: Student) {
    const currState = this.appState.getValue();
    const index = currState.students.findIndex((st) => st.id === student.id);
    if (index > -1) {
      currState.students.splice(index, 1);
    }
    currState.rooms.forEach((room) => {
      const index = room.students.findIndex((st) => st.id === student.id);
      if (index > -1) {
        room.students.splice(index, 1);
      }
    });

    this.appState.next(currState);
  }
}
