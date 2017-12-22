<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="{club, user} in game.competitors" :key="user.id">
        <div class="notification is-primary is-flex">
          <ClubEmblem :club="club.id" :size="isMobile ? 75 : 100" />
          <div class="is-expanded">
            <div class="title is-size-6">{{user.name}}</div>
            <div class="subtitle is-size-7">
              <div>{{club.name}}</div>
              <Stars :stars="club.stars" small class="club-stars" />
            </div>
            <a class="button is-primary-1 is-small" @click="$router.push(`/users/${user.id}`)">
              <b-icon icon="dashboard"></b-icon>
              <span>Dashboard</span>
            </a>
            <a class="button is-danger is-small" @click="remove(user)">
              <b-icon icon="remove"></b-icon>
              <span>Remove</span>
            </a>
            <a class="button is-warning is-small" v-if="game.status === 'OPEN' && (isAdmin || user.id === id)" @click="change({user,club})">
              <b-icon icon="refresh"></b-icon>
              <span>Change</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="toChange" has-modal-card :canCancel="true">
      <Join :fullGame="game" @joined="changed" :id="uid" :change="club" />
    </b-modal>
  </div>
</template>
<script>

import * as R from 'ramda';
import Stars from '@/components/clubs/Stars';
import { mapGetters } from 'vuex';
import ClubEmblem from '@/components/clubs/ClubEmblem';
import Join from '@/components/games/Join';

export default {
  components: { ClubEmblem, Stars, Join },
  props: ['game'],
  name: 'game-competitors',
  data() {
    return {
      toChange: false,
      uid: null,
      club: null,
    };
  },
  computed: {
    ...mapGetters(['id', 'isAdmin', 'isMobile']),
  },
  methods: {
    change({ club, user }) {
      this.uid = user.id;
      this.club = club;
      this.toChange = true;
    },
    changed(game){
      this.$emit('updated', game);
      this.toChange=false;
    },
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
<style lang="scss" scoped>
@import "../../../style/vars.scss";
.club-stars {
  margin-top: 0.25rem;
}
.is-expanded {
  flex-grow: 1;
}
</style>
