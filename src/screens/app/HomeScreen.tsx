import { StyleSheet, ScrollView , View } from "react-native";
import DeliveryAddress from "../../components/home_components/delivery_address";
import SearchBar from "../../components/home_components/search_bar";
import HomeCategory from "../../components/home_components/home_category";
import Voucher from "../../components/home_components/voucher";
import BottomNav from "../../components/home_components/bottom_nav";
import BestOffers from "../../components/home_components/best_offers";
import { Colors } from "@/constants/theme";

export default function Homescreen() {
  return (
    <View style={styles.screen}>
      <ScrollView
        style={[styles.scroll, { backgroundColor: Colors.light.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.DeliveryAddress_container}>
          <DeliveryAddress />
          <SearchBar />
          <HomeCategory />
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
    marginTop: 55,
    alignItems: 'center',
  },
});
