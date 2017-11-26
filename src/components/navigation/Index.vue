<template>
  <div class="navigation has-text-centered">
    <img src="../../assets/schibsted.png" />
    <MenuButton text="Login with github" icon="github" route="/login" />
    <MenuButton text="Dashboard" icon="home" route="/dashboard" />
    <MenuButton text="List of games" icon="list" route="/games" />
    <MenuButton text="List of users" icon="users" route="/users" />
    <MenuButton text="Settings & My Profile" icon="cog" route="/settings" />
    <MenuButton text="Logout" icon="sign-out" route="/logout" />

    <MenuButton text="About us" icon="info-circle" route="/about" />
  </div>
</template>

<script>
import MenuButton from './Button';

export default {
  name: 'nabvar',
  components: { MenuButton },
};
</script>
 
<style lang="scss" scoped>
@import "../../style/vars.scss";
img {
  border-bottom: 1px solid black;
}
.navigation {
  font-family: "Montserrat";
  position: fixed;
  width: 100px;
  border-right: 1px solid black;
  background: linear-gradient(
    to right,
    $primary 0%,
    mix($primary, $background, 75%) 100%
  );
  height: 100%;
  font-size: 0.9rem;
}
</style>
