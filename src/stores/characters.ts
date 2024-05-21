import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Character, Episode } from '@/types'
import { fetchCharacters } from '@/api'

export const useCharactersStore = defineStore('characters', () => {
  const currentPage = ref(1);
  const filter = ref<Character.Filters>()
  const pagination = ref<Character.PaginationInfo>({
    count: 0,
    pages: 0,
  })
  const characters = ref<Character.CharacterCard[]>([])
  
  const setCharacters = async (page?: number) => {
    currentPage.value = page ?? currentPage.value
    try {
    const response = await fetchCharacters(currentPage.value, filter.value ? filter.value : {})
      const data = response.data
      pagination.value = data.info;
      await Promise.all((data.results as Character.CharacterCard[]).map(
        async el => {
          el.firstEpisodeName = await fetchEpisodeName(el.episode[0])
        }
      ))
      characters.value = data.results as Character.CharacterCard[]
    } catch (err) {
      currentPage.value = 1;
      pagination.value = {
        count: 0,
        pages: 0,
      },
      characters.value = []
    }
  }

  const setNextCharacters = async () => {
    currentPage.value++
    await setCharacters()
  }
  const setPrevCharacters = async () => {
    currentPage.value--
    await setCharacters()
  }

  const fetchEpisodeName = async (url:string) => {
    const response = await (await fetch(url)).json() as Episode;
    return response.name
  }

  return { characters, pagination, currentPage, filter, setCharacters, setNextCharacters, setPrevCharacters }
})
