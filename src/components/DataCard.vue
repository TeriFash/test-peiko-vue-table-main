<template>
  <div class="container data-card" :class="isEmpty ? '' : 'is-empty'">
    <template v-if="isEmpty">
      <div class="data-card__col is-top">
        <div class="data-card__head" v-for="(item, i) in dataList" :key="i">
          {{ item.title }}
        </div>
      </div>
      <div class="data-card__col" v-for="(item, i) in dataList" :key="i">
        <div class="data-card__row" v-for="(el, y) in item.list" :key="y">
          <span :class="setElementMark(el)">
            {{ el }}
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
  components: {
    DataEmpty,
    DataLoader,
  },
  watch: {
    dataList() {
      if (!this.dataList) this.isEmpty = false;
    },
  },
  computed: {
    isEmpty() {
      return this.dataList.length;
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
    dataList: {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.data-card {
  margin-top: 30px;
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
      background: #f5f5f5;
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
    width: 100%;
    justify-content: center;

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
    font-weight: 500;

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
