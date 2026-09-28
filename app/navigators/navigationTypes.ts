import { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// App Stack Navigator types
// Screens sẽ được thêm vào theo từng Phase implement
export type AppStackParamList = {
  // Placeholder — sẽ thay bằng Auth/Main screens ở Phase 1
  Placeholder: undefined
  // Phase 1 — Auth
  // Login: undefined
  // Register: undefined
  // ForgotPassword: undefined
  // Phase 2+ — Main (Bottom Tab)
  // Main: NavigatorScreenParams<MainTabParamList>
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}
