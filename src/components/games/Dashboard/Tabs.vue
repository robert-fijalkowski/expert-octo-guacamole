<template>
  <div class="notification">
    <b-tabs>
      <b-tab-item label="Table" v-if="game.table" icon="list-ol">
        <GameTable :game="game" v-if="!isMobile" />
        <FocusedTable :game="game" v-else :count="game.table.length" :focus="id" />
      </b-tab-item>
      <b-tab-item label="Competitors" icon="users">
        <Competitors :game="game" @updated="(game) => $emit('updated',game)" />
      </b-tab-item>
      <b-tab-item label="Schedule" v-if="game.status !== 'OPEN'" icon="calendar">
        <Schedule :game="game" @updated="(game) => $emit('updated',game)" />
      </b-tab-item>
      <b-tab-item label="Settings" v-if="isAdmin" icon="cog">
        Technical Endpoint for future
      </b-tab-item>
    </b-tabs>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import Schedule from './Schedule';
import GameTable from './Table';
import Competitors from './Competitors';
import FocusedTable from '../FocusedTable';

export default {
  components: {
    Schedule, GameTable, FocusedTable, Competitors,
  },
  props: ['game', 'index'],
  name: 'game-tabs',
  computed: {
    ...mapGetters(['id', 'isAdmin', 'isMobile']),
  },
};
</script>
