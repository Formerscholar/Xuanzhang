<template>
  <div class="options_profile">
    <pOptionsItem />
    <BankAccounts />
    <management />
  </div>
</template>
    
<script>
import pOptionsItem from '@/views/profile/children/pOptionsItem/pOptionsItem'
import BankAccounts from '@/views/profile/children/BankAccounts/BankAccounts'
import management from '@/views/profile/children/management/management'

export default {
  name: 'pOptions',
  components: {
    pOptionsItem,
    BankAccounts,
    management
  }
}
</script>
    
<style lang="scss" scoped>
.options_profile {
}
</style>
