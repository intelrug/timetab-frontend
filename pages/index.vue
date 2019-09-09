<template>
  <div />
</template>
<script lang="ts">
import '@nuxtjs/axios';
import { Component, Vue } from 'nuxt-property-decorator';

  @Component({
    async fetch({ store }) {
      await store.dispatch('GET_GROUPS');
    },
  })
export default class IndexPage extends Vue {
  beforeCreate() {
    this.$store.commit('GET_SELECTED_GROUP');
    this.$router.replace(`/group/${this.$store.state.selectedGroupId}`);
  }
}
</script>
