import SingleProductScreen from "../../src/screens/app/SingleProductScreen";
import { useLocalSearchParams } from "expo-router";


export default function SingleProductRoute() {
    const { productId } = useLocalSearchParams<{productId?: string;}>();
    return <SingleProductScreen productId={productId ?? ""} />;
}
