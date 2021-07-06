import { Component, Input, OnInit } from "@angular/core";
import { AppStateService } from "../app-state.service";
import { Room } from "../room.model";

@Component({
  selector: "app-room-students",
  template: `
    <h2>
      {{ room.name }}
    </h2>
    <div>
      {{ room.students | json }}
    </div>
    <span> average age: {{ averageAge }}</span>
  `,
  styles: [],
})
export class RoomStudentsComponent implements OnInit {
  averageAge = 0;
  @Input() room!: Room;
  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.appState.rooms$.subscribe((rooms) => {
      const room = rooms.find((r) => r.id === this.room.id);
      const sumStudentAges = this.room.students.reduce(
        (sum, student) => sum + student.age,
        0
      );
      if (room) {
        this.averageAge = sumStudentAges / room.students.length || 0;
      }
    });
  }
}
