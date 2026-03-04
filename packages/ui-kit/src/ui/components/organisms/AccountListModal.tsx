import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { AccountDetail } from '../molecules/AccountDetail';

interface AccountListModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAccount: (account: any) => void;
}

const Accounts = [
  {
    id: '1',
    name: 'Syazwina Main Account',
    nickname: 'Savings',
    accountNumber: '1234 5678 9012',
    bank: 'Maybank',
    currency: 'SGD',
  },
  {
    id: '2',
    name: 'Work Salary Account',
    nickname: 'Payroll',
    accountNumber: '9876 5432 1111',
    bank: 'CIMB',
    currency: 'MYR',
  },
];

export const AccountListModal: React.FC<AccountListModalProps> = ({
  visible,
  onClose,
  onSelectAccount,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Select Account</Text>

          <FlatList
            data={Accounts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelectAccount(item);
                  onClose();
                }}
              >
                <AccountDetail
                  name={item.name}
                  nickname={item.nickname}
                  accountNumber={item.accountNumber}
                  bank={item.bank}
                  currency={item.currency as 'SGD' | 'MYR' | 'IDR'}
                  variant="variant1"
                />
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  closeBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
  },
});
