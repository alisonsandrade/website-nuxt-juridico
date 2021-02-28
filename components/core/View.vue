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
export default {
  name: 'CoreView',

  components: {
    Welcome: () => import('@/components/Welcome'),
    AreaAtuacao: () => import('@/components/AreaAtuacao'),
    Services: () => import('@/components/Services'),
    Blog: () => import('@/components/Blog'),
    AboutMe: () => import('@/components/AboutMe'),
    GetInTouch: () => import('@/components/GetInTouch')
    // SocialMediaBanner: () => import('@/components/SocialMediaBanner')
  }
}
</script>
