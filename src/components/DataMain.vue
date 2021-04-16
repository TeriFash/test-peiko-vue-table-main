<template>
  <div class="data-main">
    <button
      class="data-main__button"
      :disabled="disabled"
      @click.prevent="getAsyncDataList"
    >
      Get Data
    </button>

    <DataCard
      :data="dataList"
      :markerColum="'Change'"
      :markerLoader="isLoader"
    />
  </div>
</template>

<script>
import * as mocData from "@/mocData/index.js";
import DataCard from "./DataCard";

export default {
  name: "DataMain",
  components: {
    DataCard,
  },

  data() {
    return {
      disabled: false,
      isLoader: false,
      dataList: [],
      dataOpt: mocData.payload,
    };
  },
  methods: {
    async getAsyncDataList() {
      try {
        this.disabled = true;
        this.isLoader = true;
        let { stocks, current, start } = await this.$simulateAsyncReq(
          this.dataOpt
        );

        const currentMark = current.map((item) => {
          return typeof item == "number" ? item.toFixed(2) : item;
        });

        const startMark = start.map((item) => {
          const localVal = typeof item == "number" ? item.toFixed(2) : item;
          return localVal.toString().split("")[0] === "-"
            ? `-${item}`
            : `+${item}`;
        });

        this.dataList = this.dataList = [
          {
            mark: false,
            title: "Stock",
            list: stocks,
          },
          {
            mark: false,
            title: "Current",
            list: currentMark,
          },
          {
            mark: true,
            title: "Change",
            list: startMark,
          },
        ];

        this.disabled = !!this.dataList;
        this.isLoader = false;
      } catch (e) {
        this.disabled = false;
        this.isLoader = false;
        this.dataList = [];
      }
    },
  },
};
</script>

<style lang="scss">
$border: 1px solid #f1f1f1;

.data-main {
  max-width: 462px;
  margin: 0 auto;
  padding: 60px;
  border: $border;

  &__button {
    border: $border;
    background: #f5f5f5;
    cursor: pointer;
    min-height: 30px;
    min-width: 120px;
    font-weight: 500;

    &:hover,
    &:focus {
      background: #d8d8d8;
      border: $border;
      outline: none;
      box-shadow: none;
    }

    &[disabled] {
      cursor: initial;

      &:hover,
      &:focus {
        background: #f5f5f5;

        border: $border;
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>
