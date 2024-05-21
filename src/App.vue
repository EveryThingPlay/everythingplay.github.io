<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useCharactersStore } from './stores/characters';
import CCard from './components/CCard.vue';
import CPagination from './components/CPagination.vue';
import { storeToRefs } from 'pinia';
import CFilter from './components/CFilter.vue';

onBeforeMount(async ()=> {
  await useCharactersStore().setCharacters();
})

const {characters} = storeToRefs(useCharactersStore())
</script>

<template>
  <div class="flex flex-col">
    <div class="m-8 flex flex-col gap-4">
      <CFilter/>
      <CPagination class="flex-grow-1"/>
    </div>
      <div class="mx-4 flex flex-row flex-wrap gap-2">
        <CCard v-bind="character" v-for="character of characters" :key="character.id"/>
      </div>
  </div>
</template>