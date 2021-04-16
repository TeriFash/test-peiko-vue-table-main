<template>
  <div class="container data-card" :class="isEmpty ? '' : 'is-empty'">
    <template v-if="isEmpty">
      <div class="data-card__col" v-for="(item, i) in data" :key="i">
        <div class="data-card__head">
          {{ item.title }}
        </div>
        <div class="data-card__row" v-for="(element, y) in item.list" :key="y">
          <span :class="item.title === markerColum && setElementMark(element)">
            {{ element }}
          </span>
        </div>
      </div>
    </template>
    <DataLoader v-if="markerLoader" />
    <DataEmpty v-if="!isEmpty && !markerLoader" />
  </div>
</template>

<script>
import DataEmpty from "./DataEmpty";
import DataLoader from "./DataLoader";

export default {
  name: "DataCard",
  data() {
    return {};
  },
  components: {
    DataEmpty,
    DataLoader,
  },
  watch: {
    data() {
      if (!this.data) this.isEmpty = false;
    },
  },
  computed: {
    isEmpty() {
      return this.data.length;
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
  props: {
    data: {
      type: Array,
    },
    markerColum: {
      type: String,
      default: "",
    },
    markerLoader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
$border: 1px solid #f1f1f1;

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.data-card {
  margin-top: 30px;
  border: $border;

  &__col {
    width: 33.33%;
    min-width: 124px;

    div {
      justify-content: center;
    }

    &:first-child {
      div {
        justify-content: flex-start;
      }
    }

    &:last-child {
      div {
        justify-content: flex-end;
      }
    }
  }

  &__head,
  &__row {
    padding: 0 20px;
    display: flex;
    align-items: center;
    text-align: left;
    min-height: 30px;
    font-size: 0.9rem;
  }

  &__head {
    background: #f5f5f5;
    font-weight: 600;
    border-bottom: $border;
  }
  &__row {
    font-weight: 500;

    &:not(:last-child),
    &:not(:first-child) {
      border-bottom: $border;
    }

    &:last-child {
      border-bottom: none;
    }

    & .is-success {
      color: #a6d17b;
    }
    & .is-error {
      color: #e08582;
    }
  }

  &.is-empty {
    max-width: 462px;
    border: none;
  }
}
</style>
