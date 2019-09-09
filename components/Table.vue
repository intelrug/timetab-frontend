<template>
  <div class="table">
    <div class="table__weekday">
      {{ weekday }}
    </div>
    <table class="timetable">
      <tbody>
        <tr class="timetable__header">
          <th class="timetable__cell timetable__time">
            Время
          </th>
          <th class="timetable__cell timetable__science">
            Предмет
          </th>
          <th class="timetable__cell timetable__auditory">
            Аудит.
          </th>
          <th class="timetable__cell timetable__type">
            Тип
          </th>
        </tr>
        <tr
          v-for="lesson in lessons"
          :key="lesson.id"
          class="timetable__item"
          :style="bgc(lesson)"
        >
          <td
            class="timetable__cell timetable__time"
            v-html="time(lesson.number, lesson.count)"
          />
          <td class="timetable__cell timetable__science">
            <div class="timetable__science-notes">
              <div class="timetable__science-note">
                {{ notes(lesson) }}
              </div>
            </div>
            <div class="timetable__science-name">
              {{ science(lesson.science_id).name }}
            </div>
            <div class="timetable__science-teacher">
              (<a :href="teacher(lesson.teacher_id).link">{{ teacher(lesson.teacher_id).name }}</a>)
            </div>
            <div class="timetable__science-info">
              <div class="timetable__science-type">
                {{ type(lesson.type_id).name }}
              </div>
              <div class="timetable__science-auditory">
                {{ lesson.auditory }}
              </div>
            </div>
          </td>
          <td class="timetable__cell timetable__auditory">
            {{ lesson.auditory }}
          </td>
          <td class="timetable__cell timetable__type">
            {{ type(lesson.type_id).name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator';
import { PropSync } from 'vue-property-decorator';
import { Lesson } from '~/types';

@Component({})
export default class Table extends Vue {
  @Getter teacher!: Function;
  @Getter science!: Function;
  @Getter type!: Function;
  @PropSync('day', { required: true }) daySynced!: number;
  @PropSync('week', { required: true }) weekSynced!: number;

  get lessons() {
    return this.$store.getters.day(this.weekSynced, this.daySynced);
  }

  get weekday() {
    const days: string[] = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    return days[this.daySynced];
  }

  get time() {
    const times: string[][] = [
      ['8:30', '10:00'],
      ['10:10', '11:40'],
      ['11:50', '13:20'],
      ['13:40', '15:10'],
      ['15:20', '16:50'],
      ['17:00', '18:30'],
      ['18:35', '20:00'],
      ['20:05', '21:30'],
    ];

    return (number: number, count: number = 1): string => {
      let time = `${times[number - 1][0]} - ${times[number + count - 2][1]}`;
      if (count > 1) {
        time += `<br>(${count} пары)`;
      }
      return time;
    };
  }

  get bgc() {
    return (lesson: Lesson) => {
      if (!lesson.subgroup) return 'background: white';
      if (lesson.subgroup === 1) return 'background: salmon';
      return 'background: cornflowerblue';
    };
  }

  get notes() {
    return (lesson: Lesson) => {
      let text = '';
      if (lesson.subgroup) text += `${lesson.subgroup} п/г`;
      if (lesson.notes) text += ` ${lesson.notes}`;
      return text;
    };
  }
}
</script>
