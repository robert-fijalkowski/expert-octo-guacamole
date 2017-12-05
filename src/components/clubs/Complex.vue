<template>
  <div>
    <div @click="select(club)" class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="notification">
          <div class="columns">
            <ClubEmblem :club="club.id" size="120" class="column is-2 is-hidden-touch" />
            <div class="column">
              <div class="title has-text-centered">{{club.name}}</div>
              <div class="subtitle is-size-6 has-text-centered">{{club.division}}, {{club.country}}</div>
              <Stars :stars="club.stars" class="has-text-centered" />
            </div>
          </div>
          <div class="has-text-centered club-tags">
            <div class="is-inline-block">
              <b-taglist attached>
                <b-tag type="is-dark">match</b-tag>
                <b-tag :type="qualityToColor(club.quality)">{{club.quality}}</b-tag>
              </b-taglist>
            </div>
            <div class="is-inline-block">
              <b-taglist attached>
                <b-tag type="is-dark">score</b-tag>
                <b-tag type="is-info">{{club.score}}</b-tag>
              </b-taglist>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { cond, equals, always, T } from 'ramda';

import ClubEmblem from './ClubEmblem';
import Stars from './Stars';

export default {
  components: { ClubEmblem, Stars },
  name: 'complex-club',
  props: {
    club: { type: Object, default: () => {}, required: true },
    select: { type: Function, default: () => {} },
    selected: String,
  },
  methods: {
    qualityToColor: cond([
      [equals('excellent'), always('is-success')],
      [equals('good'), always('is-success')],
      [equals('average'), always('is-average')],
      [equals('fair'), always('is-warning')],
      [T, always('is-black')],
    ]),
  },
};
</script>
<style lang="scss" scoped>

</style>
