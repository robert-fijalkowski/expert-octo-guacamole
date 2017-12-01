<template>
  <div>
    <div v-if="isLogged" class="nav level">
      <div class='level-left avatar'>
        <img :src="avatar" />
      </div>
      <div class="level-item">
        {{username}} Logged
      </div>
      <div class="level-item">
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
