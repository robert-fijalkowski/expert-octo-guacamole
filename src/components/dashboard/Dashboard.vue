<template>
  <div v-if="isLogged" class="root">
    <div class="tile is-ancestor">
      <div class="tile is-parent" :class="focusedGame ? 'is-6' : 'is-12'">
        <div class="tile is-child box notification is-primary">
          <Stats :games="myProfile.games" :userId="id" /> </div>
      </div>
      <div class="tile is-parent is-6" v-if="focusedGame">
        <div class="tile is-child box notification is-primary">
          <FocusedTable title="Current Game" expanders :focus="id" :game="focusedGame" />
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-6 is-parent">
        <div class="tile is-child box notification is-primary ">
          <Matches title="Last Matches" :contests="myProfile.contests" completed searchable :userId="id" />
        </div>
      </div>
      <div class="tile is-6 is-parent">
        <div class="tile is-child box notification is-primary">
          <Matches title="Upcoming" :contests="myProfile.contests" :userId="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as R from 'ramda';
import FocusedTable from '../games/FocusedTable';
import Matches from './Matches';
import Stats from './stats/Stats';

export default {
  name: 'dashboard',
  components: { Matches, Stats, FocusedTable },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username', 'id', 'myProfile']),
    focusedGame() {
      return R.pipe(
        R.filter(R.both(
          R.propEq('status', 'ONGOING'),
          R.has('table'),
        )),
        R.values,
        R.head,
      )(this.myProfile.games || []);
    },
  },
};
</script>

<style lang="scss">
.club-logo {
  width: 100px;
  height: 100px;
}
</style>
