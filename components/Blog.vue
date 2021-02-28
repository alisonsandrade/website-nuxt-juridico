<template>
  <section
    id="blog"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="blue-grey lighten-5 text-center pa-4 pb-6 white--text"
        cols="12"
      >
        <base-bubble-2 style="transform: translateX(80%); margin-bottom: -160px;" />

        <base-heading class="info--text">
          Notícias
        </base-heading>
        <base-text class="mb-5 black--text">
          Últimas postagens
        </base-text>

        <v-row justify="center">
          <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '10'">
            <v-list
              three-line
              color="transparent"
              class="text-justify"
            >
              <template v-for="(item, index) in items">
                <v-list-item
                  :key="index"
                  link
                  :to="{ name: 'posts-slug', params: { slug: item.slug }}"
                >
                  <v-list-item-avatar
                    :size="$vuetify.breakpoint.smAndDown ? '100' : '150'"
                    rounded
                  >
                    <v-img :src="urlImage(item)" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title><strong>{{ item.title.toUpperCase() }}</strong></v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle || item.content }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider
                  :key="item.title"
                  inset
                />
              </template>
            </v-list>

            <v-btn
              class="info mt-2"
              elevation="5"
              to="/posts"
            >
              Mais notícias
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'Blog',

  data: () => ({
    loading: false,
    selection: 1,
    items: []
  }),

  async fetch () {
    try {
      const { data } = await this.$axios.get('/posts?_limit=4&_sort=id:DESC')
      this.items = data
    } catch (error) {
      return error
    }
  },

  methods: {
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },

    urlImage (item, destaque = false) {
      if (item && item.image) {
        return item.image.formats.thumbnail.url
      }
      return require('@/assets/thumbnail_default.jpg')
    },

    truncate (string) {
      if (string && string.length > 120) {
        return `${string.slice(0, 120)}...`
      }
      return string
    }
  }
}
</script>
