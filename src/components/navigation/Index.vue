<template>
  <div class="navigation has-text-centered" :class="isVisible ? 'show' : ''">
    <div class="logo" @click="toggleShow">
      <img src="../../assets/premiersted.svg" />
    </div>
    <span class="buttons" v-if="isLogged">
      <MenuButton text="Dashboard" icon="home" route="/dashboard" />
      <MenuButton text="List of games" v-if="isUser" icon="list" route="/games" />
      <MenuButton text="List of users" v-if="isUser" icon="users" route="/users" />
      <MenuButton text="Clubs search" icon="futbol-o" route="/clubs" />
      <MenuButton text="Settings & My Profile" icon="cog" route="/settings" />
      <MenuButton text="Logout" icon="sign-out" route="/logout" />
      <MenuButton text="About us" icon="info-circle" route="/about" />
    </span>
    <span class="buttons" v-if="!isLogged">
      <MenuButton text="Login with github" icon="github" route="/login" />
      <MenuButton text="About us" icon="info-circle" route="/about" />
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import MenuButton from './Button';

export default {
  name: 'nabvar',
  components: { MenuButton },
  data() {
    return { isVisible: false };
  },
  computed: {
    ...mapGetters(['isLogged', 'isAdmin', 'isUser']),
  },
  methods: {
    toggleShow() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>
 
<style lang="scss">
@import "../../style/vars.scss";
.logo {
  padding: 0.5rem;
}
.buttons {
  display: flex;
  flex-direction: column;
}
.navigation {
  font-family: "Montserrat";
  position: fixed;
  width: $navBarSize;
  height: 100%;
  font-size: 1rem;
  z-index: 1;
  transition: all 0.4s ease-in-out;

  @media screen and (max-width: $tablet) {
    height: 3rem;
    overflow: hidden;
    background: rgba(0, 0, 0, 0);

    &.show {
      width: $navBarSize*1.25;
      height: 100%;
      background: rgba(0, 0, 0, 1);
    }
  }
}
</style>
