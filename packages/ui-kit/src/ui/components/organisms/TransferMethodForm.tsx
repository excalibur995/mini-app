// libs/ui/src/components/organisms/TransferList.tsx
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Hyperlink } from "../atoms";
import { Dropdown } from "../atoms/Dropdown";
import { Icon } from "../atoms/Icon";
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import {
  TransferModeDetails,
  TransferModeProps,
} from "../molecules/TransferModeDetails";
import { theme } from "../../../theme/theme";
import { ModalTable } from "./ModalTable";
import { TransferModeDrawer } from "./TransferModeDrawer";

export type TransferModePropsWithTable = TransferModeProps & {
  tableData?: (string | number)[][];
  tableTitle?: string;
  tableSubheading?: string;
};

type TransferMethodFormProps = {
  transferModes: TransferModePropsWithTable[];
};

export const TransferMethodForm: React.FC<TransferMethodFormProps> = ({
  transferModes,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [remark, setRemark] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const purposeOptions = ["Fund Transfer ", "Option 2", "Option 3"];

  const handleModeSelect = (id: string) => {
    console.log("id", id);
    setSelectedModeId(id);
    setIsDrawerOpen(false); // ✅ Close drawer after selection
  };

  const selectedMode = transferModes.find((m) => m.id === selectedModeId);
  const [showTableModal, setShowTableModal] = useState(false);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Transfer Mode */}
        <View style={styles.fieldContainer}>
          <Label weight="medium" size="small" style={styles.fieldLabel}>
            Transfer Mode
          </Label>

          {/* Clickable Dropdown that opens drawer */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDrawerOpen(true)}
          >
            <Text
              style={[
                styles.dropdownText,
                !selectedMode && styles.placeholderText,
              ]}
            >
              {selectedMode?.title || "Select Transfer Mode"}
            </Text>
            <Icon icon="keyboard-arrow-down" size={24} color="#9E9E9E" />
          </TouchableOpacity>
        </View>

        {/* Show selected mode preview below dropdown */}
        {selectedModeId === "BI-SKN" && selectedMode && (
          <View style={styles.selectedModePreview}>
            <View style={styles.selectedModeContent}>
              <Text style={styles.selectedModeText}>
                {selectedMode.description}
              </Text>
              {selectedMode.tableData &&
                selectedMode.tableTitle &&
                selectedMode.tableSubheading && (
                  <Hyperlink
                    text="Learn More"
                    onPress={() => setShowTableModal(true)}
                  />
                )}
            </View>

            {selectedMode.tableData &&
              selectedMode.tableTitle &&
              selectedMode.tableSubheading && (
                <ModalTable
                  visible={showTableModal}
                  onClose={() => setShowTableModal(false)}
                  title={selectedMode.tableTitle || selectedMode.title}
                  subheading={selectedMode.tableSubheading}
                  tableData={selectedMode.tableData}
                />
              )}
          </View>
        )}

        {/* Purpose of Transfer */}
        <View style={styles.fieldContainer}>
          <Label weight="medium" size="small" style={styles.fieldLabel}>
            Purpose of Transfer
          </Label>
          <Dropdown
            options={purposeOptions}
            selected={purpose || undefined}
            placeholder="Select Purpose"
            onSelect={setPurpose}
            style={styles.dropdownStyle}
          />
        </View>

        {/* Remark */}
        <View style={styles.fieldContainer}>
          <Label weight="medium" size="small" style={styles.fieldLabel}>
            Remark
          </Label>
          <Input
            value={remark}
            onChangeText={setRemark}
            placeholder="Optional"
          />
        </View>

        {/* Recipient Email */}
        <View style={styles.fieldContainer}>
          <Label weight="medium" size="small" style={styles.fieldLabel}>
            Recipient Email
          </Label>
          <Input
            value={recipientEmail}
            onChangeText={setRecipientEmail}
            placeholder="Optional"
          />
        </View>
      </ScrollView>

      {/* Bottom Drawer for Transfer Mode Selection */}
      <TransferModeDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        height="70%"
      >
        <Label weight="bold" size="large" style={styles.drawerTitle}>
          Select Transfer Mode
        </Label>

        {/* ✅ List of all transfer modes - clickable */}
        <TransferModeDetails
          modes={transferModes}
          selectedModeId={selectedModeId}
          onSelectMode={handleModeSelect} // ✅ This handles selection & closes drawer
        />
      </TransferModeDrawer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    marginBottom: 8,
    color: "#9E9E9E",
    fontSize: 12,
  },
  dropdownStyle: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    minHeight: 48,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    minHeight: 48,
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.medium,
    color: "#000000",
    fontWeight: "600",
  },
  placeholderText: {
    color: "#9E9E9E",
    fontWeight: "600",
  },
  selectedModePreview: {
    marginTop: 0,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedModeContainer: {
    marginTop: 8,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedModeContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  selectedModeText: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 20,
  },
  drawerTitle: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
});
