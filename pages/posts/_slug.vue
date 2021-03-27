<template>
  <article>
    <SocialHead
      :title="post.title"
      :description="post.subtitle"
      :image="image"
      :url="hrefLocation"
    />
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
          <v-card-text class="text-justify">
            <base-heading class="info--text text-h4 font-weight-medium">
              {{ post.title }}
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
              :title="post.title"
              :description="post.subtitle"
              :quote="post.subtitle"
              :hashtags="post.categorias ? post.categorias.map(cat => cat.nome).join(',') : 'direito'"
              twitter-user="alinepontesadvocacia"
            >
              <i :class="network.icon" />
              <span v-show="$vuetify.breakpoint.smAndUp">{{ network.name }}</span>
            </ShareNetwork>
          </div>

          <v-card-text
            class="blue-grey lighten-4"
            style="width: 90%; margin: 0 auto;"
          >
            <p class="font-italic text-justify">
              {{ post.subtitle }}
            </p>
          </v-card-text>

          <v-card-text v-html="post.content" />

          <div class="pa-4">
            <Disqus
              ref="disqus"
              lang="pt_BR"
              :url="hrefLocation"
              :title="post.title"
              :slug="post.slug"
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
import SocialHead from '@/components/SocialHead'
import SideBar from '@/components/SideBar'

export default {
  name: 'PostDetail',

  components: { SideBar, SocialHead },

  layout: 'blog',

  async asyncData ({ env, route, params, $axios, error, store }) {
    try {
      const post = (await $axios.get(`/posts/${params.slug}`)).data
      const imageDefault = require('@/static/images/logo_aline1.png')
      const hrefLocation = env.baseURL + route.path
      const image = post?.image?.url || imageDefault

      // Setando os valores do SEO
      store.commit('setOgTitle', post.title)
      store.commit('setOgDescription', post.subtitle)
      store.commit('setOgImage', image)
      store.commit('setOgUrl', hrefLocation)

      return {
        post,
        hrefLocation,
        image
      }
    } catch (e) {
      error(e)
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
      // { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
      // { network: 'red709349dit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
      { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
      // { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
      { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
      // { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
      { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' }
    ]
  }),

  watch: {
    $route (to, from) {
      if (to.name === from.name) {
        // this.data = await this.reloadPost(to.params.slug)
        this.$nuxt.refresh()
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

    getAuthor (post) {
      if (post.author) {
        return post.author.name ? post.author.name : post.author.username
      }
      return 'Anônimo'
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
