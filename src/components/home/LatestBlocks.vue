<template>
  <div>
    <loader :data="blocks">
      <div class="hidden sm:block">
        <table-blocks :blocks="blocks"></table-blocks>
      </div>
      <div class="sm:hidden">
        <table-blocks-mobile :blocks="blocks"></table-blocks-mobile>
      </div>
      <div class="mx-10 mt-10 flex flex-wrap">
        <router-link :to="{ name: 'blocks', params: { page: 2 } }" tag="button" class="show-more-button">
          {{ $t("Show more") }}
        </router-link>
      </div>
    </loader>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'

export default {
  data: () => ({ blocks: [] }),

  async mounted() {
    const response = await BlockService.latest()
    this.blocks = response
  },
}
</script>
