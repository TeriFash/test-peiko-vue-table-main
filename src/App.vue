<template>
  <div id="app">
    <DataMain />
  </div>
</template>

<script>
import DataMain from "@/components/DataMain";

export default {
  name: "App",
  components: {
    DataMain,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
