<template>
  <div class="main">
    <router-link :to="route">
      <b-tooltip :label="text" position="is-right">
        <b-icon size="is-medium" :type="type" :icon="icon"></b-icon>
      </b-tooltip>
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
$pad: 18px;
.main {
  padding-top: $pad;
  padding-bottom: $pad;
}
.icon {
  transition: color 0.15s ease-in-out;
  &.has-text-iconized > i.fa {
    color: mix(#000, $primary);
    &:hover {
      color: mix(#fff, $primary);
    }
  }
}
a.router-link-active i {
  color: white !important;
}
</style>
