<template>
  <div>
    <!-- v-for="(item, i) in items.slice(0, large ? items.length : 3)" -->
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      fab
      class="ma-2"
      color="info"
      :small="!large"
      @click="select(item.url)"
    >
      <v-icon
        dark
        v-text="item.icon"
      />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      {
        name: 'Twitter',
        icon: 'mdi-twitter',
        url: 'http://www.twitter.com/alinepontesadvocacia'
      },
      {
        name: 'Instagram',
        icon: 'mdi-instagram',
        url: 'http://www.instagram.com/alinepontesadvocacia'
      },
      {
        name: 'Facebook',
        icon: 'mdi-facebook',
        url: 'http://www.facebook.com/alinepontesadvocacia'
      },
      {
        name: 'Email',
        icon: 'mdi-email',
        url: 'mailto:contato@alinepontes.adv.br'
      },
      {
        name: 'Phone',
        icon: 'mdi-phone',
        url: 'https://wa.me/83986594034'
      }
    ]
  }),

  methods: {
    select (event) {
      window.open(event, '_blank')
    }
  }
}
</script>
