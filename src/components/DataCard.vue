<template>
  <div class="container data-card" :class="markerEmpty ? 'is-empty' : ''">
    <template v-if="!markerEmpty">
      <div class="data-card__col is-top">
        <div class="data-card__head" v-for="(item, i) in data.headers" :key="i">
          {{ item }}
        </div>
      </div>
      <div class="data-card__col" v-for="(item, x) in data.lists" :key="x">
        <div class="data-card__row" v-for="(elem, y) in item.list" :key="y">
          <span :class="setElementMark(elem)">
            {{ elem }}
          </span>
        </div>
      </div>
    </template>
    <HelperContainer v-else :text="helperText" :type="helperType" />
  </div>
</template>

<script>
import HelperContainer from "./HelperContainer";

export default {
  name: "DataCard",
  props: {
    data: {
      type: Object,
    },
    markerColum: {
      type: String,
      default: "",
    },
    markerLoader: {
      type: Boolean,
      default: false,
    },
    markerEmpty: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    HelperContainer,
  },
  data() {
    return {
      helperText: "",
      helperType: "",
    };
  },
  watch: {
    markerLoader: {
      immediate: true,
      handler(val) {
        this.helperText = val ? "Loading..." : "No data";
        this.helperType = val ? "loader" : "empty";
      },
    },
  },
  methods: {
    setElementMark(val) {
      const mark = val.split("")[0] === "-";
      return {
        "is-success": !mark,
        "is-error": mark,
      };
    },
  },
};
</script>

<style lang="scss">
$border: 1px solid #f1f1f1;
$background: #f5f5f5;
$height: 30px;

.data-card {
  margin-top: $height;
  border: $border;

  &__col {
    width: 100%;
    min-width: 124px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: $border;

    &:last-child {
      border-bottom: none;
    }

    &.is-top {
      background: $background;
    }
  }

  &__head,
  &__row {
    padding: 0 20px;
    display: flex;
    align-items: center;
    text-align: left;
    min-height: $height;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
    font-weight: 500;

    &:first-child {
      justify-content: flex-start;
    }

    &:last-child {
      justify-content: flex-end;
    }
  }

  &__head {
    font-weight: 600;
  }
  &__row {
    &:last-child {
      & .is-success {
        color: #a6d17b;
      }
      & .is-error {
        color: #e08582;
      }
    }
  }

  &.is-empty {
    max-width: 462px;
    border: none;
  }
}
</style>
