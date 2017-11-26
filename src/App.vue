<template>
  <div id="app">
    <Styled/>
    <Navigation/>
    <div class="viewport">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Index';
import Styled from '@/style/Styled';

export default {
  name: 'app',
  components: { Navigation, Styled },
};
</script>
 
<style style="scss">
.viewport {
  margin-left: 100px;
}
</style>
