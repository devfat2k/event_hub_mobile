/**
 * Placeholder screen — sẽ thay bằng Auth/Home screens ở Phase 1.
 * Tạm thời để TypeScript không lỗi khi Navigator không có children.
 */
import { StyleSheet, View } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

export const PlaceholderScreen = () => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={styles.screen}>
      <View style={styles.content}>
        <Text size="xl" weight="bold" style={{ color: colors.text }}>
          EventHub
        </Text>
        <Text size="sm" style={{ color: colors.textDim }}>
          Setup complete — Phase 1 screens coming soon.
        </Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    gap: 8,
  },
  screen: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
