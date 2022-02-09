
export interface Catalog {
  displayName: string
  id: string
  status: string
}

export interface Address0 {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface Address {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber: string
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface SecondaryAddresses {
  'Address##0': Address0
  Address: Address
}

export interface Owner {
  lastName: string
  firstName: string
  middleName?: any
  id: string
}

export interface LastModifiedBy {
  lastName: string
  firstName: string
  middleName?: any
  id: string
}

export interface Item {
  productId: string
  quantityDesired: number
  repositoryId: string
  siteId?: any
  id: string
  catRefId: string
}

export interface PurchaseList {
  owner: Owner
  accountId?: any
  lastModifiedDate: Date
  lastModifiedBy: LastModifiedBy
  name: string
  repositoryId: string
  description?: any
  siteId: string
  id: string
  creationDate: Date
  items: Item[]
  sharedWithOthers: boolean
}

export interface HomeAddress {
  country: string
  lastName?: any
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName?: any
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface ShippingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber: string
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface DerivedBillingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface SiteUS {
  numberOfVisits: number
  GDPRProfileP13nConsentDate?: any
  GDPRProfileP13nConsentGranted: boolean
  receiveEmail: string
  receiveEmailDate?: any
}

export interface SiteProperties {
  siteUS: SiteUS
}

export interface PriceListGroup {
  displayName: string
  repositoryId: string
}

export interface Address02 {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface Address2 {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber: string
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface AllSecondaryAddresses {
  'Address##0': Address02
  Address: Address2
}

export interface DerivedShippingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface ShippingAddress2 {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface BillingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  prefix?: any
  address1: string
  postalCode: string
  companyName?: any
  county?: any
  suffix?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  faxNumber?: any
  middleName?: any
  state: string
  id: string
}

export interface AbandonedOrder {
  'item-id': string
  orderId: string
  profileId: string
}

export interface Profile {
  tam_external_id: string
  accessTokenSigningKey: string
  favoriteStores: any[]
  GDPRProfileP13nConsentGranted: boolean
  tam_price_list_id: string
  catalog: Catalog
  allowPartialShipment: boolean
  secondaryAddresses: SecondaryAddresses
  passwordResetTokenSigningKey: string
  securityStatus: number
  shippingSurchargePriceList: Object
  purchaseLists: PurchaseList[]
  loyaltyPrograms: any[]
  lastPurchaseAmount: number
  registrationDate: Date
  lifetimeAOV: number
  id: string
  ancestors: any[]
  homeAddress: HomeAddress
  tam_acrescpf: number
  taxExempt: boolean
  active: boolean
  abandonedOrderCount: number
  firstName: string
  emailStatus: string
  derivedApprovalRequired: boolean
  expressCheckout: boolean
  secondaryOrganizations: any[]
  shippingAddresses: ShippingAddress[]
  lastName: string
  gender: string
  roles: any[]
  approvers: any[]
  numberOfOrders: number
  login: string
  priceList: Object
  derivedBillingAddress: DerivedBillingAddress
  lifetimeSpend: number
  member: boolean
  tam_catalog_id: string
  salePriceList: Object
  activePromotions: any[]
  email: string
  numberOfVisits: number
  siteProperties: SiteProperties
  comments: any[]
  receiveEmail: string
  priceListGroup: PriceListGroup
  allSecondaryAddresses: AllSecondaryAddresses
  allApprovers: any[]
  currentLocation: string
  derivedShippingAddress: DerivedShippingAddress
  shippingAddress: ShippingAddress2
  lastActivity: Date
  billingAddress: BillingAddress
  abandonedOrders: AbandonedOrder[]
}

export interface Request {
  profile: Profile
  siteId: string
}

export interface RequestOccWebhook {
  request: Request
}
