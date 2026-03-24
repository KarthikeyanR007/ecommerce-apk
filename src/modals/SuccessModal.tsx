import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  data: {
    user_order_id: string;
    delivery_date: string;
    total_amount: number;
    status: string;
  } | null;
  onClose: () => void;
};

const SuccessModal: React.FC<Props> = ({ visible, data, onClose }) => {
  if (!data) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>🎉</Text>
          <Text style={styles.title}>Order Confirmed</Text>
          <View style={styles.orderIdBox}>
            <Text style={styles.orderIdLabel}>Order ID</Text>
            <Text style={styles.orderId}>{data.user_order_id}</Text>
          </View>
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Date</Text>
              <Text style={styles.value}>{data.delivery_date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.value}>₹{data.total_amount.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.status}>{data.status}</Text>
            </View>
          </View>

          {/* ✅ Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Awesome 🚀</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },

  icon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  orderIdBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },

  orderIdLabel: {
    fontSize: 12,
    color: '#888',
  },

  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },

  details: {
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  label: {
    color: '#555',
    fontSize: 14,
  },

  value: {
    fontWeight: '600',
    fontSize: 14,
  },

  status: {
    color: 'green',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});