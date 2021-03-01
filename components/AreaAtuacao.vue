<template>
  <section
    id="area-atuacao"
    class="overflow-hidden"
  >
    <v-row no-gutters>
      <v-col
        class="text-center pa-5"
        cols="12"
      >
        <base-bubble-1 style="transform: rotate(180deg) translateX(2%); margin-bottom: -130px;" />

        <base-heading
          class="info--text"
          :class="$vuetify.breakpoint.smAndDown ? 'mt-4': ''"
        >
          Área de Atuação
        </base-heading>

        <base-text class="mb-5">
          Conheça algumas de nossas áreas de atuações<br>
          jurídica para resolução de sua lide.
        </base-text>

        <div class="d-flex flex-wrap justify-space-around">
          <template v-for="area in areas">
            <v-hover
              v-slot="{ hover }"
              :key="area.ramo"
            >
              <v-card
                :key="area.ramo"
                :elevation="hover ? 24 : 6"
                class="mt-12 mb-8 pt-16 mt-5"
                :max-width="$vuetify.breakpoint.width > 1670 ? '350' : '280'"
              >
                <v-img
                  :src="require(`@/static/images/${area.img}.jpeg`)"
                  :max-height="$vuetify.breakpoint.lgAndUp ? '220' : '170'"
                  :min-height="$vuetify.breakpoint.lgAndUp ? '220' : '170'"
                  class="max-auto mr-3 ml-3 rounded-lg"
                  style="margin-top: -110px"
                />

                <v-card-title>{{ area.ramo }}</v-card-title>

                <v-card-text class="text-justify align-end">
                  <div>{{ area.text }}</div>
                </v-card-text>
              </v-card>
            </v-hover>
          </template>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'RecentProjects',

  data: () => ({
    areas: [
      {
        ramo: 'Cível',
        img: 'area1',
        text: 'Envolve a representação de interesses individuais e privados tais como os relacionados a bens,' +
          'propriedades e questões familiares, como alimentos e divórcio.'
      },
      {
        ramo: 'Consumidor',
        img: 'area2',
        text: 'Atuação na defesa do consumidor frente aos fornecedores de bens e prestadores de serviços, com o fim de reparar fatos e vícios dos produtos e serviços.'
      },
      {
        ramo: 'Previdenciária',
        img: 'area3',
        text: 'Atuação na defesa dos interesses previdenciários dos seguradoos do INSS ou previdência própria, buscando a concessão dos mais diversos benefícios previdenciários.'
      },
      {
        ramo: 'Administrativa',
        img: 'area4',
        text: 'Atuação na defesa dos administrados e/ou órgãos públicos nas relações públicas estatais em que há a supremacia do interesse público sobre o privado.'
      }
    ]
  })
}
</script>
