<template>
  <div v-if="isLogged">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-6">
        <div class="tile is-child box notification is-info ">
          <GameForm :contests="myProfile.contests" />
        </div>
      </div>
      <div class="tile is-parent is-6">
        <div class="tile is-child box notification is-info ">
          <GameForm :contests="myProfile.contests" />
        </div>
      </div>
    </div>
    <span>{{myProfile}}</span>
    <span>{{lastEvents}}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameForm from './GameForm';

export default {
  name: 'dashboard',
  components: { GameForm },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username']),
  },
  asyncComputed: {
    myProfile() {
      return this.isLogged ? this.$api('GET', '/users/myprofile', { test: 1 }) : {};
    },
    lastEvents() {
      return this.isLogged ? this.$api('GET', '/events/users/') : [];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
