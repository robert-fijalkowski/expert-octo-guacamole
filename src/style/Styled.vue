<template>
  <div></div>
</template>
<script>
export default {
  name: 'styled',
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
  color: #2c3e50;
}
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-invert)
);
html {
  background-color: $background;
}
// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
