import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import SingleCard from "../../components/allitems_components/single_card";
import {api} from "../../lib/api"
import {Product} from "../../types/types"
import BottomCard from "@/src/components/allitems_components/bottom_card"
import { useCartStore } from "@/src/store/cart.store";


interface SimilarProductProps {
    product_id: string;
    bottomCard?: {
        itemsLabel?: string;
        totalLabel?: string;
        buttonLabel?: string;
        imageSource?: any;
        onPress?: () => void;
    };
}

export default function SimilarProduct({ product_id, bottomCard }: SimilarProductProps){
        const [product, setProduct] = useState<Product[]>([]);
        const [favorites, setFavorites] = useState<Set<string>>(new Set());
        const addItem = useCartStore((state) => state.addItem);
        
        useEffect(()=>{
            getSimilarProduct()
            console.log([
                'itemsLabel ', bottomCard?.itemsLabel,
                'totalLabel ', bottomCard?.totalLabel
            ])
        },[product_id]);

        const getItemFavorite = (item: Product) => {
            return favorites.has(item.product_id.toString());
        };
        
        const handleFavoriteToggle = (item: Product) => {
            const id = item.product_id.toString();
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(id)) {
                    newFavorites.delete(id);
                } else {
                    newFavorites.add(id);
                }
                return newFavorites;
            });
        };
        
        const getSimilarProduct = async() => {
            try {
                const response = await api.get<Product[]>(`/products/similar/${product_id}`);
                const data = response.data;
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        }
        return(
         <View style={{ flex: 1 }}>
          <Text style={styles.titleStyle}>Similar Products</Text>
          <View style={styles.grid}>
            {product.map((item) => (
              <SingleCard
                key={item.product_id.toString()}
                item={item}
                placeholderImage={require("../../../assets/images/icon.png")}
                onAdd={(item) => addItem(item, 1)}
                isFavorite={getItemFavorite(item)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </View>
            {bottomCard && 
             <View  style={styles.bottomCardContainer}>
                 <BottomCard {...bottomCard} />
             </View>
            }
         </View>
        )
}


const styles =   StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingBottom: 16,
    },
    titleStyle:{
        fontWeight:800,
        fontSize:18,
        textAlign: "left",
        paddingHorizontal: 25,
        marginTop: 10,
        marginBottom:10
    },
    bottomCardContainer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: "center",
    },
});
