import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '~/types';

export const state = (): RootState => ({
  lessons: [],
  groups: [],
  teachers: [],
  sciences: [],
  types: [],
});

export const mutations: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {};
