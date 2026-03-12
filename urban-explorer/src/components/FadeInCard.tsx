import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

type FadeInCardProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export const FadeInCard: React.FC<FadeInCardProps> = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.card, style, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
});