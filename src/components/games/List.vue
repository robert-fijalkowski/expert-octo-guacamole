<template>
  <div class="root">
    <div class="columns is-multiline">
      <div class="column  is-6" v-for="game in games" :key="game.id">
        <div class="notification">
          <router-link :to="`/games/${game.id}`">
            <p class="title">{{game.name}}</p>
          </router-link>
          <p class="subtitle has-text-centered is-size-6">{{game.location}}</p>
          <FocusedTable :game="game" />
          <div class="floating-tag">
            <b-tag type="is-primary">{{game.status}}</b-tag>
            <router-link :to="`/games/join?game=${game.id}`">
              <b-tag type="is-warning" v-if="game.status === 'OPEN' && !isMember(game)">JOIN</b-tag>
            </router-link>
            <span @click="leave(game)" class="is-clickable">
              <b-tag type="is-danger" v-if="isMember(game)">Member of</b-tag>
            </span>
            <b-tag type="is-info">{{game.players.length}} players</b-tag>
            <b-tag type="is-gold" v-if="game.ranked">RANKED</b-tag>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isJoinActive " :canCancel="false" has-modal-card @close="restore">
        <div class="card">
          <Join :gameId="gameId" @joined="whenJoined" />
        </div>
      </b-modal>
    </div>
  </div>
</template> 

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import * as R from 'ramda';

import FocusedTable from './FocusedTable';
import Join from './Join';

export default {
  name: 'games-list',
  data() {
    return { games: [], isJoinActive: false };
  },
  components: { FocusedTable, Join },
  computed: {
    ...mapGetters(['id']),
    gameId() {
      return this.$route.query.game;
    },
  },
  methods: {
    setModalVisible(visible) { this.isJoinActive = visible; },
    humanTime: date => moment(date).fromNow(),
    isMember(game) {
      return R.findIndex(R.propEq('id', this.id), game.players) !== -1;
    },
    replace(game) {
      const updatedGameIndex = R.findIndex(R.propEq('id', game.id), R.values(this.games));
      if (updatedGameIndex !== -1) {
        this.games = R.assoc(updatedGameIndex, game, this.games);
      } else {
        this.load();
      }
    },
    leave(game) {
      this.$api('DELETE', `/games/${game.id}/competitors`, { uid: this.id }).then(this.replace);
    },
    whenJoined(game) {
      this.restore();
      this.replace(game);
    },
    restore() {
      this.$router.push('/games');
    },
    load() {
      this.$api('GET', '/games').then((games) => { this.games = games; });
    },
  },
  created() {
    this.load();
  },
  beforeRouteEnter(to, from, next) {
    const callback = R.cond([
      [R.has('game'), R.always((vm) => { vm.setModalVisible(true); })],
      [R.T, R.always((vm) => { vm.setModalVisible(false); })],
    ])(to.query);
    next(callback);
  },
};
</script>

<style lang="scss" scoped>
.column {
  position: relative;
  .floating-tag {
    position: absolute;
    left: 1rem;
    right: 1rem;
    bottom: 0.5rem;
  }
}
.card {
  background: transparent;
}
</style>
