<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <UserBar/>
    <div class="viewport">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Index';
import Styled from '@/style/Styled';
import UserBar from '@/components/UserBar';

export default {
  name: 'app',
  components: { Navigation, Styled, UserBar },
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
.viewport {
  margin-left: $navBarSize;
  min-height: calc(100% + -150px);
  @media screen and (max-width: $tablet) {
    margin-left: 0;
  }
}
</style>
