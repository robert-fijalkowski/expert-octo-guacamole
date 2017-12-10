<template>
  <div class="main">
    <router-link :to="route">
      <b-tooltip :label="text" position="is-right" class="is-hidden-touch">
        <b-icon size="is-medium" :type="type" :icon="icon"></b-icon>
      </b-tooltip>
      <div class="is-block-touch is-hidden-desktop">
        <b-icon size="is-medium" :type="type" :icon="icon" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    route: { type: String, default: '/' },
    icon: { type: String, default: 'asterisk' },
    text: String,
    type: { type: String, default: 'is-iconized' },
  },
  name: 'menu-button',
};
</script>
 
<style lang="scss">
@import "../../style/vars";
.main {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 3rem;
  line-height: 1rem;
}
.icon {
  &.has-text-iconized > i.fa {
    transition: color 0.15s ease-in-out;
    color: mix(#000, $primary-invert);
    &:hover {
      color: mix(#aaa, $primary-invert);
    }
  }
}
a.router-link-active i {
  color: white !important;
}
</style>
