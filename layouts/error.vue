<template>
  <v-app dark>
    <span v-show="error.path === '/ap-admin'">
      Aguarde o redirecionamento...
    </span>
    <div v-show="error.path !== '/ap-admin'">
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
    </div>
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
      otherError: 'Ocorreu um erro',
      title: ''
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  mounted () {
    if (this.error.path === '/ap-admin') {
      window.location.href = 'https://api-alinepontes.herokuapp.com/admin'
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
