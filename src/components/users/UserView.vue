<template>
  <div class="notification is-primary">
    <button class="button is-info" @click="back()">
      <b-icon icon="arrow-left"></b-icon>
      <span>Back</span>
    </button>
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
      from: null,
    };
  },
  computed: {
    ...mapGetters(['isAdmin']),

  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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

