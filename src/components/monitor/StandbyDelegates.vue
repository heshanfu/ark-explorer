<template>
  <table-component :data="delegates" sort-by="approval" sort-order="desc" :show-filter="false" :show-caption="false" table-class="w-full text-xs md:text-base">
    <table-column show="rate" :label="$t('Rank')" header-class="left-header-cell pl-5 sm:pl-10 w-32" cell-class="p-3 pl-5 sm:pl-10 text-left border-none">
      <template slot-scope="row">
        {{ row.rate }}
      </template>
    </table-column>

    <table-column show="address" :label="$t('Name')" header-class="left-header-cell" cell-class="left-cell">
      <template slot-scope="row">
        <link-wallet :address="row.address"></link-wallet>
      </template>
    </table-column>

    <table-column show="productivity" :label="$t('Productivity')" header-class="right-header-cell hidden md:table-cell" cell-class="right-cell hidden md:table-cell">
      <template slot-scope="row">
        {{ percentageString(row.productivity) }}
      </template>
    </table-column>

    <table-column show="approval" :label="$t('Approval')" header-class="right-header-cell sm:pr-10 hidden md:table-cell" cell-class="right-end-cell hidden md:table-cell w-40">
      <template slot-scope="row">
        {{ percentageString(row.approval) }}
      </template>
    </table-column>
  </table-component>
</template>

<script type="text/ecmascript-6">
import DelegateService from '@/services/delegate'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data: () => ({ delegates: [] }),

  computed: {
    ...mapGetters('network', ['activeDelegates']),
  },

  async mounted() {
    await this.getDelegates()
  },

  methods: {
    async getDelegates() {
      const response = await DelegateService.standby()
      this.delegates = response
    },
  },
}
</script>
