import { ActivityIndicator, StyleSheet, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import DeliveryAddress from "../../components/home_components/delivery_address";
import SearchBar from "../../components/home_components/search_bar";
import HomeCategory from "../../components/home_components/home_category";
import Voucher from "../../components/home_components/voucher";
import BottomNav from "../../components/home_components/bottom_nav";
import BestOffers from "../../components/home_components/best_offers";
import { Colors } from "@/constants/theme";

export default function Homescreen() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [checkingCreds, setCheckingCreds] = useState(true);

  useEffect(() => {
    let active = true;
    const loadCreds = async () => {
      try {
        const entries = await AsyncStorage.multiGet(["email", "password"]);
        if (!active) return;
        const emailEntry = entries.find(([k]) => k === "email");
        const passwordEntry = entries.find(([k]) => k === "password");
        const email = emailEntry?.[1] ?? "";
        const password = passwordEntry?.[1] ?? "";
        setStoredEmail(email);
        setStoredPassword(password);
        if (!email || !password) {
          router.replace("/(auth)/login");
        }
      } catch {
        if (!active) return;
        setStoredEmail("");
        setStoredPassword("");
        router.replace("/(auth)/login");
      } finally {
        if (active) setCheckingCreds(false);
      }
    };
    loadCreds();
    return () => {
      active = false;
    };
  }, [router]);

  if (checkingCreds) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#5DBB63" />
      </View>
    );
  }
  
  return (
    <View style={styles.screen}>
      <ScrollView
        style={[styles.scroll, { backgroundColor: Colors.light.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.DeliveryAddress_container}>
          <DeliveryAddress />
          {/* <View style={styles.savedCreds}>
            <Text style={styles.savedTitle}>Saved Local Credentials</Text>
            <Text style={styles.savedValue}>Email: {storedEmail || "-"}</Text>
            <Text style={styles.savedValue}>
              Password: {storedPassword ? "•".repeat(Math.min(storedPassword.length, 12)) : "-"}
            </Text>
          </View> */}
          <SearchBar
            value={categoryFilter}
            onChangeText={setCategoryFilter}
            onClear={() => setCategoryFilter("")}
          />
          <HomeCategory filterText={categoryFilter} />
          <Voucher />
          {/* <BestOffers /> */}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DeliveryAddress_container: {
    marginTop: 25,
    alignItems: 'center',
  },
  savedCreds: {
    width: "92%",
    backgroundColor: "#F7FDF8",
    borderColor: "#DCEFE1",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 6,
  },
  savedTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 6,
  },
  savedValue: {
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 2,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
