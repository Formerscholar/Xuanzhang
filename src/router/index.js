const Home = () => import('../views/home/Home')

const homeManu = () => import('@/views/homeManu/homeManu')
const Mission = () => import('../views/home/children/Mission/Mission')
const Newtask = () =>
  import('../views/home/children/Mission/children/Newtask/Newtask')
const edittask = () =>
  import('../views/home/children/Mission/children/edittask/edittask')
const Details = () => import('../views/home/children/Details/Details')

const Client = () => import('../views/client/Client')
const clientDetails = () =>
  import('../views/client/cihldren/clientDetails/clientDetails')
const clientedit = () =>
  import('../views/client/cihldren/clientedit/clientedit')
const enterpriseedit = () =>
  import('../views/client/cihldren/enterpriseedit/enterpriseedit')
const Deal = () => import('../views/deal/Deal')
const DealGoods = () => import('../views/deal/children/DealGoods/DealGoods')
const ContractDetails = () =>
  import('../views/deal/children/ContractDetails/ContractDetails')
const keepmoneypage = () =>
  import('../views/deal/children/keepmoneypage/keepmoneypage')

const listShop = () => import('../views/deal/children/listShop/listShop')
const contract = () => import('../views/deal/children/contract/contract')
const ShipmentItem = () =>
  import('../views/deal/children/contract/children/ShipmentItem/ShipmentItem')
const editShipItem = () =>
  import('../views/deal/children/contract/children/editShipItem/editShipItem')
const Receivable = () =>
  import('../views/deal/children/contract/children/Receivable/Receivable')
const turnover = () =>
  import('../views/deal/children/contract/children/turnover/turnover')
const StorageCompany = () =>
  import('../views/deal/children/aside/children/StorageCompany/StorageCompany')
const machining = () => import('../views/deal/children/machining/machining')
const purchase = () => import('../views/deal/children/purchase/purchase')
const aside = () => import('../views/deal/children/aside/asides')
const Outsourcing = () =>
  import('../views/deal/children/Outsourcing/Outsourcing')
const stock = () => import('../views/deal/children/stock/stock')
const selfConcordat = () =>
  import('../views/deal/children/selfConcordat/selfConcordat')
const ShippedList = () =>
  import('../views/deal/children/ShippedList/ShippedList')
const Settlementlist = () =>
  import('../views/deal/children/Settlementlist/Settlementlist')
const Invoicelist = () =>
  import('../views/deal/children/Invoicelist/Invoicelist')
const Operation = () => import('../views/operation/Operation')

const createContract = () =>
  import('../views/deal/children/createContract/createContract')
const editContract = () =>
  import('../views/deal/children/editContract/editContract')
const addNewCustomerslist = () =>
  import('../views/deal/children/createContract/children/addNewCustomerslist')
const InvalidAddress = () =>
  import('../views/deal/children/InvalidAddress/InvalidAddress')
const addbill = () => import('../views/deal/children/addbill/addbill')
const addbillWl = () => import('../views/deal/children/addbillWl/addbillWl')
const Ship = () => import('../views/deal/children/Ship/Ship')
const warehouse = () => import('../views/deal/children/warehouse/warehouse')
const warehouseRet = () =>
  import('../views/deal/children/warehouseRet/warehouseRet')
const returnedPurchase = () =>
  import('../views/deal/children/returnedPurchase/returnedPurchase')
const OEMs = () => import('../views/deal/children/OEM/OEM')
const outsource = () => import('../views/deal/children/outsource/outsource')

const Profile = () => import('../views/profile/Profile')

const Login = () => import('../views/login/Login')

const businessLogin = () => import('../views/businessLogin/businessLogin')

const controlled = () => import('../views/controlled/Controlled')
const manboard = () => import('../views/manboard/manboard')
const staffEntry = () =>
  import('../views/manboard/children/staffEntry/staffEntry')
const editting = () => import('../views/manboard/children/editting/editting')
const fileInfo = () => import('../views/fileInfo/fileInfo')
const Email = () => import('../views/fileInfo/children/myArea/myArea')
const Password = () => import('../views/fileInfo/children/password/password')
const AvatarInfo = () => import('../views/fileInfo/children/Homepage/Homepage')
const scan = () => import('../components/common/my_scan/my_scan')

const Reimbursement = () => import('../views/Reimbursement/Reimbursement')

const early = () => import('../views/early/early')

const ReimburDetails = () =>
  import('../views/Reimbursement/children/ReimburDetails/ReimburDetails')
const ReimburDetail = () =>
  import('../views/Reimbursement/children/ReimburDetails/ReimburDetail')
const newAccount = () =>
  import('../views/Reimbursement/children/newAccount/newAccount')

const editAccount = () =>
  import('../views/Reimbursement/children/editAccount/editAccount')

const addDetails = () =>
  import('../views/Reimbursement/children/addDetails/addDetails')

const selectTime = () => import('../components/content/selectTime/selectTime')

const ContractDelivery = () =>
  import('../views/home/children/ContractDelivery/ContractDelivery')
const IncomingDelivery = () =>
  import('../views/home/children/IncomingDelivery/IncomingDelivery')
const Shipment = () => import('../views/home/children/Shipment/Shipment')
const TotalShipment = () =>
  import('../views/home/children/TotalShipment/TotalShipment')
const IncomDelivery = () =>
  import('../views/home/children/IncomDelivery/IncomDelivery')
const Outsourc = () => import('../views/home/children/Outsourc/Outsourc')
const editwarehouse = () =>
  import('../views/deal/children/editwarehouse/editwarehouse')

const materialpage = () => import('../views/materials/materialpage')

const addMaterial = () => import('../views/materials/children/addMaterial')

const editMaterial = () => import('../views/materials/children/editMaterial')

const bompage = () => import('../views/materials/children/bompage')

const contractScreen = () =>
  import('../views/home/children/LargeScreen/contractScreen')
const flowScreen = () => import('../views/home/children/LargeScreen/flowScreen')
const oemScreen = () => import('../views/home/children/LargeScreen/oemScreen')
const ScreenItem = () =>
  import('../views/home/children/LargeScreen/children/ScreenItem.vue')

const outSearch = () => import('@/views/deal/children/outSearch/outSearch')
const nameSearch = () => import('@/views/deal/children/Ship/nameSearch')
const SelectProducts = () => import('@/views/deal/children/Ship/SelectProducts')

const InventorySelectPd = () =>
  import('@/views/InventoryPick/InventorySelectPd')
const productNameSearch = () =>
  import('@/views/deal/children/Ship/productNameSearch')

const cardsearch = () => import('@/views/client/cihldren/cardsearch/cardsearch')
const Mproperties = () => import('@/views/materials/children/Mproperties')
const Mclassification = () =>
  import('@/views/materials/children/Mclassification')
const BasicUnit = () => import('@/views/materials/children/BasicUnit')
const MPrice = () => import('@/views/materials/children/MPrice')
const DWarehouse = () => import('@/views/materials/children/DWarehouse')
const WLNumber = () => import('@/views/materials/children/WLNumber')
const because = () => import('@/views/materials/children/because')
const engravDetail = () =>
  import('@/views/deal/children/Outsourcing/engravDetail')

const OutsourcingItem = () =>
  import('@/views/deal/children/Outsourcing/OutsourcingItem')

const createGoodpage = () =>
  import('@/views/deal/children/Outsourcing/createGoodpage')

const completions = () =>
  import('@/views/deal/children/Outsourcing/completions')

const asidesItem = () => import('@/views/deal/children/aside/asidesItem')
const editasidesItem = () =>
  import('@/views/deal/children/aside/editasidesItem')

const addressList = () =>
  import('@/views/deal/children/addressList/addressList')
const editAddress = () =>
  import('@/views/deal/children/editAddress/editAddress')

const Inventory = () => import('@/views/InventoryPick/Inventory')
const scanSelectPd = () => import('@/views/InventoryPick/scanSelectPd')

const MaterialReturn = () => import('@/views/InventoryPick/MaterialReturn')
const picking = () => import('@/views/InventoryPick/picking')

const Setup = () => import('@/views/profile/children/Setup/Setup')
const Recordlist = () =>
  import('@/views/profile/children/Runrecord/children/Recordlist/Recordlist')

const shipments = () => import('@/views/home/children/shipments/shipments')

const ContractCollection = () =>
  import('@/views/home/children/ContractCollection/ContractCollection')

const CurrentCollection = () =>
  import('@/views/home/children/CurrentCollection/CurrentCollection')

const CollectionOEM = () =>
  import('@/views/home/children/CollectionOEM/CollectionOEM')

const OtherCollection = () =>
  import('@/views/home/children/OtherCollection/OtherCollection')

const Outsourcingpayment = () =>
  import('@/views/home/children/Outsourcingpayment/Outsourcingpayment')

const Purchasepayment = () =>
  import('@/views/home/children/Purchasepayment/Purchasepayment')

const Companyflow = () =>
  import('@/views/home/children/Companyflow/Companyflow')

const sellAccept = () => import('@/views/home/children/sellAccept/sellAccept')
const purchasePay = () =>
  import('@/views/home/children/purchasePay/purchasePay')
const newOtherCollection = () =>
  import('@/views/home/children/newOtherCollection/newOtherCollection')
const Piecework = () => import('@/views/home/children/Piecework/Piecework')
const Processwork = () =>
  import('@/views/home/children/Processwork/Processwork')
const Simplework = () => import('@/views/home/children/Simplework/Simplework')
const PieceworkList = () =>
  import('@/views/home/children/PieceworkList/PieceworkList')
const Simplepiecework = () =>
  import('@/views/home/children/Simplepiecework/Simplepiecework')
const Processpiecework = () =>
  import('@/views/home/children/Processpiecework/Processpiecework')
const RecordDetail = () =>
  import(
    '@/views/profile/children/Runrecord/children/RecordDetail/RecordDetail'
  )

const Balancies = () => import('@/views/profile/children/Balancies/Balancies')

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    meta: {
      requireAuth: true,
    },
    component: Home,
  },
  {
    path: '/client',
    meta: {
      requireAuth: true,
    },
    component: Client,
  },
  {
    path: '/deal',
    component: Deal,
    children: [
      {
        path: 'sales',
        meta: {
          requireAuth: true,
        },
        component: DealGoods,
      },
      {
        path: 'contract',
        component: contract,
      },
      {
        path: 'machin',
        component: machining,
      },
      {
        path: 'purchase',
        component: purchase,
      },
      {
        path: 'aside',
        component: aside,
      },
      {
        path: 'outsourcing',
        component: Outsourcing,
      },
      {
        path: 'stock',
        component: stock,
      },
    ],
  },
  {
    path: '/operation',
    meta: {
      requireAuth: true,
    },
    component: Operation,
  },
  {
    path: '/profile',
    meta: {
      requireAuth: true,
    },
    component: Profile,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/businessLogin',
    component: businessLogin,
  },
  {
    path: '/scan/:model',
    component: scan,
  },
  {
    path: '/controlled',

    component: controlled,
  },
  {
    path: '/fileInfo',

    component: fileInfo,
  },
  {
    path: '/mission',
    component: Mission,
  },
  {
    path: '/newtask',
    component: Newtask,
  },
  {
    path: '/edittask/:id',
    component: edittask,
  },
  {
    path: '/details/:iid',
    component: Details,
  },
  {
    path: '/clientdetails/:type/:id',
    component: clientDetails,
  },
  {
    path: '/clientedit/:name/:id',
    component: clientedit,
  },
  {
    path: '/enterpriseedit/:name/:id',
    component: enterpriseedit,
  },
  {
    path: '/reimbursement',
    component: Reimbursement,
  },
  {
    path: '/early',
    component: early,
  },
  {
    path: '/account',
    component: newAccount,
  },
  {
    path: '/editAccount/:id',
    component: editAccount,
  },
  {
    path: '/add-details',
    component: addDetails,
  },
  {
    path: '/create-contract',
    component: createContract,
  },
  {
    path: '/edit-contract',
    name: 'data',
    component: editContract,
  },
  {
    path: '/reimburDetails/:id',
    component: ReimburDetails,
  },
  {
    path: '/reimburDetail/:id',
    component: ReimburDetail,
  },
  {
    path: '/selfConcordat/:id',
    component: selfConcordat,
  },
  {
    path: '/shippedlist/:id',
    component: ShippedList,
  },
  {
    path: '/settlementlist/:id',
    component: Settlementlist,
  },
  {
    path: '/invoicelist/:id',
    component: Invoicelist,
  },
  {
    path: '/turnover/:id',
    component: turnover,
  },
  {
    path: '/storageCom/:id',
    component: StorageCompany,
  },
  {
    path: '/addbill',
    component: addbill,
  },
  {
    path: '/addbillwl',
    component: addbillWl,
  },
  {
    path: '/Ship',
    component: Ship,
  },
  {
    path: '/warehouse',
    component: warehouse,
  },
  {
    path: '/warehouseRet',
    component: warehouseRet,
  },
  {
    path: '/returnedPurchase',
    component: returnedPurchase,
  },
  {
    path: '/oem',
    component: OEMs,
  },
  {
    path: '/outsource',
    component: outsource,
  },
  {
    path: '/InvalidAddress/:id',
    component: InvalidAddress,
  },
  {
    path: '/selectTime/:type',
    component: selectTime,
  },
  {
    path: '/addNewCustomerslist',
    component: addNewCustomerslist,
  },
  {
    path: '/contractdetails/:id',
    component: ContractDetails,
  },
  {
    path: '/keepmoneypage',
    name: 'data',
    component: keepmoneypage,
  },
  {
    path: '/listShop',
    name: 'data',
    component: listShop,
  },
  {
    path: '/manboard',
    component: manboard,
  },
  {
    path: '/staffEntry',
    component: staffEntry,
  },
  {
    path: '/editting/:id',
    component: editting,
  },
  {
    path: '/ShipmentItem/:id',
    component: ShipmentItem,
  },
  {
    path: '/asidesItem/:id',
    component: asidesItem,
  },
  {
    path: '/editShipItem/:id',
    component: editShipItem,
  },
  {
    path: '/editasidesItem/:id',
    component: editasidesItem,
  },
  {
    path: '/OutsourcingItem/:id',
    component: OutsourcingItem,
  },
  {
    path: '/Receivable',
    name: 'data',
    component: Receivable,
  },
  {
    path: '/email',
    component: Email,
  },
  {
    path: '/password',
    component: Password,
  },
  {
    path: '/avatarInfo',
    component: AvatarInfo,
  },
  {
    path: '/ContractDelivery',
    component: ContractDelivery,
  },
  {
    path: '/IncomingDelivery',
    component: IncomingDelivery,
  },
  {
    path: '/Shipment',
    component: Shipment,
  },
  {
    path: '/TotalShipment/:type',
    component: TotalShipment,
  },
  {
    path: '/IncomDelivery/:type',
    name: 'data',
    component: IncomDelivery,
  },
  {
    path: '/Outsourc/:type',
    name: 'data',
    component: Outsourc,
  },
  {
    path: '/editwarehouse/:id',
    component: editwarehouse,
  },
  {
    path: '/materialpage',
    component: materialpage,
  },
  {
    path: '/addMaterial',
    component: addMaterial,
  },
  {
    path: '/editMaterial/:id',
    component: editMaterial,
  },
  {
    path: '/bompage/:id',
    component: bompage,
  },
  {
    path: '/contractScreen',
    component: contractScreen,
  },
  {
    path: '/flowScreen',
    component: flowScreen,
  },
  {
    path: '/oemScreen',
    component: oemScreen,
  },
  {
    path: '/ScreenItem',
    name: 'data',
    component: ScreenItem,
  },
  {
    path: '/homeManu',
    component: homeManu,
  },
  {
    path: '/outSearch',
    name: 'data',
    component: outSearch,
  },
  {
    path: '/nameSearch',
    name: 'data',
    component: nameSearch,
  },
  {
    path: '/SelectProducts',
    name: 'data',
    component: SelectProducts,
  },
  {
    path: '/InventorySelectPd',
    component: InventorySelectPd,
  },
  {
    path: '/productNameSearch',
    name: 'data',
    component: productNameSearch,
  },
  {
    path: '/cardsearch',
    name: 'data',
    component: cardsearch,
  },
  {
    path: '/Mproperties',
    name: 'data',
    component: Mproperties,
  },
  {
    path: '/Mclassification',
    name: 'data',
    component: Mclassification,
  },
  {
    path: '/BasicUnit',
    name: 'data',
    component: BasicUnit,
  },
  {
    path: '/MPrice',
    name: 'data',
    component: MPrice,
  },
  {
    path: '/DWarehouse',
    name: 'data',
    component: DWarehouse,
  },
  {
    path: '/WLNumber',
    name: 'data',
    component: WLNumber,
  },
  {
    path: '/because/:iid',
    component: because,
  },
  {
    path: '/engravDetail/:id',
    component: engravDetail,
  },
  {
    path: '/createGoodpage',
    name: 'data',
    component: createGoodpage,
  },
  {
    path: '/completions/:id',
    component: completions,
  },
  {
    path: '/addressList/:id',
    component: addressList,
  },
  {
    path: '/editAddress/:id',
    component: editAddress,
  },
  {
    path: '/Inventory',
    component: Inventory,
  },
  {
    path: '/scanSelectPd/:id',
    name: 'data',
    component: scanSelectPd,
  },
  {
    path: '/MaterialReturn',
    component: MaterialReturn,
  },
  {
    path: '/picking',
    component: picking,
  },
  {
    path: '/Setup',
    component: Setup,
  },
  {
    path: '/Recordlist',
    component: Recordlist,
  },
  {
    path: '/shipments',
    component: shipments,
  },
  {
    path: '/ContractCollection',
    component: ContractCollection,
  },
  {
    path: '/CurrentCollection',
    component: CurrentCollection,
  },
  {
    path: '/CollectionOEM',
    component: CollectionOEM,
  },
  {
    path: '/OtherCollection',
    component: OtherCollection,
  },
  {
    path: '/Outsourcingpayment',
    component: Outsourcingpayment,
  },
  {
    path: '/Purchasepayment',
    component: Purchasepayment,
  },
  {
    path: '/Companyflow',
    component: Companyflow,
  },
  {
    path: '/sellAccept',
    component: sellAccept,
  },
  {
    path: '/newOtherCollection',
    component: newOtherCollection,
  },
  {
    path: '/purchasePay',
    component: purchasePay,
  },
  {
    path: '/Piecework',
    component: Piecework,
  },
  {
    path: '/PieceworkList',
    component: PieceworkList,
  },
  {
    path: '/Processwork',
    component: Processwork,
  },
  {
    path: '/Simplework',
    component: Simplework,
  },
  {
    path: '/Processpiecework',
    component: Processpiecework,
  },
  {
    path: '/Simplepiecework',
    component: Simplepiecework,
  },
  {
    path: '/RecordDetail',
    name: 'data',
    component: RecordDetail,
  },
  {
    path: '/Balancies',
    component: Balancies,
  },
]

export default routes
