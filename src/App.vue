<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <UserBar/>
    <div class="viewport" @click="hideMenu">
      <router-view/>
    </div>
    <b-loading :active.sync="busy" :canCancel="true"></b-loading>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from '@/components/navigation/Index';
import Styled from '@/style/Styled';
import UserBar from '@/components/UserBar';

const idForToken = (token) => {
  if (!token) {
    return null;
  }
  const [, payload] = token.split('.');
  const { id } = JSON.parse(atob(payload));
  return id;
};

export default {
  name: 'app',
  components: { Navigation, Styled, UserBar },
  methods: { ...mapActions(['hideMenu', 'refreshProfile', 'exchangeToken']) },
  computed: { ...mapGetters(['busy', 'token', 'event', 'id']) },
  watch: {
    token(token, oldToken) {
      if (idForToken(token) !== idForToken(oldToken)) { this.$ws(this); }
    },
    event({ type, relate }) {
      if (type === 'users' && relate === this.id) {
        this.refreshProfile();
        this.exchangeToken();
      }
    },
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
  padding: 0.75rem;
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
