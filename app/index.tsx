import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrate = useAuthStore((s) => s.hydrate);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    hydrate().finally(() => {
      if (isMounted) setIsReady(true);
    });
    return () => {
      isMounted = false;
    };
  }, [hydrate]);

  if (!isReady) return null;

  return isAuthenticated
    ? <Redirect href="/home" />
    : <Redirect href="/login" />;
}
