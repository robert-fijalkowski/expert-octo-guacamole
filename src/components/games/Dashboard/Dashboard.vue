<template>
  <div class="root" v-if="game">
    <Navigation :game="game" @action="handle" :from="from" />
    <Tabs :game="game" @action="handle" @updated="(d) => handle('updated',d)" />
    <b-modal :active.sync="modals.join" has-modal-card :canCancel="true">
      <Join :fullGame="game" @joined="(d) => handle('joined', d)" />
    </b-modal>
    <b-modal :active.sync="modals.start" has-modal-card :canCancel="true">
      <Start :game="game" @started="(d) => handle('started', d)" />
    </b-modal>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import Navigation from './Navigation';
import Join from '../Join';
import Start from '../Start';
import Tabs from './Tabs';

export default {
  components: {
    Navigation, Join, Tabs, Start,
  },
  props: ['gameId'],
  name: 'game-dashboard',
  data() {
    return {
      game: null,
      from: null,
      modals: {
        start: false,
        join: false,
      },
    };
  },
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
  methods: {
    handle(action, data) {
      if (data) {
        this.game = data;
      }
      switch (action) {
        case 'left':
          return this.$api('DELETE', `/games/${this.game.id}/competitors`, { uid: this.id })
            .then((game) => { this.game = game; });
        case 'join':
          this.modals.join = true;
          return true;
        case 'start':
          this.modals.start = true;
          return true;
        case 'joined':
          this.modals.join = false;
          return true;
        case 'updated':
          return true;
        case 'started':
          this.modals.join = false;
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
