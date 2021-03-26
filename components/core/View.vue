<template>
  <div>
    <welcome />

    <area-atuacao />

    <services />

    <blog />

    <about-me />

    <!--<social-media-banner /> -->

    <get-in-touch />
  </div>
</template>

<script>
import Welcome from '@/components/Welcome'
import AreaAtuacao from '@/components/AreaAtuacao'
import Services from '@/components/Services'
import Blog from '@/components/Blog'
import AboutMe from '@/components/AboutMe'
import GetInTouch from '@/components/GetInTouch'

export default {
  name: 'CoreView',

  components: {
    Welcome,
    AreaAtuacao,
    Services,
    Blog,
    AboutMe,
    GetInTouch
  }
}
</script>
