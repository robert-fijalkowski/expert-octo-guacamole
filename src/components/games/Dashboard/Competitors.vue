<template>
  <div>
    <div class="columns is-multiline">
      <div class=" column is-4" v-for="{club, user} in game.competitors" :key="user.id">
        <div class="notification is-primary is-flex" :class="promotion[user.id].length > 0 ? 'player-has-promotion' : ''">
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
            <a class="button is-danger is-small" v-if="modifable(user)" @click="remove(user)">
              <b-icon icon="remove"></b-icon>
              <span>Remove</span>
            </a>
            <a class="button is-warning is-small" v-if="modifable(user)" @click="change({user,club})">
              <b-icon icon="refresh"></b-icon>
              <span>Change</span>
            </a>
          </div>
          <div class="promoted">
            <b-taglist attached v-for="promo in promotion[user.id]" :key="promo.id">
              <b-tag type="is-dark">
                <b-icon icon="star" />&nbsp;{{promo.name}}
              </b-tag>
            </b-taglist>
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
    isOpen() {
      return this.game.status === 'OPEN';
    },
    promotion() {
      return R.mapObjIndexed(R.pipe((v, k) => this.promoted(k), R.values), this.game.competitors);
    },
  },
  methods: {
    modifable(user) {
      return this.isOpen && (this.isAdmin || user.id === this.id);
    },
    change({ club, user }) {
      this.uid = user.id;
      this.club = club;
      this.toChange = true;
    },
    promoted(uid) {
      return (R.filter(R.pipe(R.prop('promoted'), R.contains(uid)), this.game.continueIn || []));
    },
    changed(game) {
      this.$emit('updated', game);
      this.toChange = false;
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
.player-has-promotion {
  position: relative;
  padding-bottom: 2.25rem;
  .promoted {
    position: absolute;
    left: 0.25rem;
    bottom: 0.25rem;
    margin: 0;
  }
}
</style>
