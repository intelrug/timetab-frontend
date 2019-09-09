<template>
  <div class="page__header">
    <div class="page__header-menu">
      <svg
        class="page__header-icon"
        @click="TOGGLE_MENU"
      >
        <use xlink:href="/images/icons/menu.svg#icon_menu" />
      </svg>
    </div>
    <div class="page__header-title">
      Расписание {{ selectedGroup.name }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Getter, Mutation, Vue,
} from 'nuxt-property-decorator';
import { Group } from '~/types';

@Component({})
export default class Header extends Vue {
  @Mutation TOGGLE_MENU!: Function;
  @Getter selectedGroup!: Group;
}
</script>
