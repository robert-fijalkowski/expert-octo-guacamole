<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <div class="viewport">
      <UserBar/>
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
.viewport {
  margin-left: $navBarSize;
}
</style>
