<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="{club, user} in game.competitors" :key="user.id">
        <div class="notification is-primary is-flex">
          <ClubEmblem :club="club.id" :size="isMobile ? 75 : 100" />
          <div class="is-expanded">
            <div class="title is-size-6">{{user.name}}</div>
            <div class="subtitle is-size-7">{{club.name}}</div>
            <a class="button is-primary-1 is-small" @click="$router.push(`/users/${user.id}`)">
              <b-icon icon="dashboard"></b-icon>
              <span>Dashboard</span>
            </a>
            <a class="button is-danger is-small" @click="remove(user)">
              <b-icon icon="remove"></b-icon>
              <span>Remove</span>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import * as R from 'ramda';
import { mapGetters } from 'vuex';
import ClubEmblem from '../../clubs/ClubEmblem';

export default {
  components: { ClubEmblem },
  props: ['game'],
  name: 'game-table',
  computed: {
    ...mapGetters(['id', 'isAdmin', 'isMobile']),
  },
  methods: {
    remove({ name, id }) {
      this.$api('DELETE', `/games/${this.game.id}/competitors`, { uid: id })
        .then((game) => {
          this.$toast.open({ type: 'is-success', message: `Player ${name} removed` });
          this.$emit('updated', game);
        })
        .catch((err) => {
          this.$toast.open({ type: 'is-danger', message: err.response.text });
        });
    },
  },
};
</script>
<style lang="scss">
@import "../../../style/vars.scss";

.is-expanded {
  flex-grow: 1;
}
</style>
