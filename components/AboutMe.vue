<template>
  <section
    id="about"
    class="overflow-hidden"
  >
    <v-row
      class="white"
      no-gutters
    >
      <v-col
        class="pa-5"
        cols="12"
        md="6"
      >
        <base-bubble-1 style="transform: translate(5%, -5%); margin-top: -20px;" />

        <base-heading class="info--text">
          Sobre nós
        </base-heading>

        <base-text class="mb-5">
          - Bacharela em Direito pela Unidade Estadual da Paraíba em 2016<br>
          Aprovada no Exame de Ordem XXIII, o qual, historicamente, foi o que teve<br>
          o maior índice de reprovação entre os candidatos.<br>
          - Pós-graduada em Direito Previdenciário e Administrativo.
        </base-text>

        <base-subheading class="info--text">
          Contate-nos
        </base-subheading>

        <base-text class="mb-5">
          Rua Costa Beiriz, 111 - Centro, Galeria Adonias Fernandes - Sala 6<br>
          Guarabira - Paraíba - CEP: 58.200-000<br>
          Fone/WhatsApp: (83) 98659-4034<br>
          Email: contato@alinepontes.adv.br<br>
        </base-text>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.32117448281!2d-35.492511684726644!3d-6.8520509950481685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7adb7ae77bda4bd%3A0xa787fe16f31d60fe!2sAline%20Pontes%20Advocacia!5e0!3m2!1spt-BR!2sbr!4v1613148349140!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          frameborder="0"
          style="border:0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
      </v-col>

      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="require('@/static/images/welcome.jpg')"
          height="100%"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  //
}
</script>
