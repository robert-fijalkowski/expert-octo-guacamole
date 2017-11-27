<template>
  <div class="navigation has-text-centered">
    <img src="../../assets/schibsted.png" />
    <span v-if="isLogged">
      <MenuButton text="Dashboard" icon="home" route="/dashboard" />
      <MenuButton text="List of games" icon="list" route="/games" />
      <MenuButton text="List of users" icon="users" route="/users" />
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
    ...mapGetters(['isLogged']),
  },
};
</script>
 
<style lang="scss">
@import "../../style/vars.scss";
img {
  border-bottom: 1px solid black;
}
.navigation {
  font-family: "Montserrat";
  position: fixed;
  width: $navBarSize;
  border-right: 1px solid black;
  background: linear-gradient(to right, $primary 0%, $navBarEnd 100%);
  height: 100%;
  font-size: 0.9rem;
  z-index: 1;
}
</style>
