<script setup lang="ts">
import type { Character } from '@/types';

defineProps<Character.CharacterCard>()
</script>

<template>
  <div class="card rounded-lg shadow-md m-4 border-2 overflow-auto border-stone-500 flex flex-row gap-4 pr-4 w-[480px]">
    <div>
      <img :src="image" class="h-48 w-48">
    </div>
    <div class="flex flex-col">
      <h3 class="font-bold">{{ name }}</h3>
      <div class="flex flex-row gap-2 text-sm">
        <span :class="status === 'Alive'? 'text-green-500' : status === 'Dead'? 'text-red-500': ''"> {{ status }}</span>
        <span> {{ gender }}</span>
      </div>
      <div class="flex flex-col mt-3">
        <span class="text-sm text-stone-400">Last known location:</span>
        <span>{{ location.name }}</span>
      </div>
      <div class="flex flex-col mt-3">
        <span class="text-sm text-stone-400">First seen in:</span>
        <span>{{ firstEpisodeName }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>@/types/character