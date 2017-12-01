<template>
  <div>
    <p class="title">Stats</p>
    <div class="columns is-centered is-multiline is-mobile">
      <StatsCircle text="W/D/L" :value="`${stats.wins}/${stats.draws}/${stats.loses}`" description="Wins / Draws / Loses" />
      <StatsCircle text="GS/GC" :value="`${stats.scored}/${stats.lost}`" description="Goals scored / Goals conceded" />
      <StatsCircle text="~GM" :value="average.scored" description="Average goals scored per match" />
      <StatsCircle text="PL" :value="stats.played" description="Matches played" />
      <StatsCircle text="WR" :value="`${(100*average.wins).toFixed(1)}%`" description="Win Rate" />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda';
import StatsCircle from './Circle';

const zeroFill = R.pipe(R.map(R.objOf(R.__, 0)), R.mergeAll); // eslint-disable-line
const neededFields = zeroFill([
  'wins', 'loses', 'draws',
  'balance', 'played',
  'scored', 'lost']);

const reduceToStats = (prev, curr) =>
  R.mapObjIndexed((value, key) => value + R.prop(key, curr), prev);
export default {
  props: {
    games: {
      type: Object,
      default: () => ({}),
    },
    userId: String,
    size: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    doneMatches() {
      return [];
    },
    gamesTables() {
      return R.pipe(
        R.values,
        R.filter(R.prop('table')),
        R.pluck('table'),
        R.flatten,
      )(this.games);
    },
    stats() {
      const myBalances = R.filter(R.propEq('id', this.userId), this.gamesTables);
      return (myBalances).reduce(reduceToStats, neededFields);
    },
    average() {
      const total = R.prop('played', this.stats);
      return R.pipe(
        R.omit(['played']),
        R.map(R.pipe(
          R.flip(R.divide)(total),
          n => n.toFixed(2),
          n => (n === 'Infinity' || n === 'NaN' ? 0 : n),
        )),
      )(this.stats);
    },
  },
  components: { StatsCircle },
  name: 'games-stats',
};
</script>
<style lang="scss" scoped>
.box {
  font-size: 200%;
  font-weight: bold;
  font-family: "Montserrat";
}
</style>

