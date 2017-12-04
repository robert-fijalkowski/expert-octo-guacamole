<template>
  <div>
    <ClubSprite/>
  </div>
</template>
<script>
import ClubSprite from './ClubSprite';

export default {
  name: 'styled',
  components: { ClubSprite },
};
/*

// Import Bulma's core

// Set your colors

*/
</script>
<style lang="scss">
@import "./vars.scss";

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&subset=latin-ext");

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $primary-invert;
}
$gold: #febb33;
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "gray": (#999, #300),
  "gold": ($gold, invert($gold)),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "primary-2": (mix($primary, #fff, 90%), mix($primary-invert, #000, 90%)),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "average": (#aadd33, black),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert)
);
html {
  background-color: $background;
}
a {
  text-decoration: none !important;
}
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.title {
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat";
  font-size: 130%;
}
.notification {
  padding: 1rem 1rem 1rem 1rem;
}
</style>
