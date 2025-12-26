import React from "react";
import { AuthProvider } from "../hooks/AuthContext";
import { TabProvider } from "../hooks/TabContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TabProvider>
        <Slot />
      </TabProvider>
    </AuthProvider>
  );
}
