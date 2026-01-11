import React, { createContext, useContext, useState } from "react";

export type Tab = "home" | "my-series" | "activity" | "discover" | "profile";

const TabContext = createContext<{
  lastTab: Tab;
  setLastTab: (tab: Tab) => void;
}>({
  lastTab: "home",
  setLastTab: () => {},
});

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [lastTab, setLastTab] = useState<Tab>("home");
  return (
    <TabContext.Provider value={{ lastTab, setLastTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  return useContext(TabContext);
}
