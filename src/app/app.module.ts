import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StudentSelectRoomComponent } from "./student-select-room/student-select-room.component";
import { RoomStudentsComponent } from './room-students/room-students.component';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  declarations: [AppComponent, StudentSelectRoomComponent, RoomStudentsComponent, AddStudentComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
