<template>
  <div class="columns">
    <div class="column is-3">
      <b-field>
        <b-select placeholder="From" v-model="from" expanded @input="validate()">
          <option :value="a" v-for="a in game.competitorsSize" :key="a">{{a}}</option>
        </b-select>
      </b-field>
    </div>
    <div class=" column is-3 ">
      <b-field>
        <b-select placeholder="To" v-model="to" expanded @input="validate()">
          <option :value="a" v-for="a in game.competitorsSize" :key="a">{{a}}</option>
        </b-select>
      </b-field>
    </div>
    <div class="column is-4 ">
      <b-field>
        <b-input placeholder="Name" v-model="name" expanded @input="validate()">
        </b-input>
      </b-field>
    </div>
    <div class="column is-2 ">
      <p class="control">
        <button class="button is-primary-2" :disabled="!isLast" @click="$emit('add')">
          <b-icon icon="plus" />
        </button>
        <button class="button is-primary-2" :disabled="isFirst || !isLast" @click="$emit('remove')">
          <b-icon icon="minus" />
        </button>
      </p>
    </div>
  </div>
</template>
<script>
import * as R from 'ramda';

export default {
  props: ['game', 'data', 'isFirst', 'isLast'],
  name: 'complete-row',
  data() {
    return {
      ...this.data,
      id: parseInt(Math.random() * 10000, 10),
    };
  },
  methods: {
    validate() {
      this.to = parseInt(this.to, 10);
      this.from = parseInt(this.from, 10);
      if (this.name) {
        this.$emit('data', {
          to: this.to,
          from: this.from,
          name: this.name,
        });
      }
    },
  },
};
</script>

