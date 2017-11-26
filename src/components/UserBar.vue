<template>
  <div>
    <div :v-if="isLogged" class="nav">
      <img :src="avatar" width=50 height=50 /> {{username}}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userbar',
  computed: {
    ...mapGetters(['isLogged', 'avatar', 'username']),
  },
};
</script>
<style lang="scss" scoped>
@import "../style/vars";
.nav {
  color: white;
  height: $navBarSize;
  background: $navBarEnd;
}
</style>
