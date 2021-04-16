<template>
  <div class="helper-container">
    {{ text }}
    <span v-if="type === 'loader'" class="helper-container__loader">
      <span class="helper-container__loader-inner"></span
    ></span>
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: $height;
  font-size: 2rem;
  padding-right: $height / 2;

  &__loader {
    display: inline-block;
    width: $height / 2;
    height: $height / 2;
    border: 4px solid #2c3e50;
    top: 50%;
    position: relative;
    right: -$height / 2;
    animation: loader 2s infinite ease;
  }

  &__loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #2c3e50;
    animation: loader-inner 2s infinite ease-in;
  }

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    75% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-inner {
    0% {
      height: 0%;
    }

    25% {
      height: 0%;
    }

    50% {
      height: 100%;
    }

    75% {
      height: 100%;
    }

    100% {
      height: 0%;
    }
  }
}
</style>
