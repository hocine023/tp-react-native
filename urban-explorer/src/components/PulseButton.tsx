import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

type PulseButtonProps = PropsWithChildren<TouchableOpacityProps>;

export const PulseButton: React.FC<PulseButtonProps> = ({ children, style, ...rest }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.06,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity {...rest} style={[styles.button, style]}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#004aad",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignItems: "center",
  },
});