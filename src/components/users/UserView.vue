<template>
  <div class="notification is-primary">
    <router-link to="/users">
      <button class="button is-info">
        <b-icon icon="arrow-left"></b-icon>
        <span>Back to list</span>
      </button>
    </router-link>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'users-view',
  props: ['id'],
  data() {
    return {
      profile: {},
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {

  },
  mounted() {
    this.$api('GET', `/users/${this.id}`).then((profile) => { this.profile = profile; });
  },
};
</script>
<style lang="scss" scoped>
.center-avatar {
  justify-content: center;
  display: flex;
}
.avatar {
  display: flex;
  overflow: hidden;
  height: 120px;
  width: 100px;
  img {
    border-radius: 50%;
    align-self: center;
  }
}
</style>

