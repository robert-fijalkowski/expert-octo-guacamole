<template>
  <div>
    <article :class="selected === club.id ? 'is-selected' : ''" @click="select(club)" class="notification hover">
      <div class="columns">
        <ClubEmblem :club="club.id" size="75" class="column is-2 is-hidden-mobile" />
        <div class="column is-6">
          <div class="title has-text-centered">{{club.name}}</div>
          <div class="subtitle is-size-6 has-text-centered">{{club.division}}, {{club.country}}</div>
        </div>
        <div class="column is-4">
          <Stars :stars="club.stars" class="has-text-centered" />
          <div class="has-text-centered club-tags">
            <div class="is-inline-block">
              <b-taglist attached>
                <b-tag type="is-dark">score</b-tag>
                <b-tag type="is-info">{{club.score}}</b-tag>
              </b-taglist>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import ClubEmblem from './ClubEmblem';
import Stars from './Stars';

export default {
  components: { ClubEmblem, Stars },
  name: 'simple-club',
  props: {
    club: { type: Object, default: () => {}, required: true },
    select: { type: Function, default: () => {} },
    selected: String,
  },
};
</script>
<style lang="scss" scoped>
.notification.hover {
  transition: background ease 0.3s;

  &.is-selected {
    background: #666;
    &:hover {
      background: #666;
    }
  }
  &:hover {
    cursor: pointer;
    background: mix(#000, #666);
  }
}
</style>
