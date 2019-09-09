<template>
  <ul class="left-menu">
    <li class="left-menu__item">
      <select
        id="group"
        v-model="selectedGroup"
        name="group"
        class="left-menu__select"
      >
        <option
          v-for="group in groups"
          :key="group.id"
          :value="group.id"
        >
          {{ group.name }}
        </option>
      </select>
    </li>
    <li class="left-menu__item">
      <router-link
        :to="{ name: 'group-group', params: { group: $route.params.group }}"
        @click.native="CLOSE_MENU"
      >
        Ближайшее
      </router-link>
    </li>
    <li class="left-menu__item">
      <router-link
        :to="{ name: 'group-group-week-week', params: { group: $route.params.group, week: 1 }}"
        @click.native="CLOSE_MENU"
      >
        Первая неделя
      </router-link>
    </li>
    <li class="left-menu__item">
      <router-link
        :to="{ name: 'group-group-week-week', params: { group: $route.params.group, week: 2 }}"
        @click.native="CLOSE_MENU"
      >
        Вторая неделя
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  Component, Mutation, State, Vue, Watch,
} from 'nuxt-property-decorator';
import { Group } from '~/types';

@Component({})
export default class Menu extends Vue {
  @State groups!: Group[];
  @State selectedGroupId!: number;
  @Mutation SELECT_GROUP!: Function;
  @Mutation CLOSE_MENU!: Function;
  selectedGroup: number = -1;

  @Watch('selectedGroup')
  onGroupSelect(val: number, oldVal: number) {
    if (oldVal !== -1) {
      this.CLOSE_MENU();
      this.SELECT_GROUP(val);
      this.$route.params.group = String(val);
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
      });
    }
  }

  created() {
    this.selectedGroup = this.selectedGroupId;
  }
}
</script>
