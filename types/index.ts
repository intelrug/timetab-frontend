export * from './state';

export interface Group {
  id: number;
  name: string;
}

export interface Science {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  name: string;
  link: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Lesson {
  id: number;
  group_id: number;
  type_id: number;
  week: number;
  day: number;
  number: number;
  count: number;
  teacher_id: number;
  science_id: number;
  auditory: string;
}

export interface LessonsGetMany {
  lessons: Lesson[];
  groups: Group[];
  teachers: Teacher[];
  sciences: Science[];
  types: Type[];
}

export interface LessonsGetOne {
  lesson: Lesson;
  groups: Group[];
  teachers: Teacher[];
  sciences: Science[];
  types: Type[];
}

export interface GroupsGetMany {
  groups: Group[];
}

export interface GroupsGetOne {
  group: Group;
}

export interface TeachersGetMany {
  teachers: Teacher[];
}

export interface TeachersGetOne {
  teacher: Teacher;
}

export interface SciencesGetMany {
  sciences: Science[];
}

export interface SciencesGetOne {
  science: Science;
}

export interface TypesGetMany {
  types: Type[];
}

export interface TypesGetOne {
  type: Type;
}
