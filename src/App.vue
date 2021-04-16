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
$height: 30px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: $height * 2;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
