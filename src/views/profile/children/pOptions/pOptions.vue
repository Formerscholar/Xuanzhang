<template>
  <div class="options_profile">
    <pOptionsItem />
    <BankAccounts />
    <management />
    <FakePosition />
  </div>
</template>
    
<script>
import pOptionsItem from '@/views/profile/children/pOptionsItem/pOptionsItem'
import BankAccounts from '@/views/profile/children/BankAccounts/BankAccounts'
import management from '@/views/profile/children/management/management'
import FakePosition from '@/views/profile/children/FakePosition/FakePosition'

export default {
  name: 'pOptions',
  components: {
    pOptionsItem,
    BankAccounts,
    management,
    FakePosition,
  },
}
</script>
    
<style lang="scss" scoped>
.options_profile {
}
</style>
