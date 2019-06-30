<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <v-btn flat>{{ currentRouteName }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
    name: 'NavBar',
    data(){
        return{
            loginMode: 'Login',
        }
    }
}
</script>
