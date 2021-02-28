<template>
  <v-app class="brown lighten-5">
    <core-app-bar />

    <v-parallax
      id="blog"
      dark
      :src="require('@/static/images/blog-banner.jpg')"
      height="300"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <base-heading>
            <a
              href="/posts"
              class="info--text"
            >Blog | Notícias</a>
          </base-heading>
          <base-text class="mb-5 black--text">
            Aline Pontes Advocacia
          </base-text>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container
      :fluid="$vuetify.breakpoint.lgAndDown ? true : false"
      style="margin-top: -120px"
    >
      <!-- Rotas filhas -->
      <nuxt />
    </v-container>

    <post-recente />

    <core-footer />
  </v-app>
</template>

<script>
export default {
  name: 'BlogLayout',

  components: {
    CoreAppBar: () => import('@/components/core/AppBar'),
    PostRecente: () => import('@/components/PostRecente'),
    CoreFooter: () => import('@/components/core/Footer')
  }
}
</script>

<style>
.v-parallax__image-container {
  opacity: 0.55 !important;
}
a {
  text-decoration: none !important;
}
a:hover {
  text-decoration: underline !important;
}
</style>
