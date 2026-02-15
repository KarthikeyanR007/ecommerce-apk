import { useLocalSearchParams } from "expo-router";
import AllItems from "../../src/screens/app/AllItems";

export default function AllItemsRoute() {
  const { categoryId, categoryTitle } = useLocalSearchParams<{
    categoryId?: string;
    categoryTitle?: string;
  }>();

  const resolvedCategoryId = Array.isArray(categoryId)
    ? categoryId[0]
    : categoryId;
  const resolvedCategoryTitle = Array.isArray(categoryTitle)
    ? categoryTitle[0]
    : categoryTitle;

  return (
    <AllItems
      categoryId={resolvedCategoryId}
      categoryTitle={resolvedCategoryTitle}
    />
  );
}
