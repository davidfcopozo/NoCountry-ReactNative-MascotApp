import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const COLORS = {
  white: "#fff",
  black: "#1A1A1A",
  blue: "#5D5FEE",
  grey: "#BABBC3",
  light: "#F3F4FB",
  darkBlue: "#7978B5",
  red: "#ff0000"
};
const InputField = ({
  label,
  error,
  password,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="mb-5">
      <Text className="text-sm font-bold color-{#1A1A1A} my-1">{label}</Text>
      <View
        className="w-full"
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.black
              : COLORS.light,
            alignItems: "center"
          }
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.darkBlue, flex: 1 }}
          placeholder={placeholder}
          placeholderTextColor="grey"
          {...props}
        />
      </View>

      {error && <Text className="my-2 text-xs color-[#ff0000]">{error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 5
  }
});

export default InputField;
