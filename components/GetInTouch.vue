<template>
  <section
    id="get-in-touch"
    class="overflow-hidden"
  >
    <v-row
      class="secondary white--text"
      no-gutters
    >
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="require('@/assets/contact.png')"
          height="100%"
          max-height="800"
        />
      </v-col>

      <v-col
        class="pa-5"
        cols="12"
        md="6"
      >
        <base-bubble-1 />

        <base-heading class="mb-5">
          Entrar em contato
        </base-heading>

        <v-sheet
          color="transparent"
          max-width="600"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="contato.nome"
              color="info"
              label="Nome"
              solo
              flat
              :rules="nameRules"
              required
            />

            <v-text-field
              v-model="contato.email"
              color="info"
              label="E-mail"
              solo
              flat
              :rules="emailRules"
              required
            />

            <v-text-field
              v-model="contato.subject"
              color="info"
              label="Assunto"
              solo
              flat
              :rules="subjectRules"
              required
            />

            <v-textarea
              v-model="contato.message"
              color="info"
              label="Messagem"
              solo
              flat
              :rules="messageRules"
              required
            />

            <v-alert
              v-model="alert.model"
              dense
              :icon="alert.icon"
              outlined
              color="info"
              close-text="Close Alert"
              dismissible
            >
              {{ alert.message }}
            </v-alert>

            <base-btn
              :disabled="!valid"
              :loading="overlay"
              @click="sendMail"
            >
              Enviar
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </base-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>

    <v-overlay :value="overlay" />
  </section>
</template>

<script>

export default {
  name: 'GetInTouch',

  data: () => ({
    overlay: false,
    alert: {
      model: false,
      icon: 'mdi-check',
      message: 'E-mail enviado com sucesso!'
    },
    contato: {
      nome: null,
      email: null,
      subject: null,
      message: ''
    },
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Nome é obrigatório',
      v => (v && v.length >= 5) || 'O nome deve conter ao menos 5 caracteres.'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+\..+/.test(v) || 'Digite um e-mail válido'
    ],
    subject: '',
    subjectRules: [
      v => !!v || 'O assunto é obrigatório',
      v => (v && v.length <= 100) || 'O assunto deve conter no máximo 100 caracteres.'
    ],
    message: '',
    messageRules: [
      v => !!v || 'A mensagem é obrigatória',
      v => (v && v.length <= 1000) || 'A mensagem deve conter no máximo 1000 caracteres.'
    ]
  }),

  methods: {
    async sendMail () {
      if (this.$refs.form.validate()) {
        this.overlay = true
        try {
          await this.$axios.post('/email', {
            name: this.contato.nome,
            to: ['contato@alinepontes.adv.br'],
            from: `${this.contato.nome} <${this.contato.email}>`,
            subject: `[Formulário | Site] ${this.contato.subject}`,
            text: this.contato.message.replace(/<[^>]*>?/gm, ''),
            html: `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          
        </title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }
        </style>
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        
      <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
        </style>
      <!--<![endif]-->

    
        
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    
  
        <style type="text/css">
        
        
        </style>
        
        
      </head>
      <body>
        
        
      <div
         style=""
      >
        
      
      <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div  style="margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;padding:0px 0;text-align:center;"
              >
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#5e1415;vertical-align:top;" width="100%"
      >
        
            <tr>
              <td
                 align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:12px;line-height:1;text-align:left;color:#000000;"
      ><div><h1 style="text-align: center;"><font color="#ffffff" style="background-color: rgb(94, 20, 21);"><span style="font-weight: normal;">Olá </span>Dra. Aline Pontes<span style="font-weight: normal;">, você tem uma nova mensagem.</span></font></h1></div></div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 style="background:#ffffff;font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <p
         style="border-top:solid 4px #5e1415;font-size:1px;margin:0px auto;width:100%;"
      >
      </p>
      
      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5e1415;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
    
    
              </td>
            </tr>
          
      </table>
    
      </div>
    
          <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    
      
      <div  style="margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;padding:0px 0;text-align:center;"
              >
                <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"
      >
        
            <tr>
              <td
                 align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <div
         style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
      ><div style="text-align: justify;">Data:&nbsp;<span style="background-color: transparent;">${new Date().toLocaleString()}</span></div><div style="text-align: justify;"><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;"><br></span></div><div style="text-align: justify;"><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;">Remetente:&nbsp;</span><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;">${this.contato.nome} (${this.contato.email})</span></div><div style="text-align: justify;"><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;"><br></span></div><div style="text-align: justify;"><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;">Mensagem:</span></div><div style="text-align: justify;"><span style="background-color: rgba(2, 136, 209, 0.04); text-align: center;"><br></span></div><div style="text-align: justify;"><div style="margin: 0px 14.3906px 0px 28.7969px; padding: 0px; width: 436.797px; text-align: left; float: left; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"><p style="margin-top: 0px; margin-bottom: 15px; padding: 0px; text-align: justify;"><strong style="margin: 0px; padding: 0px;">${this.contato.message}</p><div><br></div></div><div style="margin: 0px 28.7969px 0px 14.3906px; padding: 0px; width: 436.797px; text-align: left; float: right; font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; background-color: rgb(255, 255, 255);"></div></div></div>
    
              </td>
            </tr>
          
            <tr>
              <td
                 style="font-size:0px;padding:10px 25px;word-break:break-word;"
              >
                
      <p
         style="border-top:solid 4px #5e1415;font-size:1px;margin:0px auto;width:100%;"
      >
      </p>
      
      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #5e1415;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
    
    
              </td>
            </tr>
          
      </table>
    
      </div>
    
          <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
    
    
      </div>
    
      </body>
    </html>  
          `,
          })
          this.reset()
          this.alert.model = true
          this.alert.icon = 'mdi-check'
          this.alert.message = 'E-mail enviado com sucesso!'
        } catch (error) {
          this.alert.model = true
          this.alert.icon = 'mdi-information-outline'
          this.alert.message = error
          return error
        } finally {
          this.overlay = false
        }
      }
    },

    reset () {
      this.contato = Object.assign({}, this.$options.data().contato)
      this.$refs.form.reset() // Resete a validação
    }
  }
}
</script>
