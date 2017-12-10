<template>
  <div class="root">
    <Search />
  </div>
</template>

<script>

import Search from './Search';

export default {
  name: 'clubs-search-view',
  components: { Search },
};
</script>
<style lang="scss" scoped>
.root {
  padding: 0.75rem;
}
</style>
