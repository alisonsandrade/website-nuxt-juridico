<template>
  <div>
    <core-app-bar />

    <core-view />

    <core-footer />
  </div>
</template>

<script>

export default {
  components: {
    CoreAppBar: () => import('@/components/core/AppBar'),
    CoreView: () => import('@/components/core/View'),
    CoreFooter: () => import('@/components/core/Footer')
  },
  head: {
    title: 'Aline Pontes Advocacia',
    titleTemplate: '%s | Assessoria & Consultoria Jurídica',
    meta: [
      // SEO Google
      { hid: 'description', name: 'description', content: 'Website do escritório de advocacia Aline Pontes Advocacia. Advocacia contenciosa e consultaria nas áreas de Direito Administrativo, Direito Civil, Direito Previdenciário e Direito do Consumidor.' },
      { hid: 'googlebot', name: 'googlebot', content: 'Website do escritório de advocacia Aline Pontes Advocacia. Advocacia contenciosa e consultaria nas áreas de Direito Administrativo, Direito Civil, Direito Previdenciário e Direito do Consumidor.' }
    ]
  }
}
</script>
