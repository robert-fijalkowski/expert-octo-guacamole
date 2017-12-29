<template>
  <div>
    <Properties :game="game" @submit='saveProperties' actionName="Update" title="Update properties" class="notification is-primary" />
    <div class="notification is-primary">
      <p class="title">Recreate Table</p>
      <a class="button is-info" @click="recreateTable">Recreate a table</a>

    </div>
  </div>
</template>
<script>
import * as R from 'ramda';
import { mapGetters } from 'vuex';
import Properties from '../Properties';

export default {
  components: { Properties },
  props: ['game'],
  name: 'game-settings',
  computed: {
    ...mapGetters(['id', 'isAdmin']),
  },
  methods: {
    saveProperties(properties) {
      this.$api('PUT', `/games/${this.game.id}`, { id: this.game.id, ...properties })
        .then((game) => {
          this.$toast.open({ type: 'is-success', message: 'Properties updated' });
          this.$emit('updated', game);
        }).catch((err) => {
          this.$toast.open({ type: 'is-danger', message: err.response.text });
        });
    },
    recreateTable() {
      this.$api('POST', `/games/${this.game.id}/table`).then((game) => {
        this.$toast.open({ type: 'is-success', message: 'Table recreated' });
        this.$emit('updated', game);
      }).catch((err) => {
        this.$toast.open({ type: 'is-danger', message: err.response.text });
      });
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
.promoted {
  margin-left: 1rem;
}
</style>
