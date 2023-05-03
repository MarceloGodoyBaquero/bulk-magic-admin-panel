import {create} from "zustand";


export const useFormStore1 = create()((set) => ({
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
    setCommon: (name: string, value: string) => set((state) => ({common: {...state.common, [name]: value}})),
  })
);

export const useFormStore2 = create()((set) => ({
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
    setHomeScreen: (name: string, value: string) => set((state) => ({
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
    setLanguageMenuScreen: (name: string, value: string) => set((state) => ({
      languageMenuScreen: {
        ...state.languageMenuScreen,
        [name]: value
      }
    })),
  }
));
