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
          <div class="calendar">
            <div class="calendar-box single">
              <p class="calendar-text">
                Расписание на {{ $route.params.week }}&nbsp;неделю
              </p>
            </div>
          </div>
        </div>
        <div class="page__timetable">
          <Table
            v-for="day in days"
            :key="day"
            :week="Number($route.params.week)"
            :day="day"
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
    return /^\d+$/.test(params.group) && (Number(params.week) === 1 || Number(params.week) === 2);
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
  @Getter firstWeek!: number[];
  @Getter secondWeek!: number[];
  @Mutation OPEN_MENU!: Function;
  @Mutation CLOSE_MENU!: Function;

  get days() {
    if (Number(this.$route.params.week) === 1) {
      return this.firstWeek;
    }
    return this.secondWeek;
  }

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
    const d = new Date();
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const number = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return number % 2 === 0 ? 2 : 1;
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
