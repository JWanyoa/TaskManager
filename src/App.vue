<template>
  <!-- <Navbar /> -->
  <ToDos />
</template>

<script>

import ToDos from './components/ToDos.vue'
// import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    ToDos,
    // Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
