<template>
  <v-container
    fluid
    class="mb-4"
    :class="$vuetify.breakpoint.smAndDown ? '' : 'pl-16 pr-16'"
  >
    <base-heading class="info--text text-h4">
      Mais recentes
    </base-heading>

    <v-row>
      <v-col
        v-for="post in postsRecentes"
        :key="post._id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto"
            color="grey lighten-4"
            max-width="600"
          >
            <v-img
              :aspect-ratio="16/9"
              :src="urlImage(post)"
            >
              <v-expand-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#036358"
                >
                  <div class="text-center">
                    <p>{{ post.title }}</p>
                    <v-btn :href="`/posts/${post.slug}`">
                      Leia mais
                    </v-btn>
                  </div>
                </v-overlay>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PostRecente',

  data: () => ({
    postsRecentes: []
  }),

  async fetch () {
    try {
      const { data } = await this.$axios.get('/posts?_limit=4&_sort=published_at:DESC')
      this.postsRecentes = data
    } catch (error) {
      return error
    }
  },

  methods: {
    urlImage (item) {
      if (item && item.image) {
        return item.image.formats.thumbnail.url
      }
      return require('@/assets/thumbnail_default.jpg')
    }
  }

}
</script>
<style lang="sass" scoped>
h3 > a:link
  text-decoration: none !important
  a:hover
    text-decoration: underline !important
</style>
