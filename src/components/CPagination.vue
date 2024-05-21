<script setup lang="ts">
import { useCharactersStore } from '@/stores/characters';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
const props = defineProps({
  step: {
    type: Number,
    default: 4
  }
})

const { currentPage, pagination } = storeToRefs(useCharactersStore());
const { setNextCharacters, setPrevCharacters, setCharacters } = useCharactersStore()

const inputModel = ref(currentPage.value);

const buttonsFilter = (page: number) => {
  return page>currentPage.value-props.step && page<currentPage.value +props.step ? '': 'hidden'
}

const isLastPage = computed(()=> {
  return currentPage.value===pagination.value.pages;
})

const isFirstPage = computed(()=> {
  return currentPage.value===1;
})

const offsetFromStart = computed(()=> {
  if (currentPage.value - props.step >= 0) {
    return 0
  }
  return - (currentPage.value - props.step);
})

</script>

<template>
  <div class="flex flex-col gap-1" v-if="pagination.pages>1">
    <div class="flex flex-row gap-2">
      <button @click="setCharacters(1)" :disabled="isFirstPage" class="paginationButton">First</button>
      <button @click="setPrevCharacters()" :disabled="isFirstPage" class="paginationButton">Previous</button>

      <div class="flex flex-row justify-start gap-1 w-72">
        <div class="px-2 w-10 !bg-transparent" v-for="el in offsetFromStart" :key="el"/>
        <button
        v-for="page in pagination.pages"
        :key="page"
        :disabled="page == currentPage"
        :class="buttonsFilter(page)"
        @click="setCharacters(page)"
        class="paginationButton w-10"
        > 
          {{ page }}
        </button>
      </div>
    
      <button class="paginationButton" @click="setNextCharacters()" :disabled="isLastPage">Next</button>
      <button class="paginationButton" @click="setCharacters(pagination.pages)" :disabled="isLastPage">Last ( {{ pagination.pages }} )</button>
    </div>
    <div class="flex flex-row gap-2 mt-2">
      <input
        v-model="inputModel"
        type="number"
        min="1"
        :max="pagination.pages"
        class="paginationInput"
      />
      <button
        class="paginationButton"
        @click="setCharacters(inputModel)"
        :disabled="inputModel === currentPage || inputModel > pagination.pages"
      >
        Go
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.paginationButton {
  @apply bg-stone-600 text-gray-800 rounded-md h-10 px-2 text-white disabled:bg-stone-800;
};
.paginationInput {
  @apply bg-stone-600 rounded-md p-1 text-white w-14 disabled:bg-stone-800;
}
</style>