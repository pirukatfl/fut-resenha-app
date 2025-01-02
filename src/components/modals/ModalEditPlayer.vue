<template>
  <v-card>
    <v-card-text>
      <v-row dense>
        <v-form
          ref="form"
          v-model="valid"
          dense
          validate-on="submit"
          @submit.prevent="save"
        >
          <v-text-field
            :key="'name'"
            v-model="player.name"
            :rules="nameRules"
            :disabled="loading"
            label="Nome do jogador"
          />
          <v-text-field
            :key="'pontuação'"
            v-model="player.score"
            :rules="scoreRules"
            :disabled="loading"
            label="Pontuação do jogador"
            type="number"
            required
          />
          <v-select
            :key="'pé bom'"
            v-model="player.strongFoot"
            :items="items"
            :rules="strongFootRules"
            :disabled="loading"
            label="Pé bom"
            required
          />
          <v-btn
            class="mt-2"
            type="submit"
            block
          >
            Salvar
          </v-btn>
        </v-form>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, reactive, defineEmits, watch, defineProps } from 'vue'
import { type Player } from '@/types/Player'
import { usePlayerStore } from '@/stores/player'

const listPlayersStore = usePlayerStore()

const emit = defineEmits(['closeDialog'])
const props = defineProps(['playerProps']
)

const items = ['direito', 'esquerdo', 'ambos']
const form = ref<boolean>(null)
const valid = ref<boolean>(false)
const loading = ref<boolean>(false)

const player = reactive<Player>({
  id: props.playerProps.id,
  name: props.playerProps.name,
  strongFoot: props.playerProps.strongFoot,
  score: props.playerProps.score,
})

watch(() => player.score, (newValue) => {
  if (newValue < 50 || newValue > 100) {
    player.score = 50
  }
})

const nameRules = [
  value => !!value || 'Informe o nome do jogador'
]

const strongFootRules = [
  v => (v === 'direito' || v === 'esquerdo' || v === 'ambos') || 'Escolha uma opção'
]

const scoreRules = [
  v => (v >= 50 && v <= 100) || 'A pontuação deve estar entre 50 e 100'
]

async function save() {
  if (!form.value) return

  const validate = await form.value.validate()

  if (validate.valid) {
    listPlayersStore.editPlayer(player)
    loading.value = true

    setTimeout(() => {
      loading.value = false
      emit('closeDialog')
    }, 3000)
  }
}
</script>
