<template>
  <div v-if="isLogged">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <div class="tile is-child box notification is-primary">
          <Stats :games="myProfile.games" :userId="id" />
          <!-- statystyki ze wszystkich  -->
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box notification is-primary ">
          <Matches title="Last Matches" :contests="myProfile.contests" completed searchable :userId="id" />
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box notification is-primary">
          <Matches title="Upcoming" :contests="myProfile.contests" :userId="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameForm from './GameForm';
import Matches from './Matches';
import Stats from './stats/Stats';

export default {
  name: 'dashboard',
  components: {
    GameForm, Matches, Stats,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username', 'id', 'myProfile']),
  },
};
</script>

<style lang="scss">
.club-logo {
  width: 100px;
  height: 100px;
}
</style>
