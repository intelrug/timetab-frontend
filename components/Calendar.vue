<template>
  <div class="calendar">
    <div class="calendar-box">
      <p class="calendar-number">
        {{ today.date }}
      </p>
      <p class="calendar-text">
        {{ today.month }}
      </p>
    </div>
    <div class="calendar-box">
      <p class="calendar-number">
        {{ today.week }}
      </p>
      <p class="calendar-text">
        Неделя
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Calendar extends Vue {
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

  // get weekNumber() {
  //   const d = new Date();
  //   const dayNum = d.getDay() || 7;
  //   d.setDate(d.getDay() + 4 - dayNum);
  //   const yearStart = new Date(d.getFullYear(), 0, 1);
  //   const number = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  //   console.log(number);
  //   return number % 2 === 0 ? 2 : 1;
  // }

  get weekNumber() {
    let d = new Date();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const number = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return number % 2 ? 2 : 1;
  }
}
</script>
