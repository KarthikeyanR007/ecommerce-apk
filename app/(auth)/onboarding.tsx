import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/auth.store";

const ACCENT = "#5DBB63";
const ACCENT_SOFT = "rgba(93, 187, 99, 0.12)";
const ACCENT_SOFT_ALT = "rgba(93, 187, 99, 0.08)";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "fresh",
    title: "Fresh picks, fast.",
    subtitle: "Curated daily essentials with seamless delivery at your door.",
    icon: "leaf",
    tint: ACCENT,
  },
  {
    key: "track",
    title: "Track every order.",
    subtitle: "Real-time updates and clear statuses from checkout to doorstep.",
    icon: "time",
    tint: ACCENT,
  },
  {
    key: "secure",
    title: "Simple & secure.",
    subtitle: "Your details stay protected while you shop effortlessly.",
    icon: "shield-checkmark",
    tint: ACCENT,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const listRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFinish = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace(isAuthenticated ? "/home" : "/login");
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      handleFinish();
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(nextIndex);
  };

  return (
    <View className="flex-1 bg-background">
      <View
        pointerEvents="none"
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
        style={{ backgroundColor: ACCENT_SOFT }}
      />
      <View
        pointerEvents="none"
        className="absolute top-52 -left-28 h-72 w-72 rounded-full"
        style={{ backgroundColor: ACCENT_SOFT_ALT }}
      />

      <View className="flex-1">
        <FlatList
          ref={listRef}
          data={slides}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={{ width }} className="flex-1 px-6 justify-center">
              <View
                className="self-start rounded-full px-3 py-1"
                style={{ borderWidth: 1, borderColor: "rgba(93, 187, 99, 0.2)", backgroundColor: ACCENT_SOFT }}
              >
                <Text className="text-xs font-semibold" style={{ color: ACCENT }}>
                  DISCOVER
                </Text>
              </View>
              <View className="mt-10 bg-white border border-gray-100 rounded-3xl px-6 py-8 shadow-md">
                <View
                  className="h-14 w-14 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: item.tint, opacity: 0.14 }}
                >
                  <Ionicons name={item.icon as any} size={26} color={ACCENT} />
                </View>
                <Text className="text-3xl font-extrabold text-textPrimary mt-6">
                  {item.title}
                </Text>
                <Text className="text-textSecondary mt-3 text-base">
                  {item.subtitle}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View className="px-6 pb-10">
        <View className="flex-row justify-center mb-4">
          {slides.map((_, idx) => (
            <View
              key={`dot-${idx}`}
              className="h-2 rounded-full mx-1"
              style={{
                width: idx === activeIndex ? 18 : 8,
                backgroundColor: idx === activeIndex ? ACCENT : "#E5E7EB",
              }}
            />
          ))}
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={handleFinish}>
            <Text className="text-textSecondary font-semibold">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            className="rounded-2xl px-6 py-3 shadow-sm"
            style={{ backgroundColor: ACCENT }}
          >
            <Text className="text-white font-semibold">
              {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
