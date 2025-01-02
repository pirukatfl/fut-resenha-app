<template>
  <v-container>
    <v-dialog
      v-model="dialogAdd"
      transition="dialog-bottom-transition"
      width="auto"
      overflow-hidden
    >
      <template #activator>
        <v-row>
          <v-col>
            <v-btn
              class="mb-4"
              @click="addPlayer"
            >
              +
              <v-icon :icon="`${mdiAccount}`" />
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template #default>
        <ModalRegisterPlayer @close-dialog="closeDialog()" />
      </template>
    </v-dialog>
    <v-data-table-virtual
      :headers="headers"
      :items="listPlayersStore.playerList"
      height="400"
      item-value="name"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="orange"
          @click="openEditDialog(item.id)">
          <v-icon
            color="white"
            :icon="`${mdiPencil}`"
          />
        </v-btn>
        <v-dialog
          v-model="dialogStates[item.id]"
          transition="dialog-bottom-transition"
          width="auto"
          overflow-hidden
        >
          <template #default>
            <ModalEditPlayer
              :player-props="item"
              @close-dialog="closeDialog(item.id)"
            />
          </template>
        </v-dialog>
        <v-btn
          color="red"
          class="ml-4"
          @click="deletePlayer(item.id)"
        >
          <v-icon
            color="white"
            :icon="`${mdiDelete}`"
          />
        </v-btn>
      </template>
    </v-data-table-virtual>
  </v-container>
</template>

<script setup lang="ts">
import { mdiAccount, mdiPencil, mdiDelete } from '@mdi/js'
import { usePlayerStore } from '@/stores/player'
import { reactive, ref } from 'vue'
import ModalRegisterPlayer from '@/components/modals/ModalRegisterPlayer'
import ModalEditPlayer from '@/components/modals/ModalEditPlayer'

const listPlayersStore = usePlayerStore()

const dialogAdd = ref(false)
const dialogStates = reactive({})

const headers = [
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Pontuação', align: 'start', key: 'score' },
  { title: '', align: 'end', key: 'actions' },
]

function openEditDialog(playerId: string) {
  dialogStates[playerId] = true
}

function closeDialog(playerId: string = '0') {
  if (playerId) {
    dialogStates[playerId] = false
  } else {
    dialogAdd.value = false
  }
}

function addPlayer() {
  dialogAdd.value = true
}

function deletePlayer(playerId: string) {
  const playerToDeleteIndex = listPlayersStore.playerList.findIndex(
    (item) => item.id === playerId
  )
  if (playerToDeleteIndex !== -1) {
    listPlayersStore.deletePlayer(playerToDeleteIndex)
  }
}
</script>
