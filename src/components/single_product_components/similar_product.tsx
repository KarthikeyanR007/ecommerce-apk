import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import SingleCard from "../../components/allitems_components/single_card";
import {api} from "../../lib/api"
import {Product} from "../../types/types"
import { useCartStore } from "@/src/store/cart.store";


interface SimilarProductProps {
    product_id: string;
}

export default function SimilarProduct({ product_id }: SimilarProductProps){
        const [product, setProduct] = useState<Product[]>([]);
        const [favorites, setFavorites] = useState<Set<string>>(new Set());
        const addItem = useCartStore((state) => state.addItem);
        
        useEffect(()=>{
            getSimilarProduct()
        },[product_id]);

        const getItemFavorite = (item: Product) => {
            return favorites.has(item.product_id.toString());
        };
        
        const handleFavoriteToggle = (item: Product) => {
            const id = item.product_id.toString();

            const wasFavorite = favorites.has(id);   // current value
            const isNowFavorite = !wasFavorite;      // after toggle value

            setFavorites(prev => {
                const newFavorites = new Set(prev);

                if (wasFavorite) {
                    newFavorites.delete(id);
                } else {
                    newFavorites.add(id);
                }

                return newFavorites;
            });

            // API call
            handleFavourite(id, isNowFavorite);
        };

        const handleFavourite = async( id:string, isNowFavorite:boolean) => {
            const response = await api.post('/user/favourites', {
                                                product_id: id,
                                                is_favourite: isNowFavorite,
                                            });

            
        }
        
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
});
