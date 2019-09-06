import {
  Group, Lesson, Science, Teacher, Type,
} from '~/types/index';

export interface RootState {
  lessons: Lesson[];
  groups: Group[];
  teachers: Teacher[];
  sciences: Science[];
  types: Type[];
}
