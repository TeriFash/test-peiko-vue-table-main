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
      :markerColum="markerColum"
      :markerLoader="isLoader"
      :markerEmpty="isEmpty"
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
      isEmpty: null,
      dataList: {
        lists: [],
        headers: ["Stock", "Current", "Change"],
      },
      dataHeader: ["Stock", "Current", "Change"],
      markerColum: "Change",
      dataOpt: mocData.payload,
    };
  },
  watch: {
    "dataList.lists": {
      immediate: true,
      deep: true,
      handler(val, old) {
        if (val !== old) {
          this.isEmpty = !!val.length;
        }
        this.isEmpty = !val.length;
      },
    },
  },
  methods: {
    numberFormatedList(arr) {
      const result = arr.map((item) => {
        const numberFormated = new Intl.NumberFormat("en-EN").format(
          item.toFixed(2)
        );
        return `${numberFormated}`;
      });

      return result;
    },
    markedFormatedList(arr) {
      const result = arr.map((item) => {
        return item.toString().split("")[0] === "-" ? `-${item}` : `+${item}`;
      });
      return result;
    },
    async getAsyncDataList() {
      try {
        this.disabled = true;
        this.isLoader = true;

        let tempList = [];
        let result = [];
        let { stocks, current, start } = await this.$simulateAsyncReq(
          this.dataOpt
        );
        const data = [stocks, current, start];
        const currentMark = await this.numberFormatedList(current);
        const startList = await this.numberFormatedList(start);
        const startMark = await this.markedFormatedList(startList);

        for (let i = 0; i < data.length; i++) {
          result[i] = [stocks[i], currentMark[i], startMark[i]];

          tempList[i] = {
            mark: this.dataList.headers[i] === this.markerColum ? true : false,
            list: result[i],
          };
        }

        const compare = (a, b) => {
          if (a.list[0] < b.list[0]) {
            return -1;
          }
          if (a.list[0] > b.list[0]) {
            return 1;
          }
          return 0;
        };

        this.dataList.lists = tempList.sort(compare);
        this.disabled = !!this.dataList.lists;
      } catch (e) {
        this.disabled = false;
        this.dataList.lists = [];
      } finally {
        this.isLoader = false;
      }
    },
  },
};
</script>

<style lang="scss">
$border: 1px solid #f1f1f1;
$background: #f5f5f5;
$height: 30px;

.data-main {
  max-width: 462px;
  margin: 0 auto;
  padding: $height * 2;
  border: $border;

  &__button {
    border: $border;
    background: $background;
    cursor: pointer;
    min-height: $height;
    min-width: 120px;
    font-weight: 500;

    &:hover,
    &:focus,
    &:active {
      background: #d8d8d8;
      border: $border;
      outline: none;
      box-shadow: none;
    }

    &[disabled] {
      cursor: initial;

      &:hover,
      &:focus,
      &:active {
        background: $background;
      }
    }
  }
}
</style>
