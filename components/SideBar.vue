<template>
  <aside>
    <v-card class="blue-grey lighten-4 white--text mb-4">
      <v-card-title class="info--text pb-0">
        PESQUISAR
      </v-card-title>
      <v-divider
        class="info"
        light
        inset
        style="padding: 1px"
      />
      <v-card-text>
        <v-text-field
          v-model="search"
          dense
          outlined
          label="Digite a sua pesquisa"
          append-icon="mdi-send"
          class="mb-2 rounded-lg"
          :class="$vuetify.breakpoint.mdAndDown ? 'mt-0' : 'mt-4'"
          color="info"
          background-color="white"
          @click:append="pesquisar"
          @keypress.enter="pesquisar"
        />

        <v-alert
          v-if="alert"
          type="info"
        >
          {{ msgAlert }}
        </v-alert>
      </v-card-text>
    </v-card>

    <v-card class="blue-grey lighten-4 white--text mb-4">
      <v-card-title class="info--text pb-0">
        CATEGORIAS
      </v-card-title>
      <v-divider
        class="info"
        light
        inset
        style="padding: 1px"
      />
      <v-card-text>
        <v-chip
          v-for="categoria in categorias"
          :key="categoria._id"
          filter
          color="white"
          class="ma-1"
          @click="filtrarCategoria(categoria)"
        >
          {{ categoria.nome }}
        </v-chip>
      </v-card-text>
    </v-card>

    <!-- Posts relacionados -->
    <v-card
      class="blue-grey lighten-4 white--text mb-4"
      :loading="loading"
    >
      <v-card-title class="info--text pb-0">
        POSTS RELACIONADOS
      </v-card-title>
      <v-divider
        class="info"
        light
        inset
        style="padding: 1px"
      />
      <v-list
        three-line
        class="transparent"
      >
        <template v-for="item in postsRelacionados">
          <v-list-item
            :key="item.title"
            :to="{ name: 'posts-slug', params: { slug: item.slug } }"
          >
            <v-list-item-avatar
              :size="$vuetify.breakpoint.smAndDown ? '70' : '100'"
              rounded
            >
              <v-img :src="urlImage(item)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title" />
              <v-list-item-subtitle v-html="item.subtitle" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <!-- Arquivos -->
    <v-card
      class="blue-grey lighten-4 white--text"
      :loading="loading"
    >
      <v-card-title class="info--text pb-0">
        ARQUIVOS
      </v-card-title>
      <v-divider
        class="info"
        light
        inset
        style="padding: 1px"
      />
      <v-list
        three-line
        class="transparent"
      >
        <template #default>
          <v-treeview
            :items="items"
            item-text="title"
            activatable
            :active.sync="active"
            return-object
            color="info"
            open-on-click
            transition
          >
            <template #prepend="{ item, open }">
              <v-icon v-if="!item._id">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                mdi-file
              </v-icon>
            </template>
          </v-treeview>
        </template>
      </v-list>
    </v-card>
  </aside>
</template>

<script>
const arrayMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Março', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export default {
  name: 'SideBar',

  data: () => ({
    search: '',
    loading: false,
    alert: false,
    msgAlert: 'Digite algum valor no campo pesquisa',
    categorias: [],
    postsRelacionados: [],
    post: null,
    items: [],
    active: []
  }),

  async fetch () {
    try {
      const response = await this.$axios.get('/categorias')
      this.categorias = response.data

      const { data } = await this.$axios.get('/posts')
      this.items = this.nesdle(data)
    } catch (error) {
      return error
    }
  },

  watch: {
    search (value) {
      if (value) {
        this.alert = false
      }
    },

    async $route (to, from) {
      await this.getPostsRelacionados()
    },

    active (item) {
      // O objeto clicado retorna como tipo array. Por isso é necessário carregar apenas o primeiro
      // resultado do array para se localizar o slug do objeto
      if (item.length > 0) {
        this.$router.push({ name: 'posts-slug', params: { slug: item[0].slug } })
      }
    }
  },

  mounted () {
    this.getPostsRelacionados()
  },

  methods: {
    urlImage (item) {
      if (item && item.image) {
        return item.image.formats.thumbnail.url
      }
      return require('@/static/images/thumbnail_default.jpg')
    },

    async getPostsRelacionados () {
      const slug = this.$route.params.slug

      try {
        this.loading = true
        if (slug) {
          const { data } = await this.$axios.get(`/posts/${slug}`)
          this.post = data
          this.postsRelacionados = await this.formatRelacionados(this.post)
        } else { // Retornam as 4 últimas postagens
          const { data } = await this.$axios.get('/posts?_sort=published_at:DESC&_limit=4')
          this.postsRelacionados = data
        }
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },

    /** Função reponsável por tratar os dados e transformá-lo para o formato nesdle da treeview */
    nesdle (array) {
      const tree = array.reduce(function (acc, currentValue) {
        const ano = new Date(currentValue.published_at).getFullYear()
        const mes = new Date(currentValue.published_at).getMonth()

        const indexAno = acc.findIndex(a => a.title === ano)

        if (indexAno !== -1) {
          const indexMes = acc[indexAno].children.findIndex(m => m.title === arrayMes[mes])

          if (indexMes === -1) {
            acc[indexAno].children.push({
              title: arrayMes[mes],
              children: [currentValue]
            })
          } else {
            acc[indexAno].children[indexMes].children.push(currentValue)
          }
        } else {
          acc.push({
            title: ano,
            children: [
              { title: arrayMes[mes], children: [currentValue] }
            ]
          })
        }
        return acc
      }, [])
      return tree
    },

    /**
   * Função responsável por receber o objeto carregado na url e buscar no banco de dados
   * todos os posts relacionados com a matéria que está sendo lida
   */
    async formatRelacionados (data) {
      const arrayPalavras = data.title.split(' ')
      const arrayRelacionados = []
      const result = await this.$axios.get('/posts?_sort=published_at:DESC&_limit=4')

      result.data.forEach((post) => {
        arrayPalavras.forEach((element) => {
          if (element && element.length > 2) {
            if (post.content.includes(element)) {
              /* Verifica se o objeto já está no array e também exclui a postagem carregada no component */
              if (!arrayRelacionados.map(ar => ar._id).includes(post._id) && post._id !== data._id) {
                arrayRelacionados.push(post)
              }
            }
          }
        })
      })

      return arrayRelacionados
    },

    async filtrarCategoria (categoria) {
      try {
        await this.$router.push({ name: 'posts', query: { search: 'Categoria', params: categoria.nome, page: 1 } })
        this.$eventBus.$emit('pesquisar', { search: 'Categoria', params: categoria.nome })
      } catch (error) {
        return error
      } finally {
        // this.$emit('filtrar-categoria', categoria.nome)
      }
    },

    async pesquisar () {
      if (!this.search || this.search === '') {
        this.alert = true
      } else {
        try {
          await this.$router.push({ name: 'posts', query: { search: 'Notícia', params: this.search, page: 1 } })
          this.$eventBus.$emit('pesquisar', { search: 'Notícia', params: this.search })
        } catch (error) {
          if (error.name === 'NavigationDuplicated') {
            this.alert = true
            this.msgAlert = 'Modifique os termos da pesquisa para realizar nova consulta.'
          }
        }
      }
    }
  }
}
</script>
