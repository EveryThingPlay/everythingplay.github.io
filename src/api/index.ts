import type { Character } from "@/types/character"
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 1000,
})

export async function fetchCharacters(page?:Number, params?:Object) {
    const response = await api.get<Character.Response>('/character', {
      params: {
        ...params,
        page
      }
    })
    return response
}