<template>
  <div class="main">
    <router-link :to="route">
      <b-tooltip :label="text" position="is-right">
        <b-icon size="is-large" :type="type" :icon="icon"></b-icon>
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
    type: { type: String, default: 'is-white' },
  },
  name: 'menu-button',
};
</script>
 
<style lang="scss" scoped>
@import "../../style/vars";
$pad: 18px;
.main {
  padding-top: $pad;
  padding-bottom: $pad;
}
.has-text-white:hover {
  color: mix(#000, $primary) !important;
}
.icon {
  transition: color 0.15s ease-in-out;
}
</style>
