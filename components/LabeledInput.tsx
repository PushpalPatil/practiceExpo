import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";

interface Props {
      label: string;
      value: string;
      placeholder?: string;
      onPress?: () => void;      // for fields that open pickers
      onChangeText?: (v: string) => void;
      containerStyle?: ViewStyle;
      editable?: boolean;
}

export const LabeledInput: FC<Props> = ({
      label,
      value,
      placeholder,
      onPress,
      onChangeText,
      containerStyle,
      editable = true,
}) => (
      <View style={[styles.wrapper, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                  value={value}
                  placeholder={placeholder}
                  placeholderTextColor="#999"
                  style={styles.input}
                  onChangeText={onChangeText}
                  editable={editable}
                  onPressIn={onPress}
            />
      </View>
);

const styles = StyleSheet.create({
      wrapper: { width: "100%", alignItems: "center", marginBottom: 16 },
      label: { color: "#d1d1d1", alignSelf: "flex-start", marginLeft: "15%" },
      input: {
            width: "70%",
            height: 48,
            borderWidth: 1,
            borderColor: "#444",
            borderRadius: 8,
            paddingHorizontal: 16,
            color: "white",
      },
});
