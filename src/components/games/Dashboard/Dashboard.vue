<template>
  <div class="root" v-if="game">
    <Navigation :game="game" @action="handle" :from="from" />
    <Tabs :game="game" @action="handle" />
    <b-modal :active.sync="isJoinActive" :canCancel="true">
      <Join :fullGame="game" @joined="(d) => handle('joined',d)" />
    </b-modal>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import Navigation from './Navigation';
import Join from '../Join';
import Tabs from './Tabs';

export default {
  components: { Navigation, Join, Tabs },
  props: ['gameId'],
  name: 'game-dashboard',
  data() {
    return {
      game: null,
      from: null,
      isJoinActive: false,
    };
  },
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
  methods: {
    handle(action, data) {
      switch (action) {
        case 'left':
          return this.$api('DELETE', `/games/${this.game.id}/competitors`, { uid: this.id })
            .then((game) => { this.game = game; });
        case 'join':
          this.isJoinActive = true;
          return true;
        case 'joined':
          this.isJoinActive = false;
          this.game = data;
          return true;
        default:
          console.log('action', action);
          return true;
      }
    },
    load(gameId) {
      this.$api('GET', `/games/${gameId || this.gameId}`).then((game) => { this.game = game; });
    },
  },
  mounted() {
    this.load();
  },
  beforeRouteUpdate(to, from, next) {
    Object.assign(this.$data, this.$options.data());
    this.load(to.params.gameId);
    next();
  },
};
</script>
<style lang="scss" scoped>
.root {
  padding: 1rem;
}
.level {
  &-right > .tag,
  &-right > .tags,
  &-left > .tag,
  &-left > .tags,
  &-right > .button,
  &-left > .button {
    margin-left: 0.125rem;
    margin-right: 0.125rem;
  }
}

.card {
  background: transparent;
}
</style>
