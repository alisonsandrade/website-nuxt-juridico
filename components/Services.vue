<template>
  <section
    id="services"
    class="overflow-hidden"
  >
    <v-row
      class="accent"
      no-gutters
    >
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="require('@/static/images/services.png')"
          height="100%"
        />
      </v-col>

      <v-col
        class="text-center pa-5"
        cols="12"
        md="6"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col cols="12">
            <base-bubble-2 style="transform: translateX(55%)" />
            <base-heading class="info--text">
              Serviços
            </base-heading>

            <base-text class="mb-5" :class="{ 'pl-16 pr-16': $vuetify.breakpoint.mdAndUp }">
              Nosso escritório de Advocacia está a sua disposição para lhe atender
              na prestação dos seguintes serviços, dentre outros:
            </base-text>
          </v-col>

          <v-col
            v-for="(service, i) in services"
            :key="i"
            class="text-center mb-3"
            md="6"
          >
            <v-avatar
              class="elevation-6 mb-2"
              color="#69A1BB"
              size="64"
              tile
            >
              <v-icon
                dark
                size="52"
                v-text="service.icon"
              />
            </v-avatar>

            <base-text>
              <div
                class="mb-2 font-weight-medium"
                v-text="service.name"
              />
              <div>{{ service.blurb }}</div>
            </base-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>

export default {
  name: 'Services',

  data: () => ({
    services: [
      {
        name: 'Assessoria Jurídica',
        icon: 'mdi-clipboard-text-outline',
        blurb: 'O objetivo é buscar soluções jurídicas com respaldo legal, a fim de evitar litígio desnecessário para o cliente.'
      },
      {
        name: 'Consultoria Jurídica',
        icon: 'mdi-file-search-outline',
        blurb: 'Orientação jurídica sobre questões ligadas ao Direito com emissão de parecer especializado.'
      },
      {
        name: 'Advocacia Contenciosa',
        icon: 'mdi-gavel',
        blurb: 'Solução jurídica por meio de ajuizamento de demandas judiciais buscando um título judicial.'
      },
      {
        name: 'Advocacia Consultiva',
        icon: 'mdi-handshake',
        blurb: 'Busca da solução por meio do diálogo, evitando demandas judiciais e resolvendo litígios extrajudicialmente.'
      }
    ]
  })
}
</script>
