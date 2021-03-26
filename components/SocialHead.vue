<template>
  <span v-if="false" />
</template>

<script>
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/nj2jSSg/logo-aline3.png'
    },
    url: {
      type: String,
      default: 'https://www.alinepontes.adv.br'
    }
  },

  head () {
    return {
      meta: [
        {
          hid: 'twitter:card',
          name: 'twitter:card', 
          content: 'summary' 
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.image
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@alinepontesadvocacia'
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@alinepontesadvocacia'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.image
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
      ]
    }
  }
}
</script>
