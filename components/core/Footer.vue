<template>
  <div>
    <v-footer
      min-height="23vh"
      class="justify-center"
      color="blue-grey"
    >
      <v-row>
        <!-- Coluna dos Menus -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="pa-6"
        >
          <v-list class="transparent">
            <template v-for="(item, index) in items">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              />

              <v-divider
                v-else-if="item.divider"
                :key="index"
              />

              <v-list-item
                v-else
                :key="item.title"
                :to="item.url"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-col>

        <!-- Coluna frase do dia -->
        <v-col
          v-if="!$vuetify.breakpoint.sm"
          cols="12"
          md="4"
          class="pa-6"
        >
          <base-subheading class="text-left pt-6 pb-6">
            Frase do dia:
          </base-subheading>

          <div class="font-italic text-subtitle-1 text-justify">
            <span v-html="frase.texto" />
          </div>

          <div
            v-if="frase.autor"
            class="text-right"
          >
            <strong>({{ frase.autor }})</strong>
          </div>
        </v-col>

        <!-- Coluna endereço -->
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="pa-6"
        >
          <div class="text-left">
            <base-subheading class="text-left pt-6 pb-4">
              Nosso endereço:
            </base-subheading>

            <div class="font-italic text-subtitle-1 text-justify">
              Rua Costa Beiriz, 111 - Centro<br>
              Galeria Adonias Fernandes - Sala 6<br>
              Guarabira - Paraíba - CEP: 58.200-000<br>
              Fone/WhatsApp: (83) 98659-4034<br>
              Email: contato@alinepontes.adv.br<br>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-footer>
    <div class="blue-grey darken-1 pb-1 pt-3 text-center">
      <social-media
        class="text-center"
        style="width: 100%"
      />

      <small class="text-center">&copy; Copyright {{ new Date().getFullYear() }}. Todos os direitos reservados. <p><strong>Aline Pontes Advocacia</strong></p></small>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CoreFooter',

  components: {
    SocialMedia: () => import('@/components/SocialMedia')
  },

  data: () => ({
    items: [
      { header: 'Menu' },
      {
        url: '/',
        title: 'Página Inicial'
      },
      { divider: true },
      {
        url: '/#area-atuacao',
        title: 'Área de Atuação'
      },
      { divider: true },
      {
        url: '/posts',
        title: 'Notícias'
      },
      { divider: true },
      {
        url: '/#about',
        title: 'Sobre nós'
      },
      { divider: true },
      {
        url: '/#get-in-touch',
        title: 'Contato'
      }
    ],
    frase: {
      autor: '',
      texto: ''
    }
  }),

  mounted () {
    this.$axios.get('/frases')
      .then(({ data }) => {
        const arrayRandom = Math.floor(Math.random() * data.length)
        this.frase = data[arrayRandom]
      })
      .catch(error => error)
  }
}
</script>
