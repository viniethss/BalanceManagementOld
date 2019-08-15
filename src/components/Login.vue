<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-form ref="loginForm" @submit.prevent="submit">
                <v-card-text>
                  <v-text-field 
                    v-model="login.email"
                    prepend-icon="person" 
                    name="login" 
                    label="Login" 
                    type="email" 
                    :rules="login.emailRules"
                    validate-on-blur
                    clearable      
                  ></v-text-field>
                  <v-text-field 
                    v-model="login.pass"
                    prepend-icon="lock" 
                    :append-icon="login.show ? 'visibility' : 'visibility_off'"
                    :type="login.show ? 'text' : 'password'"
                    @click:append="login.show = !login.show"                  
                    name="pass" 
                    label="Password" 
                    :rules="login.passRules"
                    validate-on-blur
                  ></v-text-field>
                  <div id="recaptcha"></div>
                </v-card-text>
                <v-card-actions>
                    <div id="recaptcha-container"></div>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar 
      class="snackbar" 
      v-model="snackbar.visible" 
      :top="snackbar.top"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      <v-icon >error_outline</v-icon>
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
  //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  import firebase from 'firebase'

  const authService = {
      data(){
          return{
            login: {
              show: false,
              email: '',
              pass: '',
              emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ],
              passRules: [
                v => !!v || 'Password is required',
              ]
            },
            snackbar: {
              visible: false,
              message: 'temp',
              top: true,
              color: 'error',
              timeout: 2000
            }
          }
      },
      methods: {
        submit () {
            if (this.$refs.loginForm.validate()) {
              firebase.auth().signInWithEmailAndPassword(this.login.email, this.login.pass).then(
                (user) =>{
                  this.$router.replace('bm')
                }
              ).catch((error) => {
                  switch (error.code) {
                    case 'auth/user-not-found':
                      this.snackbar.message = "No account exists with this Email Id"
                      this.snackbar.visible = true       
                      break;
                    case 'auth/wrong-password':
                      this.snackbar.message = "The password is incorrect"
                      this.snackbar.visible = true
                      break;
                    default:
                      this.snackbar.message = "Contact adminstrator"
                      this.snackbar.visible = true
                      break;
                  }
              });
            }
        }       
      }
  }

  export default authService
</script>

<style>
    input:focus,
    input:-webkit-autofill:focus,
    input:-webkit-autofill {
        box-shadow: inset 0 0 0px 9999px white;
    }
    .snackbar{
      margin-top: 10px;
      font-size: 1.2em;
    }
</style>
