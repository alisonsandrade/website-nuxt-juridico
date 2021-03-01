<template>
  <div>
    <v-row v-show="$fetchState.pending">
      <p class="pa-2">
        Carregando os dados. Aguarde...
      </p>
    </v-row>
    <v-row class="mt-6 text-justify">
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="9"
      >
        <post-search
          v-show="$route.query.search || search"
          class="pa-4 mb-4"
          :search="$route.query.search || search"
          :params="$route.query.params || params"
          @reset="resetSearch"
        />

        <!-- Card principal das postagens -->
        <v-card
          v-for="post in posts"
          :key="post._id"
          class="pa-4 mb-4"
          :loading="loading"
          style="border-top: 3px solid rgb(94,20,21);"
        >
          <v-card-text class="text-justify">
            <base-heading class="info--text text-h5 font-weight-medium">
              <nuxt-link :to="`/posts/${post.slug}`">
                {{ post.title }}
              </nuxt-link>
            </base-heading>

            <v-card-subtitle style="border-top: rgb(94,20,21) 1px dotted; border-bottom: rgb(94,20,21) 1px dotted;">
              <v-row
                align="center"
                class="mx-0"
              >
                <v-icon left>
                  mdi-calendar-text
                </v-icon>

                <span class="font-weight-light">{{ new Date(post.published_at).toLocaleString() }}</span>

                <v-icon
                  left
                  class="ml-3"
                >
                  mdi-clipboard-account-outline
                </v-icon>

                <span class="font-weight-light">Por {{ getAuthor(post) }}</span>

                <v-icon
                  left
                  class="ml-3"
                >
                  mdi-comment-text-multiple-outline
                </v-icon>

                <DisqusCount
                  shortname="alinepontes"
                  :identifier="`/posts/${post.slug}`"
                />
              </v-row>
            </v-card-subtitle>
          </v-card-text>

          <div class="d-flex flex-no-wrap justify-space-between">
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img :src="urlImage(post)" />
            </v-avatar>
            <div>
              <v-card-subtitle>
                {{ post.content | strippedContent }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  class="ml-2 mt-1"
                  small
                  color="info white--text"
                  :to="{ name: 'posts-slug', params: { slug: post.slug }}"
                >
                  Leia mais
                </v-btn>
              </v-card-actions>
            </div>
          </div>

          <!-- Card das categorias -->
          <v-chip
            v-for="categoria in post.categorias"
            :key="categoria._id"
            class="ma-2"
            color="info"
            outlined
            small
            @click="filtrarPorCategoria(categoria.nome)"
          >
            <v-icon left>
              mdi-label
            </v-icon>
            {{ categoria.nome }}
          </v-chip>
        </v-card>

        <!-- Paginação -->
        <div
          v-show="posts.length > 0"
          class="text-center"
        >
          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="7"
          />
        </div>

        <!-- Alerta para pesquisa não localizada -->
        <v-alert
          v-show="posts.length === 0 && !$fetchState.pending"
          color="secondary"
          dark
          icon="mdi-file-search"
          border="left"
          prominent
        >
          Nenhuma postagens foi localizada com os termos da pesquisa ou não existem postagens
          cadastradas no sistema.
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        md="4"
        lg="4"
        xl="3"
      >
        <side-bar @filtrar-categoria="filtrarPorCategoria" />
      </v-col>
    </v-row>

    <v-overlay :value="overlay" />
  </div>
</template>

<script>
export default {
  name: 'PostList',

  components: {
    SideBar: () => import('@/components/SideBar')
  },

  filters: {
    strippedContent (string) {
      return string.replace(/<\/?[^>]+>/ig, ' ')
    }
  },

  layout: 'blog',

  data: () => ({
    loading: false,
    overlay: false,
    search: '', // Parâmetro principal da pesquisa
    params: '', // Parâmetro secundário
    page: 1,
    totalPorPagina: 5,
    totalPosts: 0,
    posts: []
  }),

  async fetch () {
    if (this.$route.query.search) {
      this.params = this.$route.query.params
      this.search = this.$route.query.search
    } else {
      try {
        this.loading = true
        const response = await this.$axios.get('/posts/count')
        this.totalPosts = response.data

        const { data } = await this.$axios.get(`/posts?_sort=published_at:DESC&_limit=${this.totalPorPagina}&_start=0`)
        this.posts = data

        this.page = 1
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    }
  },

  head: {
    title: 'Blog de Notícia - Aline Pontes Advocacia',
    meta: [
      // SEO Google
      { hid: 'description', name: 'description', content: 'Blog de notícias jurídicas do site Aline Pontes Advocacia. Esteja informado sobre as principais decisões judiciais e seus impactos no dia-a-dia do consumidor, cidadão ou segurado do INSS. ' },
      { hid: 'googlebot', name: 'googlebot', content: 'Blog de notícias jurídicas do site Aline Pontes Advocacia. Esteja informado sobre as principais decisões judiciais e seus impactos no dia-a-dia do consumidor, cidadão ou segurado do INSS. ' }
    ]
  },

  computed: {
    totalPages () {
      return Math.ceil(this.totalPosts / this.totalPorPagina)
    }
  },

  watch: {
    $route (to, from) {
      if (this.search && this.search === to.query.search && to.query.page === 1) {
        this.params = to.query.params
        this.search === 'Notícia' ? this.pesquisar() : this.filtrarPorCategoria(this.params)
        return
      }
      this.search = to.query.search
      this.params = to.query.params
    },

    search (value) {
      if (value) {
        value === 'Notícia' ? this.pesquisar() : this.filtrarPorCategoria(this.params)
      }
    },

    async page (value) {
      if (value === 1 && this.$route.query.page === 1) {
        return // Não precisa renderizar o método de paginação
      }
      try {
        this.overlay = true
        const start = (this.page * this.totalPorPagina) - this.totalPorPagina
        if (this.search === 'Categoria') {
          const { data } = await this.$axios.get(`/posts?categorias.nome=${this.params}&_limit=${this.totalPorPagina}&_start=${start}&_sort=published_at:DESC`)
          this.posts = data
        } else {
          const { data } = await this.$axios.get(`/posts?_sort=published_at:DESC&_limit=${this.totalPorPagina}&_start=${start}&title_contains=${this.params || this.$route.query.params || ''}`)
          this.posts = data
        }
        // Atualizar a query
        await this.$router.replace({ query: { search: this.search, params: this.params, page: value } })
      } catch (error) {
        return error
      } finally {
        this.overlay = false
      }
    }
  },

  created () {
    this.$eventBus.$on('pesquisar', ({ search, params }) => {
      this.search = search
      this.params = params
    })
  },

  methods: {
    getAuthor (data) {
      if (data.author) {
        return data.author.name ? data.author.name : data.author.username
      }
      return 'Anônimo'
    },

    urlImage (item) {
      if (item && item.image) {
        return item.image.formats.thumbnail.url
      }
      return require('@/static/images/thumbnail_default.jpg')
    },

    async filtrarPorCategoria (nomeCategoria) {
      try {
        this.overlay = true

        const response = await this.$axios.get(`/posts/count?categorias.nome=${nomeCategoria}&_sort=published_at:DESC`)
        this.totalPosts = response.data

        const { data } = await this.$axios.get(`/posts?categorias.nome=${nomeCategoria}&_sort=published_at:DESC&_limit=${this.totalPorPagina}&_start=0`)
        this.posts = data

        this.page = 1
      } catch (error) {
        return error
      } finally {
        this.overlay = false
      }
    },

    async pesquisar () {
      this.overlay = true
      try {
        const response = await this.$axios.get(`/posts/count?&title_contains=${this.params || this.$route.query.params}`)
        this.totalPosts = response.data

        const { data } = await this.$axios.get(`/posts?_sort=published_at:DESC&_limit=${this.totalPorPagina}&_start=0&title_contains=${this.params || this.$route.query.params}`)
        this.posts = data

        this.page = 1
      } catch (error) {
        return error
      } finally {
        this.overlay = false
      }
    },

    async resetSearch () { // Disparado quando o botão limpar da pesquisa é clicado
      this.search = null
      this.params = null
      await this.$router.replace({ query: null })
      this.page = 1
      this.$fetch()
    }
  }
}
</script>

<style scoped >
a {
  text-decoration: none !important;
  color: rgb(94, 20, 21) !important;
}
a:hover {
  text-decoration: underline !important;
}
.v-card__subtitle {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
