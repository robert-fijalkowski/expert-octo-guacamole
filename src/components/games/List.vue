<template>
  <div class="columns is-multiline">
    <div class="column  is-6" v-for="game in games" :key="game.id">
      <div class="notification">
        <router-link :to="`/games/${game.id}`">
          <p class="title">{{game.name}}</p>
        </router-link>
        <p class="subtitle has-text-centered is-size-6">{{game.location}}</p>
        <div class="floating-tag">
          <b-tag type="is-primary">{{game.status}}</b-tag>
          <b-tag type="is-info">{{game.players.length}} players</b-tag>
        </div>
        <FocusedTable :players="game.players" :table="game.table" />
      </div>
    </div>
  </div>
</template> 

<script>
import moment from 'moment';
import FocusedTable from './FocusedTable';

export default {
  name: 'games-list',
  data() {
    return { games: [] };
  },
  components: { FocusedTable },
  computed: {

  },
  methods: {
    humanTime: date => moment(date).fromNow(),
  },
  created() {
    this.$api('GET', '/games').then((games) => { this.games = games; });
  },
};
</script>

<style lang="scss" scoped>
.columns {
  padding: 1rem;
}
.column {
  position: relative;
  .floating-tag {
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    bottom: 1rem;
  }
}
</style>
