<template>
  <div class="options_profile">
    <versionItem />
    <mytaskItem />
    <tobalance />
    <Pendbalance />
    <Runrecord />
    <wages />
    <FakePosition />
    <BankAccounts />
    <management />
    <Reimbursementrecord />
    <baseLogin />
    <exitLogin />
  </div>
</template>
    
<script>
import versionItem from '@/views/profile/children/versionItem/versionItem'
import BankAccounts from '@/views/profile/children/BankAccounts/BankAccounts'
import management from '@/views/profile/children/management/management'
import FakePosition from '@/views/profile/children/FakePosition/FakePosition'
import mytaskItem from '@/views/profile/children/mytaskItem/mytaskItem'
import tobalance from '@/views/profile/children/tobalance/tobalance'
import Pendbalance from '@/views/profile/children/Pendbalance/Pendbalance'
import Runrecord from '@/views/profile/children/Runrecord/Runrecord'
import wages from '@/views/profile/children/wages/wages'
import Reimbursementrecord from '@/views/profile/children/Reimbursementrecord/Reimbursementrecord'
import baseLogin from '@/views/profile/children/baseLogin/baseLogin'
import exitLogin from '@/views/profile/children/exitLogin/exitLogin'

export default {
  name: 'pOptions',
  components: {
    versionItem,
    BankAccounts,
    management,
    FakePosition,
    mytaskItem,
    tobalance,
    Pendbalance,
    Runrecord,
    wages,
    Reimbursementrecord,
    baseLogin,
    exitLogin,
  },
}
</script>
    
<style lang="scss" scoped>
.options_profile {
}
</style>
