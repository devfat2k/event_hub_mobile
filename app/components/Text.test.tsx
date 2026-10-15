import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"

import { Text } from "./Text"
import { ThemeProvider } from "../theme/context"

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const testText = "Test string"

describe("Text", () => {
  it("should render the component", () => {
    const { getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <Text text={testText} />
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByText(testText)).toBeDefined()
  })

  it("should render with different presets without error", () => {
    const { getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <Text preset="heading-h1" text="Heading 1" />
          <Text preset="title-1" text="Title 1" />
          <Text preset="button-1" text="Button 1" />
          <Text preset="body-1" text="Body 1" />
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByText("Heading 1")).toBeDefined()
    expect(getByText("Title 1")).toBeDefined()
    expect(getByText("Button 1")).toBeDefined()
    expect(getByText("Body 1")).toBeDefined()
  })
})
