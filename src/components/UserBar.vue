<template>
  <div>
    <div v-if="isLogged" class="nav columns is-centered is-mobile">
      <div class='column is-1 avatar'>
        <img :src="avatar" />
      </div>
      <div class="column has-text-centered">
        {{username}} Logged
      </div>
      <div class="column">
        {{id}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userbar',
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username', 'id']),
  },
};
</script>
<style lang="scss" scoped>
@import "../style/vars";
.nav {
  box-sizing: border-box;
  color: white;
  height: $navBarSize;
  padding: 0px;
  margin-left: $navBarSize;
  div {
    outline: 0px solid white;
  }
  .avatar {
    display: inline-block;
    img {
      width: $navBarSize;
      border-radius: 15px;
    }
    margin-left: 10px;
  }
}
</style>
