// Utilities
import { defineStore } from 'pinia'
import { type Player } from '@/types/Player'
import { v4 as uuidv4 } from 'uuid'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      // para listas inicialmente vazias
      playerList: [
        {
          id: uuidv4(),
          name: 'Furlan',
          strongFoot: 'direito',
          score: 80,
        },
        {
          id: uuidv4(),
          name: 'Pedro',
          strongFoot: 'direito',
          score: 87,
        },
        {
          id: uuidv4(),
          name: 'Lucas',
          strongFoot: 'direito',
          score: 89,
        },
        {
          id: uuidv4(),
          name: 'Furlan',
          strongFoot: 'direito',
          score: 80,
        },
        {
          id: uuidv4(),
          name: 'Pedro',
          strongFoot: 'direito',
          score: 87,
        },
        {
          id: uuidv4(),
          name: 'Lucas',
          strongFoot: 'direito',
          score: 89,
        },
        {
          id: uuidv4(),
          name: 'Furlan',
          strongFoot: 'direito',
          score: 80,
        },
        {
          id: uuidv4(),
          name: 'Pedro',
          strongFoot: 'direito',
          score: 87,
        },
        {
          id: uuidv4(),
          name: 'Lucas',
          strongFoot: 'direito',
          score: 89,
        },
        {
          id: uuidv4(),
          name: 'Furlan',
          strongFoot: 'direito',
          score: 80,
        },
        {
          id: uuidv4(),
          name: 'Pedro',
          strongFoot: 'direito',
          score: 87,
        },
        {
          id: uuidv4(),
          name: 'Lucas',
          strongFoot: 'direito',
          score: 89,
        }
      ] as Player[],
    }
  },
  actions: {
    addPlayer(player: Player) {
      this.playerList.push(player)
    },
    deletePlayer(index: number) {
      this.playerList.splice(index, 1)
    },
    editPlayer(player: Player) {
      const index = this.playerList.findIndex((item) => item.id === player.id)
      if (index !== -1) {
        this.playerList[index] = player
      }
    }
  }
})
