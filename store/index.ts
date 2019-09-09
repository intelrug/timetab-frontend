/* eslint-disable no-shadow */
import { MutationTree, ActionTree, GetterTree } from 'vuex';
import {
  Group, GroupsGetMany,
  GroupsGetOne,
  Lesson,
  LessonsGetMany, LessonsGetOne,
  RootState,
  Science, SciencesGetMany, SciencesGetOne,
  Teacher,
  TeachersGetMany,
  TeachersGetOne,
  Type, TypesGetMany, TypesGetOne,
} from '~/types';
import Cookies from 'js-cookie';

export const state = (): RootState => ({
  lessons: [],
  groups: [],
  teachers: [],
  sciences: [],
  types: [],
  menuOpened: false,
  selectedGroupId: 2,
});

export const mutations: MutationTree<RootState> = {
  SET_GROUPS(state, groups: Group[]): void {
    state.groups = groups;
  },

  SET_GROUP(state, group: Group): void {
    if (!group) return;
    const idx = state.groups.findIndex((g): boolean => g.id === group.id);
    if (idx === -1) return;
    state.groups[idx] = group;
  },

  SET_TEACHERS(state, teachers: Teacher[]): void {
    state.teachers = teachers;
  },

  SET_TEACHER(state, teacher: Teacher): void {
    if (!teacher) return;
    const idx = state.teachers.findIndex((t): boolean => t.id === teacher.id);
    if (idx === -1) return;
    state.teachers[idx] = teacher;
  },

  SET_SCIENCES(state, sciences: Science[]): void {
    state.sciences = sciences;
  },

  SET_SCIENCE(state, science: Science): void {
    if (!science) return;
    const idx = state.sciences.findIndex((s): boolean => s.id === science.id);
    if (idx === -1) return;
    state.sciences[idx] = science;
  },

  SET_TYPES(state, types: Type[]): void {
    state.types = types;
  },

  SET_TYPE(state, type: Type): void {
    if (!type) return;
    const idx = state.types.findIndex((t): boolean => t.id === type.id);
    if (idx === -1) return;
    state.types[idx] = type;
  },

  SET_LESSONS(state, lessons: Lesson[]): void {
    state.lessons = lessons;
  },

  SET_LESSON(state, lesson: Lesson): void {
    if (!lesson) return;
    const idx = state.lessons.findIndex((l): boolean => l.id === lesson.id);
    if (idx === -1) return;
    state.lessons[idx] = lesson;
  },

  TOGGLE_MENU(state): void {
    state.menuOpened = !state.menuOpened;
  },

  OPEN_MENU(state): void {
    state.menuOpened = true;
  },

  CLOSE_MENU(state): void {
    state.menuOpened = false;
  },

  SELECT_GROUP(state, id): void {
    state.selectedGroupId = id;
    Cookies.set('selectedGroup', String(id), { expires: 3650 });
  },

  GET_SELECTED_GROUP(state): void {
    const selectedGroupId = Cookies.get('selectedGroup') || '';
    if (/\d+/.test(selectedGroupId)) {
      state.selectedGroupId = parseInt(selectedGroupId, 10);
    } else {
      state.selectedGroupId = state.groups[0] ? state.groups[0].id : 1;
      Cookies.set('selectedGroup', String(state.selectedGroupId), { expires: 3650 });
    }
  },
};

export const getters: GetterTree<RootState, RootState> = {
  lessons(state): Lesson[] {
    return state.lessons.filter(l => l.group_id === state.selectedGroupId);
  },

  firstWeek(state): number[] {
    return state.lessons.reduce((acc: number[], lesson: Lesson): number[] => {
      if (lesson.week === 1 && lesson.group_id === state.selectedGroupId) {
        const idx = acc.indexOf(lesson.day);
        if (idx === -1) acc.push(lesson.day);
      }
      return acc;
    }, []);
  },

  secondWeek(state): number[] {
    return state.lessons.reduce((acc: number[], lesson: Lesson): number[] => {
      if (lesson.week === 2 && lesson.group_id === state.selectedGroupId) {
        const idx = acc.indexOf(lesson.day);
        if (idx === -1) acc.push(lesson.day);
      }
      return acc;
    }, []);
  },

  day(state): Function {
    return (week: number, day: number): Lesson[] => state.lessons.filter(
      (l): boolean => l.week === week && l.day === day && l.group_id === state.selectedGroupId,
    );
  },

  group(state): Function {
    return (id: number): Group => {
      const idx = state.groups.findIndex((g): boolean => g.id === id);
      if (idx !== -1) {
        return state.groups[idx];
      }
      return {
        id: 0,
        name: '',
      };
    };
  },

  selectedGroup(state): Group {
    const idx = state.groups.findIndex((g): boolean => g.id === state.selectedGroupId);
    if (idx !== -1) {
      return state.groups[idx];
    }
    return {
      id: 0,
      name: '',
    };
  },

  teacher(state): Function {
    return (id: number): Teacher => {
      const idx = state.teachers.findIndex((t): boolean => t.id === id);
      if (idx !== -1) {
        return state.teachers[idx];
      }
      return {
        id: 0,
        name: '',
        link: '',
      };
    };
  },

  science(state): Function {
    return (id: number): Science => {
      const idx = state.sciences.findIndex((s): boolean => s.id === id);
      if (idx !== -1) {
        return state.sciences[idx];
      }
      return {
        id: 0,
        name: '',
      };
    };
  },

  type(state): Function {
    return (id: number): Type => {
      const idx = state.types.findIndex((t): boolean => t.id === id);
      if (idx !== -1) {
        return state.types[idx];
      }
      return {
        id: 0,
        name: '',
      };
    };
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async GET_LESSONS({ commit }): Promise<void> {
    const res: LessonsGetMany = await this.$axios.$get('https://timetab.intelrug.ru/api/lessons');
    commit('SET_GROUPS', res.groups);
    commit('SET_TEACHERS', res.teachers);
    commit('SET_SCIENCES', res.sciences);
    commit('SET_TYPES', res.types);
    commit('SET_LESSONS', res.lessons);
  },

  async GET_LESSON({ commit }, id): Promise<void> {
    const res: LessonsGetOne = await this.$axios.$get(`https://timetab.intelrug.ru/api/lessons/${id}`);
    commit('SET_GROUPS', res.groups);
    commit('SET_TEACHERS', res.teachers);
    commit('SET_SCIENCES', res.sciences);
    commit('SET_TYPES', res.types);
    commit('SET_LESSON', res.lesson);
  },

  async GET_GROUPS({ commit }): Promise<void> {
    const res: GroupsGetMany = await this.$axios.$get('https://timetab.intelrug.ru/api/groups');
    commit('SET_GROUPS', res.groups);
  },

  async GET_GROUP({ commit }, id): Promise<void> {
    const res: GroupsGetOne = await this.$axios.$get(`https://timetab.intelrug.ru/api/groups/${id}`);
    commit('SET_GROUP', res.group);
  },

  async GET_TEACHERS({ commit }): Promise<void> {
    const res: TeachersGetMany = await this.$axios.$get('https://timetab.intelrug.ru/api/teachers');
    commit('SET_TEACHERS', res.teachers);
  },

  async GET_TEACHER({ commit }, id): Promise<void> {
    const res: TeachersGetOne = await this.$axios.$get(`https://timetab.intelrug.ru/api/teachers/${id}`);
    commit('SET_TEACHER', res.teacher);
  },

  async GET_SCIENCES({ commit }): Promise<void> {
    const res: SciencesGetMany = await this.$axios.$get('https://timetab.intelrug.ru/api/sciences');
    commit('SET_SCIENCES', res.sciences);
  },

  async GET_SCIENCE({ commit }, id): Promise<void> {
    const res: SciencesGetOne = await this.$axios.$get(`https://timetab.intelrug.ru/api/sciences/${id}`);
    commit('SET_SCIENCE', res.science);
  },

  async GET_TYPES({ commit }): Promise<void> {
    const res: TypesGetMany = await this.$axios.$get('https://timetab.intelrug.ru/api/types');
    commit('SET_TYPES', res.types);
  },

  async GET_TYPE({ commit }, id): Promise<void> {
    const res: TypesGetOne = await this.$axios.$get(`https://timetab.intelrug.ru/api/types/${id}`);
    commit('SET_TYPE', res.type);
  },
};
