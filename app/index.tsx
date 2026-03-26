import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrate = useAuthStore((s) => s.hydrate);
  const [isReady, setIsReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      await hydrate();
      const seen = await AsyncStorage.getItem("hasOnboarded");
      if (isMounted) {
        setHasOnboarded(seen === "true");
        setIsReady(true);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [hydrate]);

  if (!isReady) return null;

  if (!hasOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return isAuthenticated
    ? <Redirect href="/home" />
    : <Redirect href="/login" />;
}
