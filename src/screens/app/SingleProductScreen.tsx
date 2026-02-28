import { View, Text, StyleSheet } from "react-native";
import {useEffect} from "react";
import Header from "@/src/components/single_product_components/header";
import ProductDetails from "@/src/components/single_product_components/product_details";

type Props = { productId: string };
export default function SingleProductScreen({ productId }: Props) {
    useEffect(()=>{console.log('product_id 123 ',productId)})

  return (
    <View style={styles.screen}>
      <Header />
      <ProductDetails/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffff"
  }
})
