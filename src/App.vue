<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <UserBar/>
    <div class="viewport">
      <router-view/>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
          </p>
        </div>
      </div>
    </footer>
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
}
.viewport {
  margin-left: $navBarSize;
  min-height: calc(100% + -150px);
  padding: 10px;
}
footer {
  margin-left: $navBarSize;
}
</style>
