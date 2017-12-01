<template>
  <div v-if="isLogged">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical is-6">
        <div class="tile is-child box notification is-primary ">
          <GameForm :contests="myProfile.contests" :userId="id" />
        </div>
        <div class="tile is-child box notification is-primary ">
          <Stats :games="myProfile.games" :userId="id" />
          <!-- statystyki ze wszystkich  -->
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box notification is-primary ">
          <Matches title="Last Matches" :contests="myProfile.contests" completed searchable :userId="id" />
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <div class="tile is-child box notification is-primary ">
          <Matches title="Upcoming" :contests="myProfile.contests" :userId="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameForm from './GameForm';
import Matches from './Matches';
import Stats from './stats/Stats';

export default {
  name: 'dashboard',
  components: { GameForm, Matches, Stats },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(['setMyProfile']),
  },
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username', 'id', 'myProfile']),
  },
  watch: {
    isLogged(isLoggedNow) {
      if (isLoggedNow) {
        this.$api('GET', '/users/myprofile').then(this.setMyProfile);
      }
    },
  },
};
</script>

<style lang="scss">
.title {
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat";
  font-size: 140%;
}
</style>
