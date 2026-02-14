import { StyleSheet, ScrollView , View } from "react-native";
import DeliveryAddress from "../../components/home_components/delivery_address";
import SearchBar from "../../components/home_components/search_bar";
import HomeCategory from "../../components/home_components/home_category";
import Voucher from "../../components/home_components/voucher";

export default function Homescreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.DeliveryAddress_container}>
        <DeliveryAddress />
        <SearchBar />
        <HomeCategory />
        <Voucher />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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