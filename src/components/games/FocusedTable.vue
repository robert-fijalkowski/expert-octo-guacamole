<template>
  <div v-if="table && table.length > 0" class="in-table">
    <table class="table is-fullwidth is-stripped">
      <thead>
        <th class="is-narrow">Pos.</th>
        <th>Player</th>
        <th class="is-narrow">PL</th>
        <th class="is-narrow">PTS</th>
      </thead>
      <tr v-for="({id, position, points, played, aClass=''},index) in focusedTable" :key="id" :class="aClass">
        <td>{{position === 'no-position' || (focusedTable[index-1] || {}).position === position ? '' : position+'.'}}</td>
        <td class="player">
          <router-link :to="`/users/${id}`">{{player(id)}}</router-link>
        </td>
        <td class="has-text-centered">{{played}}</td>
        <td class="has-text-centered">{{points}}</td>
      </tr>
    </table>
  </div>
</template> 

<script>
import * as R from 'ramda';

export default {
  name: 'games-list',
  props: {
    players: { type: Array, default: R.always([]) },
    table: { type: Array, default: R.always([]) },
    focus: { type: String, default: 'fake:4' },
    count: { type: Number, default: 3 },
    expanders: { type: Boolean, default: false },
  },
  computed: {
    indexedPlayers() {
      return R.indexBy(R.prop('id'), this.players);
    },
    focusedTable() {
      const players = R.pluck('id', this.players);
      const { length } = this.table;
      const focusingIndex = R.cond([
        [R.equals('top'), R.always(0)],
        [R.flip(R.contains)(players), id => R.findIndex(R.propEq('id', id), this.table)],
        [R.T, R.always(0)],
      ])(this.focus);
      const halfWindow = Math.round((this.count - 1) / 2);
      const focused = R.pipe(
        R.cond([
          [R.equals(0), R.always([0, this.count])],
          [R.equals(length), R.always([length - this.count, length])],
          [R.T, p => [p - halfWindow, p + 1 + halfWindow]],
        ]),
        ([from, to]) => ([Math.max(from, 0), Math.min(to, length)]),
        ([from, to]) => R.pipe(
          R.slice(from, to),
          R.ifElse(
            R.always(to === length || !this.expanders),
            R.identity,
            n => n.concat({ aClass: 'empty-row', position: 'no-position', id: `${length - to} players more` }),
          ),
          R.ifElse(
            R.always(from === 0 || !this.expanders),
            R.identity,
            n => [{ aClass: 'empty-row', position: 'no-position', id: `${from + 1} players more` }].concat(n),
          ),
        ),
      )(focusingIndex);
      return focused(this.table);
    },
  },
  methods: {
    player(id) {
      const { meta = {}, name } = this.indexedPlayers[id] || {};
      return name || meta.name || meta.login || id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
$odd: lighten($primary, 3%);
$even: lighten($primary, 6%);
$border: lighten($even, 15%);
.in-table {
  padding: 0.5rem;
}
.table {
  color: lighten($primary-invert, 10%);
  td {
    border-bottom: 0;
    border-top: 1px solid $border;
  }
  th {
    border: 0;
  }
  thead {
    background-color: $primary;
    td,
    th {
      color: $primary-invert;
    }
  }
  tr {
    &.empty-row {
      font-style: italic;
    }
    &:nth-child(2n) {
      background-color: $even;
    }
    &:nth-child(2n + 1) {
      background-color: $odd;
    }
  }
}
</style>
