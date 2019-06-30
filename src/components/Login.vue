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
              <v-form ref="loginForm">
                <v-card-text>
                  <v-text-field 
                    v-model="email"
                    prepend-icon="person" 
                    name="login" 
                    label="Login" 
                    type="text" 
                    required 
                    clearable
                  ></v-text-field>
                  <v-text-field 
                    v-model="pass"
                    id="password" 
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"                  
                    prepend-icon="lock" 
                    name="password" 
                    label="Password" 
                    required 
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
      data(){
          return{
              show: false,
              email: '',
              pass: ''
          }
      },
      methods: {
        login () {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
              (user) =>{
                  this.$router.replace('bm')
              },
              (err) => {

              }
            ).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        },       
      }
  }
</script>

<style>
    input:focus,
    input:-webkit-autofill:focus,
    input:-webkit-autofill {
        box-shadow: inset 0 0 0px 9999px white;
    }
</style>
