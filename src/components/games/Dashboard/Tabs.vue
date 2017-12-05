<template>
  <div class="notification">
    <b-tabs>
      <b-tab-item label="Table" v-if="game.table" icon="list-ol">
        {{game.table}}
      </b-tab-item>
      <b-tab-item label="Competitors" icon="users">
        {{game.competitors}}
      </b-tab-item>
      <b-tab-item label="Schedule" v-if="game.status !== 'OPEN'" icon="calendar">
        {{game.schedule}}
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';

export default {
  props: ['game'],
  name: 'game-tabs',
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
};
</script>
<style lang="scss">

</style>
