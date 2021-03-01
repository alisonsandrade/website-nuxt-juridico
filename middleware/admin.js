export default function (ctx) {
  // Verifica se a rota chama é 'ap-admin' e redireciona o usuário para a Administração
  if (ctx.route.path === '/ap-admin') {
    ctx.redirect('https://api-alinepontes.herokuapp.com/admin')
  }
}
