<template>
  <article>
    <!-- Link do Social Media -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
      crossorigin="anonymous"
    >

    <v-row class="mt-6 text-justify">
      <v-col
        cols="12"
        md="8"
        lg="8"
        xl="9"
      >
        <v-card
          class="pa-4"
          :loading="loading"
          style="border-top: 3px solid rgb(94,20,21);"
        >
          <!-- <v-card-title class="pa-4 info--text text-h4 font-weight-medium">{{ post.title }}</v-card-title> -->

          <v-card-text class="text-justify">
            <base-heading class="info--text text-h4 font-weight-medium">
              {{ data.title }}
            </base-heading>

            <v-card-subtitle style="border-top: rgb(94,20,21) 1px dotted; border-bottom: rgb(94,20,21) 1px dotted;">
              <v-row
                align="center"
                class="mx-0"
              >
                <v-icon left>
                  mdi-calendar-text
                </v-icon>

                <span class="font-weight-light">{{ new Date(data.published_at).toLocaleString() }}</span>

                <v-icon
                  left
                  class="ml-3"
                >
                  mdi-clipboard-account-outline
                </v-icon>

                <span class="font-weight-light">Por {{ getAuthor(data) }}</span>

                <v-icon
                  left
                  class="ml-3"
                >
                  mdi-comment-text-multiple-outline
                </v-icon>

                <a
                  :href="`${hrefLocation}#disqus_thread`"
                  class="link-comments"
                >
                  Comentário
                </a>
              </v-row>
            </v-card-subtitle>
          </v-card-text>

          <!-- Facebook Shared -->
          <div class="share-network-list">
            <ShareNetwork
              v-for="network in networks"
              :key="network.network"
              :network="network.network"
              :style="{backgroundColor: network.color}"
              :url="hrefLocation"
              :title="data.title"
              :description="data.subtitle"
              :quote="data.subtitle"
              :hashtags="data.categorias ? data.categorias.map(cat => cat.nome).join(',') : 'direito'"
              twitter-user="alinepontesadvocacia"
            >
              <i :class="network.icon" />
              <span v-if="$vuetify.breakpoint.smAndUp">{{ network.name }}</span>
            </ShareNetwork>
          </div>

          <SocialHead
            :title="data.title"
            :description="data.subtitle"
            :image="imageUrl"
          />

          <v-card-text
            class="blue-grey lighten-4"
            style="width: 90%; margin: 0 auto;"
          >
            <p class="font-italic text-justify">
              {{ data.subtitle }}
            </p>
          </v-card-text>

          <v-card-text v-html="data.content" />

          <div class="pa-4">
            <Disqus
              ref="disqus"
              lang="pt_BR"
              :url="hrefLocation"
              :title="data.title"
              :slug="data.slug"
              @new-comment="newComment"
            />
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        lg="4"
        xl="3"
      >
        <side-bar />
      </v-col>
    </v-row>
  </article>
</template>

<script>

export default {
  name: 'PostDetail',

  components: {
    SideBar: () => import('@/components/SideBar'),
    SocialHead: () => import('@/components/SocialHead')
  },

  layout: 'blog',

  async asyncData ({ params, $axios }) {
    const { data } = await $axios.get(`/posts/${params.slug}`)
    return {
      data,
      hrefLocation: process.env.baseURL + '/posts/' + data.slug,
      imageUrl: data?.image?.url
    }
  },

  data: () => ({
    loading: false,
    params: null,
    subparams: null,
    networks: [
      { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
      { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
      { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
      { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
      { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
      { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
      { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
      { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
      { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
      { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' }
    ]
  }),

  head () {
    return {
      title: `Artigo: ${this.data.title}`,
      titleTemplate: '%s | Aline Pontes Advocacia',
      meta: [
        // SEO Facebook
        { hid: 'og:title', property: 'og:title', content: this.data.title },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Aline Pontes Advocacia' },
        { hid: 'og:description', property: 'og:description', content: 'Aline Pontes Advocacia | Site Jurídico. Post - ' + this.data.subtitle },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', property: 'og:url', content: this.hrefLocation },
        { hid: 'og:image', property: 'og:image', content: this.imageUrl },
        // SEO Google
        { hid: 'title', name: 'title', content: `Artigo: ${this.data.title}` },
        { hid: 'description', name: 'description', content: this.data.subtitle },
        { hid: 'googlebot', name: 'googlebot', content: this.data.subtitle },
        // SEO Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:image', content: this.data?.image?.url },
        { name: 'twitter:image:alt', content: this.imageUrl },
        { name: 'twitter:site', content: '@alinepontesadvocacia' },
        { name: 'twitter:creator', content: '@alinepontesadvocacia' }
      ]
    }
  },

  watch: {
    async $route (to, from) {
      if (to.name === from.name) {
        this.data = await this.reloadPost(to.params.slug)
      }
    }
  },

  methods: {
    newComment (e) {
      this.resetCountDisqus()
    },

    resetCountDisqus () {
      if (window.DISQUSWIDGETS) {
        window.DISQUSWIDGETS.getCount({ reset: true })
      }
    },

    getAuthor (data) {
      if (data.author) {
        return data.author.name ? data.author.name : data.author.username
      }
      return 'Anônimo'
    },

    async reloadPost (slug) {
      try {
        this.loading = true
        const { data } = await this.$axios.get(`/posts/${slug}`)
        return data
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    }

  }

}
</script>
<style scoped >
.link-comments {
  color: rgb(94, 20, 21);
}
.link-comments:hover {
  color: rgb(109, 109, 109);
}
/* Plugin de compartilhamento */
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^="share-network-"] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>
