<template>
  <div class="helper-container">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "HelperContainer",
  props: {
    type: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
$height: 30px;

.helper-container {
  margin-top: $height;
  font-size: 2rem;
}
</style>
