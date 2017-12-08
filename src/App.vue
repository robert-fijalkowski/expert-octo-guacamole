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
#app,
html,
body {
  height: 100%;
  background: linear-gradient(to bottom, #222 0%, #090909 100%);
  background-attachment: fixed;
  padding: 5px 5px 0px 5px;
}
.viewport {
  margin-left: $navBarSize;
  min-height: calc(100% + -150px);
  margin-top: 5px;
}
</style>
