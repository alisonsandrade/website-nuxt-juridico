<template>
  <div>
    <v-app-bar
      id="toolbar"
      v-scroll="onScroll"
      dark
      :color="!isScrolling ? 'transparent' : 'info'"
      fixed
      :flat="!isScrolling ? true : false"
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.smAndDown"
        @click.stop="sheet = !sheet"
      />

      <v-row>
        <v-col :cols="$vuetify.breakpoint.smAndDown ? '12' : '2'">
          <v-slide-x-transition>
            <NuxtLink to="/#welcome">
              <v-img
                :src="!isScrolling ? require('@/static/images/logo.png') : require('@/static/images/logo2.png')"
                contain
                height="50"
                :max-width="$vuetify.breakpoint.width - 90"
              />
            </NuxtLink>
          </v-slide-x-transition>
        </v-col>

        <v-col
          v-show="$vuetify.breakpoint.mdAndUp"
          cols="8"
        >
          <ul
            class="d-flex ma-1"
            :class="$vuetify.breakpoint.lgAndUp ? 'justify-center' : 'justify-space-between'"
          >
            <li>
              <nuxt-link :class="!isScrolling ? 'info--text' : 'primary--text'" to="/#area-atuacao">
                Área de Atuação
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :class="!isScrolling ? 'info--text' : 'primary--text'" to="/#services">
                Serviços
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :class="!isScrolling ? 'info--text' : 'primary--text'" to="/posts">
                Notícias
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :class="!isScrolling ? 'info--text' : 'primary--text'" to="/#about">
                Sobre nós
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :class="!isScrolling ? 'info--text' : 'primary--text'" to="/#get-in-touch">
                Contato
              </nuxt-link>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-bottom-sheet
      v-model="sheet"
      fullscreen
    >
      <v-sheet
        class="text-center info"
        height="100%"
      >
        <div class="pa-4">
          <a href="/#welcome">
            <v-img
              :src="require('@/static/images/logo_aline2.png')"
              contain
              height="70"
            />
          </a>
        </div>

        <v-btn
          style="position: absolute; top: 15px; right: 20px;"
          color="secondary"
          icon
          @click="sheet = !sheet"
        >
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>

        <div class="py-3">
          <v-list class="transparent">
            <v-list-item
              v-for="{ title, href } in items"
              :key="title"
              link
              ripple
              :to="`/${href}`"
              @click="sheet = false"
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title class="hover text-center white--text">
                    <base-heading :class="hover ? 'text-h5' : 'text-h6'">
                      {{ title }}
                    </base-heading>
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
          </v-list>
        </div>

        <social-media
          class="text-center"
          style="width: 100%; bottom: 10px; position: fixed;"
        />
      </v-sheet>
    </v-bottom-sheet>

    <v-fab-transition>
      <v-btn
        v-show="isScrolling"
        key="mdi-chevron-up"
        color="info"
        fab
        :small="$vuetify.breakpoint.mobile ? true : false"
        dark
        bottom
        right
        fixed
        @click="$vuetify.goTo('#toolbar')"
      >
        <v-icon>
          mdi-chevron-up
        </v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: 'CoreAppBar',

  components: {
    SocialMedia: () => import('@/components/SocialMedia')
  },

  data: () => ({
    showLogo: false,
    isScrolling: false,
    sheet: false,
    items: [
      { title: 'Área de Atuação', href: '#area-atuacao' },
      { title: 'Serviços', href: '#services' },
      { title: 'Notícias', href: 'posts' },
      { title: 'Sobre nós', href: '#about' },
      { title: 'Contato', href: '#get-in-touch' }
    ]
  }),

  methods: {
    onScroll () {
      const offset = window.pageYOffset
      this.isScrolling = offset > 70
      this.showLogo = offset > 200
    }
  }
}
</script>
<style>
.v-navigation-drawer {
  background-color: rgba(219, 219, 219, 0.9) !important;
}
li a {
  padding: 0.5em 2.0em;
  display: inline-block;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: white;
  font-size: .9em;
}
ul {
  list-style-type: none;
}
li a:hover {
  padding: 0.5em 2.0em;
  display: inline-block;
  background: rgba(0,0,0,0.1);
}
</style>
