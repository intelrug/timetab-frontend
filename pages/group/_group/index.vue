<template>
  <div
    v-touch:swipe.left="CLOSE_MENU"
    v-touch:swipe.right="OPEN_MENU"
    class="page"
  >
    <Header />
    <div class="page__content">
      <transition name="menu">
        <div
          v-show="menuOpened"
          class="page__left-menu"
          :class="{ open: menuOpened }"
        >
          <Menu />
        </div>
      </transition>
      <div class="container">
        <div class="page__calendar">
          <Calendar />
        </div>
        <div class="page__timetable">
          <Table
            v-for="day in nearestTwoDays"
            :key="day.day"
            :week="day.week"
            :day="day.day"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@nuxtjs/axios';
import {
  Component, Getter, Mutation, State, Vue,
} from 'nuxt-property-decorator';
import { Lesson } from '~/types';
import Header from '~/components/Header.vue';
import Calendar from '~/components/Calendar.vue';
import Table from '~/components/Table.vue';
import Menu from '~/components/Menu.vue';

@Component({
  components: {
    Table, Calendar, Header, Menu,
  },
  validate({ params }) {
    return /^\d+$/.test(params.group);
  },
  async fetch({ store, params, error }) {
    await store.dispatch('GET_LESSONS');
    await store.dispatch('GET_GROUPS');
    store.commit('SELECT_GROUP', params.group ? Number(params.group) : 1);
    if (store.getters.selectedGroup.id === 0) {
      error({ statusCode: 404, message: `Group with this id \`${params.group}\` does not exist` });
    }
  },
  head() {
    return {
      titleTemplate: 'Расписание %s',
      title: this.$store.getters.selectedGroup.name,
    };
  },
})
export default class IndexPage extends Vue {
  @State menuOpened!: boolean;
  @Getter lessons!: Lesson[];
  @Mutation OPEN_MENU!: Function;
  @Mutation CLOSE_MENU!: Function;

  get nearestTwoDays() {
    const days: {
      day: number;
      week: number;
    }[] = [];
    let { day } = this.today;
    let { week } = this.today;

    do {
      const idx = this.lessons.findIndex((l): boolean => l.week === week && l.day === day);
      if (idx !== -1) days.push({ day, week });
      if (day > 6) {
        day = 1;
        week = week === 1 ? 2 : 1;
      } else {
        day += 1;
      }
    } while (!(day === this.today.day && week === this.today.week) && days.length !== 2);

    return days;
  }

  get weekNumber() {
    let d = new Date();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const number = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return number % 2 ? 2 : 1;
  }

  get today() {
    const months: string[] = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];

    const d = new Date();

    return {
      day: d.getDay() === 0 ? 7 : d.getDay(),
      date: d.getDate(),
      month: months[d.getMonth()],
      week: this.weekNumber,
    };
  }
}
</script>

<style>
  .menu-enter-active, .menu-leave-active {
    transition: opacity .2s;
  }
  .menu-enter, .menu-leave-to {
    opacity: 0;
  }
</style>
