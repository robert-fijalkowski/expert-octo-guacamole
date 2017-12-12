<template>
  <div>
    <b-table :data="game.table" striped :row-class="rowClass">
      <template slot-scope="props">
        <b-table-column label="P" width="1" numeric>
          {{ props.row.position }}
        </b-table-column>
        <b-table-column label="First Name"> {{user(props.row.id).name}} </b-table-column>
        <b-table-column label="Club"> {{club(props.row.id).name}} </b-table-column>
        <b-table-column label="PL" width=1 centered>{{props.row.played}}</b-table-column>
        <b-table-column label="W" class="is-hidden-mobile" width=1 centered numeric>{{props.row.wins}}</b-table-column>
        <b-table-column label="D" class="is-hidden-mobile" width=1 centered numeric>{{props.row.draws}}</b-table-column>
        <b-table-column label="L" class="is-hidden-mobile" width=1 centered numeric>{{props.row.loses}}</b-table-column>
        <b-table-column label="GS-GC" class="is-hidden-mobile" width=1 centered numeric>{{props.row.scored}}-{{props.row.lost}}</b-table-column>
        <b-table-column label="B" class="is-hidden-mobile" width=1 centered numeric>{{(props.row.balance > 0 ? '+'+props.row.balance : props.row.balance)}}</b-table-column>
        <b-table-column label="PTS" width=1 centered numeric>{{props.row.points}}</b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';

export default {
  props: ['game'],
  name: 'game-table',
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
  methods: {
    rowClass(row, index) {
      return R.cond([
        [R.pathEq(['row', 'id'], this.id), R.always('me')],
        [R.propEq('parity', 0), R.always('even')],
        [R.T, R.always('odd')],
      ])({ row, parity: index % 2 });
    },
    club(uid) {
      return this.game.competitors[uid].club;
    },
    user(uid) {
      return this.game.competitors[uid].user;
    },
  },
};
</script>
<style lang="scss">
@import "../../../style/vars.scss";

.odd {
  background-color: $odd !important;
}

.even {
  background-color: $even !important;
}
.me {
  background-color: $primary-2 !important;
}
</style>
