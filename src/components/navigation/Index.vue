<template>
  <div class="navigation has-text-centered">
    <div class="logo">
      <img src="../../assets/premiersted.svg" />
    </div>
    <span v-if="isLogged">
      <MenuButton text="Dashboard" icon="home" route="/dashboard" />
      <MenuButton text="List of games" v-if="isUser" icon="list" route="/games" />
      <MenuButton text="List of users" v-if="isUser" icon="users" route="/users" />
      <MenuButton text="Clubs search" icon="futbol-o" route="/clubs" />
      <MenuButton text="Settings & My Profile" icon="cog" route="/settings" />
      <MenuButton text="Logout" icon="sign-out" route="/logout" />
    </span>
    <span v-if="!isLogged">
      <MenuButton text="Login with github" icon="github" route="/login" />
    </span>
    <MenuButton text="About us" icon="info-circle" route="/about" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import MenuButton from './Button';

export default {
  name: 'nabvar',
  components: { MenuButton },
  computed: {
    ...mapGetters(['isLogged', 'isAdmin', 'isUser']),
  },
};
</script>
 
<style lang="scss">
@import "../../style/vars.scss";
.logo {
  padding: 4px;
}
.navigation {
  font-family: "Montserrat";
  position: fixed;
  width: $navBarSize;
  height: 100%;
  font-size: 0.9rem;
  z-index: 1;
}
</style>
