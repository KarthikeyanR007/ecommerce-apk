import { View } from "react-native";
import TopHeader from "../../components/allitems_components/top_header";

type AllItemsProps = {
    categoryId?: string;
    categoryTitle?: string;
};

export default function AllItems({ categoryId, categoryTitle }: AllItemsProps) {
    const headerTitle = categoryTitle
        ? `All Items - ${categoryTitle}`
        : categoryId
        ? `All Items - ${categoryId}`
        : "All Items";

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}> 
            <TopHeader title={headerTitle} /> 
        </View>
    );
}
