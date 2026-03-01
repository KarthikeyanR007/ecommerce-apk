import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type OrderResult = {
  type: "success" | "error";
  message: string;
};

type OrderResultModalProps = {
  result: OrderResult | null;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function OrderResultModal({
  result,
  onClose,
  onSuccess,
}: OrderResultModalProps) {
  if (!result) return null;

  const isSuccess = result.type === "success";

  return (
    <Modal
      transparent
      animationType="fade"
      visible
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalIconWrap}>
            <View style={styles.modalIconInner}>
              <Ionicons
                name={isSuccess ? "lock-closed" : "alert-circle"}
                size={26}
                color="#fff"
              />
            </View>
          </View>

          <Text style={styles.modalTitle}>
            {isSuccess ? "Order Placed\nSuccessfully" : "Order Failed"}
          </Text>
          <Text style={styles.modalMessage}>{result.message}</Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              onClose();
              if (isSuccess) {
                onSuccess?.();
              }
            }}
          >
            <Text style={styles.modalButtonText}>
              {isSuccess ? "View Order Status" : "Close"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 26,
    paddingHorizontal: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 6,
  },
  modalIconWrap: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#E6F4EA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  modalIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#51B95A",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  modalMessage: {
    marginTop: 10,
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  modalButton: {
    marginTop: 18,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 180,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
});
