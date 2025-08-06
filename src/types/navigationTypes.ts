import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {SchedulerProps} from '.'
import {Orederprops} from '../types'
import {QueryObserverResult, RefetchOptions} from '@tanstack/react-query'

export type {NativeStackScreenProps} from '@react-navigation/native-stack'

export type CommonNavigatorParams = {
  MoveFundScreen: {
    currencyName: string
    amount: number
    fromWalletId: string | undefined
    toWalletId: string | undefined
    walletType: string
  }

  MarketOrder: {
    _id: string
    tradeType: string
    targetCurrency: string
    tradingCurrency: string
    currencyRateDisplay: {
      targetRateCurrency: string
      tradingRateCurrency: string
    }
  }
  CreatePaymentType: {currencyName: string | undefined}
  Moderation: undefined
  Payment: undefined
  QuickTrade: undefined
  SingleQuote: {id: string}
  EditQuote: {
    tradingCurrency: string
    id: string
    targetCurrency: string
    tradingCurrencyRate: string
    targetCurrencyRate: string
    min: string
    max: string
    tradeType: string
    bankName: string
    accountNumber: string
    amountRangeCurrencyName: string
    payId: string
    currencyRateDisplay: {
      targetRateCurrency: string
      tradingRateCurrency: string
    }
  }
  AutomaticQuote: {id: string; scheduler: SchedulerProps}

  SingleOrderHistory: {loginUserID: string; _id: string; routeFrom?: string}
  CollectionCedisPay: {routeData: string; currency: string; amount: number}
  CollectionNairaPay: {routeData: string; currency: string; amount: number}
  CollectionXOFPay: {routeData: string; currency: string; amount?: number}
  TrackOrder: {_id: string; loginUserID: string}
  Orders: undefined
  OtpCollectionCedis: {
    paymentStatus?: string
    message?: string
    reference?: string
    paymentId?: string
    orderId?: string
    amount?: number
    currency?: string
    accountName?: string
    accountNumber: string
    bankCode?: string
  }
  CollectionStatus: {
    paymentId: string
    status: string
    currency: string
    amount?: number
    routeFrom?: string
  }
  CollectionSuccess: {msgTitle: string; routeTo: any}
  WithdrawalScreen: {
    currencyName: string
    amount: string | undefined
    walletId: string
    name: string
  }
  SpecificTransactionHistory: {id: string; routeName?: string}
  AddFundScreen: {
    currencyName: string
    amount: string | number
    walletId: string
    paymentChannel?: string
  }
  SetAppPin: {userId: string; emailId: string; userID: string}
  AddFundXOFMobileMoneyPageScreen: {
    currencyName: string
    amount: string | number
    walletId: string
    paymentChannel?: string
  }
  VerifyNewDeviceLogin: {
    pinId?: string
    deviceInfo?: DeviceInfoProps
    emailOrPhone: string
    password?: string
  }
  OfflinePayment: {
    singleOrderData: Orederprops | null
    _id: string
    refetchSingleOrder: (
      options?: RefetchOptions,
    ) => Promise<QueryObserverResult<any, Error>>
  }
}

export type BottomTabNavigatorParams = CommonNavigatorParams & {
  Market: undefined
  QuickTradeTab: undefined
  PaymentTab: undefined
  QuotesTab: undefined
  OrdersTab: undefined
}

export type MainNavigatorParams = {
  MoveFundScreen: {
    currencyName: string
    amount: number
    fromWalletId: string | undefined
    toWalletId: string | undefined
    walletType: string
  }
  Market: undefined
  Lock: undefined
  ProfileScreen: undefined
  ChangePassword: undefined
  TermsAndCondition: undefined
  PrivacyAndPolicy: undefined
  CollectionSuccess: {routeTo: string; msgTitle: string}
  MarketOrder: {
    _id: string
    tradeType: string
    targetCurrency?: string
    tradingCurrency?: string
    currencyRateDisplay: {
      targetRateCurrency: string
      tradingRateCurrency: string
    }
  }
  CreatePaymentType: {currencyName: string | undefined}
  Beneficiary: undefined
  SingleOrderHistory: {loginUserID: string; _id: string; routeFrom?: string}
  SingleQuote: {id: string}
  CreateQuote: undefined
  Quotes: undefined
  EditQuote: {
    tradingCurrency: string
    targetCurrency: string
    id: string
    tradingCurrencyRate: string
    targetCurrencyRate: string
    min: number
    max: number
    tradeType: string
    bankName: string
    accountNumber: string
    payId: string
    amountRangeCurrencyName: string
    currencyRateDisplay: {
      targetRateCurrency: string
      tradingRateCurrency: string
    }
  }
  AutomaticQuote: {id: string; scheduler: SchedulerProps}
  CollectionCedisPay: {routeData: string; currency: string; amount: number}
  CollectionNairaPay: {routeData: string; currency: string; amount: number}
  CollectionXOFPay: {routeData: string; currency: string; amount?: number}
  TrackOrder: {_id: string; loginUserID: string}
  Orders: undefined
  OtpCollectionCedis: {
    paymentStatus?: string
    message?: string
    reference?: string
    paymentId?: string
    orderId?: string
    amount?: number
    currency?: string
    accountName?: string
    accountNumber: string
    bankCode?: string
  }
  OfflinePayment: {
    singleOrderData: Orederprops | null
    _id: string
    refetchSingleOrder: (
      options?: RefetchOptions,
    ) => Promise<QueryObserverResult<any, Error>>
  }
  CollectionStatus: {
    paymentId?: string
    status: string
    currency: string
    amount?: number
    routeFrom?: string
  }
  AccountBalance: undefined
  Login: undefined
  LoginScreen: undefined
  WithdrawalScreen: {
    currencyName: string
    amount: string | number
    walletId: string
    name?: string
  }
  TransactionsHistory: undefined
  SpecificTransactionHistory: {id: string; routeName?: string}
  AddFundScreen: {
    currencyName: string
    amount: string | number
    walletId: string
    paymentChannel?: string
  }
  AddFundXOFMobileMoneyPageScreen: {
    currencyName: string
    amount: string | number
    walletId: string
    paymentChannel?: string
  }
  PhoneLock: undefined
  SetAppPin: undefined
  SecurityScreen: undefined
  UpdatePinScreen: undefined
  Wallet: undefined
}

type DeviceInfoProps = {
  deviceOS: string
  deviceName: string | null
  deviceId: string | null
}

export type AuthNavigatorParams = {
  LoginScreen: undefined
  SignUpAccount: undefined
  ForgetPassword: undefined
  SignUpSccessScreen: undefined
  SetAppPin: {userID: string | undefined}
  VerifyNewDeviceLogin: {
    pinId?: string
    deviceInfo?: DeviceInfoProps
    emailOrPhone?: string | undefined
    password?: string
  }
}

export type NavigationAuthProp = NativeStackNavigationProp<AuthNavigatorParams>

export type NavigationMainProp = NativeStackNavigationProp<MainNavigatorParams>
