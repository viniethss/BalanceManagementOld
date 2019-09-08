<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>LOTUS KPM</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn flat id="signOutBtn" @click="logOut"><v-icon >power_settings_new</v-icon>&nbsp;{{ signOut }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'NavBar',
    data(){
        return{
            signOut: 'Log Out',
            currentUser: '',
        }
    },
    methods: {
      logOut(){
        firebase.auth().signOut().then(
          (user) => {
          this.$router.replace('login')
          }
        )
      }
    },
    created() {
      this.currentUser = firebase.auth().currentUser.email;
    }
}
</script>

<style scoped>
  #signOutBtn{
    font-size: 1.3em !important;
  }
</style>
