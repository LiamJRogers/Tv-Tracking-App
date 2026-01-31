import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export function useDrawerSlideAnim(open: boolean) {
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : 400,
      duration: open ? 300 : 200,
      easing: open ? Easing.out(Easing.ease) : Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [open, slideAnim]);

  return slideAnim;
}
