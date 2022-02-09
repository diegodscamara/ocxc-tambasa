export interface Link {
  rel: string
  href: string
}

export interface CreditCard {
  expirationYear: string
  tokenExpiryDate?: any
  gatewayConfigId: string
  expirationMonth: string
  creditCardType: string
  source: string
  iin: string
  token: string
  cardProps: Object
  nameOnCard: string
  creditCardNumber: string
  repositoryId: string
  nickname: string
  tokenCreatedDate: Date
  cardSavedDate: Date
  id: string
  expirationDayOfMonth?: any
}

export interface ShippingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  address1: string
  postalCode: string
  county?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  repositoryId: string
  state: string
}

export interface BillingAddress {
  country: string
  lastName: string
  types: any[]
  address3?: any
  city: string
  address2?: any
  address1: string
  postalCode: string
  county?: any
  firstName: string
  externalAddressId?: any
  phoneNumber?: any
  repositoryId: string
  state: string
}

export interface Item {
  lastPurchaseDate: Date
  tam_external_id: string
  GDPRProfileP13nConsentDate?: any
  GDPRProfileP13nConsentGranted: boolean
  tam_cpfcnpj?: any
  tam_price_list_id: string
  catalog?: any
  parentOrganization?: any
  shippingSurchargePriceList?: any
  firstPurchaseDate: Date
  profileType?: any
  loyaltyPrograms: any[]
  translations: Object
  lastPurchaseAmount: number
  registrationDate: Date
  lifetimeAOV: number
  id: string
  derivedSalePriceList?: any
  daytimeTelephoneNumber?: any
  tam_cnae?: any
  tam_acrescpf: number
  customerContactId?: any
  taxExempt: boolean
  tam_suframa?: any
  tam_regimeST?: any
  tam_codset?: any
  active: boolean
  lastVisitDate: Date
  taxExemptionCode?: any
  tam_fiscal?: any
  previousVisitDate: Date
  firstName: string
  creditCards: CreditCard[]
  lifetimeCurrencyCode: string
  derivedTaxExemptionCode?: any
  tam_empresa?: any
  userType?: any
  secondaryOrganizations: any[]
  shippingAddresses: ShippingAddress[]
  derivedPriceListGroup?: any
  lastName: string
  gender: string
  tam_ibge?: any
  roles: any[]
  numberOfOrders: number
  locale: string
  login: string
  receiveEmailDate?: any
  lifetimeSpend: number
  tam_razao?: any
  tam_catalog_id: string
  tam_contribuinte?: any
  tam_inscEstadual?: any
  email: string
  numberOfVisits: number
  receiveEmail: string
  priceListGroup?: any
  dateOfBirth?: any
  tam_sitFiscal?: any
  repositoryId: string
  shippingAddress?: any
  firstVisitDate: Date
  lastActivity: Date
  billingAddress: BillingAddress
  derivedShippingSurchargePriceList?: any
}

export interface UserOCC {
  total: number
  totalResults: number
  offset: number
  limit: number
  links: Link[]
  items: Item[]
}
