import { Student } from "./student.model";

export interface Room {
  id: number;
  name: string;
  students: Student[];
}
