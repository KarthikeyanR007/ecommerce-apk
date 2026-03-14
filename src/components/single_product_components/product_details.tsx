import { View, Text, StyleSheet, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useEffect, useMemo, useState} from "react";
import { api } from "@/src/lib/api";
import { getImageUrl } from "@/src/utils/image";

type ProductDetailsProps = {
    product_id: string;
};

type ApiProduct = {
    discount?: number | string;
    name: string;
    description: string | null;
    price: number | string;
    image: string;
    favourite?: boolean | number;
    category_id: number;
};

type ProductDetailsData = {
    name: string;
    description: string | null;
    price: number;
    image: string;
    favourite: boolean;
    discount: number;
    category_id: number;
};

export default function ProductDetails({ product_id }: ProductDetailsProps){
    const placeholderImage = require("../../../assets/project_image/goldOil.jpg");
    const [product, setProduct] = useState<ProductDetailsData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const toNumber = (value: unknown, fallback = 0) => {
        if (typeof value === "number" && Number.isFinite(value)) return value;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    };

    useEffect(()=>{
        getSingleProduct(product_id);
    },[product_id]);


    const getSingleProduct = async(product_id:string) => {
        setIsLoading(true);
        try {
            const response = await api.get<ApiProduct>(
                `/getSingleProduct/${product_id}`
            );
            const data = response.data;
            if (!data) {
                setProduct(null);
                return;
            }
            setProduct({
                name: data.name,
                description: data.description ?? "",
                price: toNumber(data.price, 0),
                image: data.image,
                favourite:
                    data.favourite === true ||
                    data.favourite === 1,
                discount: data.discount ? toNumber(data.discount, 0) : 0,
                category_id: data.category_id,
            });
        } catch (error) {
            console.error("Failed to load product", error);
            setProduct(null);
        } finally {
            setIsLoading(false);
        }
    }

    const imageSource = useMemo(() => {
        if (product?.image) {
            return { uri: getImageUrl(product.image) }; // string path → uri object
        }
        return placeholderImage; // local require → use directly
    }, [product?.image, placeholderImage]);

    useEffect(()=>{
        console.log('imageSource 123 000 ',imageSource)
    },[])

    return(
        <View
          style={styles.container}
          accessibilityLabel={`product-details-${product_id}`}
        >
           <Image source={imageSource} style={styles.img_style} />
           <Text style={styles.product_name}>
            {product?.name ?? (isLoading ? "Loading..." : "Product")}
           </Text>
           <View style={styles.ratingRow}>
             <View style={styles.stars}>
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star" size={16} color="#F59E0B" />
               <Ionicons name="star-outline" size={16} color="#F59E0B" />
             </View>
             <Text style={styles.ratingText}>4.0 (146 Reviews)</Text>
           </View>
           <View style={styles.priceRow}>
             <Text style={styles.priceCurrent}>
                ${toNumber(product?.price, 0).toFixed(2)}
             </Text>
             {/* <Text style={styles.priceOld}>$14</Text> */}
             <View style={styles.discountBadge}>
               <Text style={styles.discountText}>{product?.discount}</Text>
             </View>
           </View>
           <Text style={styles.sectionTitle}>Description</Text>
           <Text style={styles.description}>
             {product?.description?.trim()
                ? product.description
                : isLoading
                  ? "Loading..."
                  : "No description available."}{" "}
             <Text style={styles.readMore}>Read More</Text>
           </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        alignItems:'center',
        paddingHorizontal: 16,

    },
    img_style: {
        width: '70%',
        height: 200,
        resizeMode: "contain",
        marginTop:50,
    },
    product_name: {
        fontSize: 20,
        fontWeight: 800,
        marginTop: 30,
        width: "100%",
        textAlign: "left",
        paddingHorizontal: 16,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 6,
    },
    stars: {
        flexDirection: "row",
        gap: 2,
        marginRight: 8,
    },
    ratingText: {
        fontSize: 12,
        color: "#6B7280",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 10,
    },
    priceCurrent: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginRight: 8,
    },
    priceOld: {
        fontSize: 12,
        color: "#9CA3AF",
        textDecorationLine: "line-through",
        marginRight: 8,
    },
    discountBadge: {
        backgroundColor: "#22C55E",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    discountText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#fff",
    },
    sectionTitle: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 16,
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },
    description: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 8,
        fontSize: 12,
        lineHeight: 18,
        color: "#6B7280",
    },
    readMore: {
        color: "#10B981",
        fontWeight: "700",
    },
})
