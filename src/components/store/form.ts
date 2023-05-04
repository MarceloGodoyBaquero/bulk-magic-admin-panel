import {create} from "zustand";

interface common {
  common: {
    ok: string,
    cancel: string,
    back: string,
    logOut: string,
  },
  commonRef: {
    ok: string,
    cancel: string,
    back: string,
    logOut: string,
  },
  setCommon: (name: string, value: string) => void
}

interface homeScreen {
  homeScreen: {
    header: string,
    bottonLeft: string,
    buttonRight: string,
    textSearchID: string,
    textSearchName: string,
    textButtonFind: string,
    textRegisterMerchant: string,
    textRegisterBuyer: string,
    textReturnDashboardMerchant: string,
    textReturnDashboardBuyer: string,
  },
homeScreenRef: {
  header: string,
  bottonLeft: string,
  buttonRight: string,
  textSearchID: string,
  textSearchName: string,
  textButtonFind: string,
  textRegisterMerchant: string,
  textRegisterBuyer: string,
  textReturnDashboardMerchant: string,
  textReturnDashboardBuyer: string,
  },
  setHomeScreen: (name: string, value: string) => void
}
export const useFormStore1 = create<common>()((set) => ({
    common: {
      ok: "OK!",
      cancel: "Cancel",
      back: "Back",
      logOut: "Log Out",
    },
    commonRef: {
      ok: "OK!",
      cancel: "Cancel",
      back: "Back",
      logOut: "Log Out",
    },
    setCommon: (name: string, value: string) => set((state: any) => ({common: {...state.common, [name]: value}})),
  })
);

export const useFormStore2 = create<homeScreen>()((set) => ({
    homeScreen: {
      header: "The World Leader in Prepaid Bulk Payments",
      bottonLeft: "Store Id number",
      buttonRight: "Store Name",
      textSearchID: "Ask the merchant for their BulkMagic store ID number",
      textSearchName: "Enter the store name",
      textButtonFind: "Find Bulk Deals",
      textRegisterMerchant: "Register as a Merchant",
      textRegisterBuyer: "Register as a Buyer",
      textReturnDashboardMerchant: "Return to dashboard",
      textReturnDashboardBuyer: "Return to dashboard",
    },
    homeScreenRef: {
      header: "The World Leader in Prepaid Bulk Payments",
      bottonLeft: "Store Id number",
      buttonRight: "Store Name",
      textSearchID: "Ask the merchant for their BulkMagic store ID number",
      textSearchName: "Enter the store name",
      textButtonFind: "Find Bulk Deals",
      textRegisterMerchant: "Register as a Merchant",
      textRegisterBuyer: "Register as a Buyer",
      textReturnDashboardMerchant: "Return to dashboard",
      textReturnDashboardBuyer: "Return to dashboard",
    },
    setHomeScreen: (name: string, value: string) => set((state: any) => ({
      homeScreen: {
        ...state.homeScreen,
        [name]: value
      }
    })),
  }
));

export const useFormStore3 = create()((set) => ({
    languageMenuScreen: {
      headerText: "Language",
    },
    languageMenuScreenRef: {
      headerText: "Language",
    },
    setLanguageMenuScreen: (name: string, value: string) => set((state : any) => ({
      languageMenuScreen: {
        ...state.languageMenuScreen,
        [name]: value
      }
    })),
  }
));
