<template>
  <div class="notification">
    <b-tabs>
      <b-tab-item label="Table" v-if="game.table" icon="list-ol">
        <GameTable :game="game" />
      </b-tab-item>
      <b-tab-item label="Competitors" icon="users">
        {{game.competitors}}
      </b-tab-item>
      <b-tab-item label="Schedule" v-if="game.status !== 'OPEN'" icon="calendar">
        <Schedule :game="game" />
      </b-tab-item>
      <b-tab-item label="Settings" v-if="isAdmin" icon="cog">
        <Schedule :game="game" />
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import Schedule from './Schedule';
import GameTable from './Table';

export default {
  components: { Schedule, GameTable },
  props: ['game'],
  name: 'game-tabs',
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
};
</script>
<style lang="scss">

</style>
