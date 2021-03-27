export const state = () => ({
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  ogUrl: ''
})

export const mutations = {
  setOgTitle (state, title) {
    state.ogTitle = title
  },

  setOgDescription (state, description) {
    state.ogDescription = description
  },

  setOgImage (state, urlImage) {
    state.ogImage = urlImage
  },

  setOgUrl (state, url) {
    state.ogUrl = url
  }
}
