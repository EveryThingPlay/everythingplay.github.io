<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters';

import { computed, ref } from 'vue';
const statusModel = ref<undefined|'Alive'|'Dead'|'Unknown'>(undefined)
const nameModel = ref<string|undefined>()

const statuses = [
  {
    title: 'Alive',
    value: 'alive'
  },{
    title: 'Dead',
    value: 'dead'
  },{
    title: 'Unknown',
    value: 'unknown'
  }]

function handleFilters(){
  useCharactersStore().filter = {
    status: statusModel.value,
    name: nameModel.value
  }
  useCharactersStore().setCharacters()
}

const isShowApply = computed(()=> {
  return statusModel.value !== useCharactersStore().filter?.status || nameModel.value !== useCharactersStore().filter?.name
})

</script>

<template>
  <div class="flex flex-row gap-4">
    <div>
      <span>Status: </span>
      <select
      v-model="statusModel"
      class="bg-stone-600 rounded-md p-2 text-white w-28 ml-1"
      >
        <option
        v-for="variant in statuses"
        :key="variant.value"
        :value="variant.value"
        :selected="variant.value === statusModel"
        >
          {{ variant.title }}
        </option>
      </select>
    </div>
    <div>
      <span>Name:</span>
      <input type="text" v-model="nameModel" class="bg-stone-600 rounded-md p-2 text-white w-40 ml-1" />
    </div>
    <button v-if="isShowApply" @click="handleFilters">Apply</button>
  </div>
</template>