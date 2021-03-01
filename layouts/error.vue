<template>
  <v-app dark>
    <div
      v-if="error.statusCode === 404"
    >
      <v-card
        class="d-flex flex-column justify-center align-center mb-6"
        color="grey lighten-2"
        flat
        height="100vh"
      >
        <h2 class="info--text">
          404
        </h2>
        <h1 class="info--text pb-4">
          {{ pageNotFound }}
        </h1>
        <br>
        <NuxtLink to="/" class="blue-grey--text">
          Página Inicial
        </NuxtLink>
      </v-card>
    </div>
    <h1 v-else>
      {{ otherError }}
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Página não encontrada.',
      otherError: 'Ocorreu um erro'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
