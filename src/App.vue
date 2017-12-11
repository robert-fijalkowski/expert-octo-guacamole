<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <UserBar/>
    <div class="viewport" @click="hideMenu">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from '@/components/navigation/Index';
import Styled from '@/style/Styled';
import UserBar from '@/components/UserBar';

export default {
  name: 'app',
  components: { Navigation, Styled, UserBar },
  methods: {
    ...mapActions(['hideMenu']),
  },
};
</script>
 
<style lang="scss">
@import "./style/vars";
html,
body {
  height: 100%;
  background: linear-gradient(to bottom, #222 0%, #090909 100%);
  background-color: #222 !important;
  background-attachment: fixed;
  padding: 0.125rem;
}
#app {
  height: 100%;
}
.viewport {
  margin-left: $navBarSize;
  height: calc(100% - 3rem);
  @media screen and (max-width: $tablet) {
    margin-left: 0;
  }
  position: relative;
  & > * {
    position: relative;
    max-width: 1216px;
    margin: auto;
  }
}
</style>
