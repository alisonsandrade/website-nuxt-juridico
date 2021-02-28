<template>
  <v-card class="blue-grey lighten-4">
    <v-card-title>Busca por: {{ search }}</v-card-title>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-icon class="ml-4 mr-2">
          mdi-file-search
        </v-icon>
        <div>
          {{ params }}
        </div>

        <v-spacer />

        <v-btn
          outlined
          @click="$emit('reset')"
        >
          <v-icon class="pr-2">
            mdi-eraser
          </v-icon>
          Limpar pesquisa
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PostSearch',

  props: {
    search: {
      type: String,
      default: ''
    },
    params: {
      type: String,
      default: ''
    }
  }
}
</script>
