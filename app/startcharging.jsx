import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import axiosInstance from "@/service/axiosService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedConnector,
  getSelectedConnector,
} from "@/store/reducers/chargeBoxSlice";

export default function StartCharging() {
  const [unitCostTariff, setUnitCostTariff] = useState(12.3);
  const connectorSelector = useSelector(getSelectedConnector);
  const [connector, setConnector] = useState({
    plugType: "CCS2",
    type: "DC",
    power: "30 kW",
    connectorId: "1",
    stationName: "Shyamlalji DC fast charger 1",
    stationAddress: "123, Main Street, Anytown, USA",
  });
  const [localSelectedConnector, setLocalSelectedConnector] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState(12);
  const [unitRateValue, setUnitRateValue] = useState(14);
  const [hourRateValue, setHourRateValue] = useState(100);
  const [cardNumber, setCardNumber] = useState("1234-5678-9012-3456");
  const [isLoading, setIsLoading] = useState(false);
  const unitRateRef = useRef(14);
  const hourRateRef = useRef(100);

  useEffect(() => {
    setUnitRateValue(unitRateRef.current);
    setHourRateValue(hourRateRef.current);
    // Set default selected connector
    if (connectors.length > 0) {
      setLocalSelectedConnector(connectors[0]);
    }
  }, []);

  const fetchActivePaymentCard = async () => {
    try {
      const response = await axiosInstance.get("/payment-card/active");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching active payment card:", error);
    }
  };

  const fetchConnectorTariff = async () => {
    try {
      const response = await axiosInstance.get("/connector-tariff");
      console.log(response.data);
      // todo : will be updated
      //setUnitCostTariff(response.data.);
    } catch (error) {
      console.error("Error fetching connector tariff:", error);
    }
  };

  const confirmStartCharging = async () => {
    try {
      setIsLoading(true);
      console.log("Starting charging with", selectedUnits, "units");

      if (localSelectedConnector) {
        console.log("selected connector PROCEED", localSelectedConnector);
      }
    } catch (error) {
      console.error("Error starting charging:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelStartCharging = () => {
    console.log("Cancel start charging");
    router.back();
  };

  const handleSliderChange = (value) => {
    setSelectedUnits(Math.round(value));
  };

  const handlePresetUnits = (units) => {
    setSelectedUnits(units);
  };

  const estimatedAmount = selectedUnits * unitCostTariff; // ₹14 per unit
  const estimatedTime = Math.round(selectedUnits * 2.5); // 2.5 minutes per unit

  const [connectors, setConnectors] = useState([
    {
      plugType: "CCS2",
      chargeBoxIdentifier: "CPSIM_01",
      type: "DC",
      power: "30 kW",
      connectorId: "1",
      stationName: "Shyamlalji DC fast charger 1",
      stationAddress: "123, Main Street, Anytown, USA",
      connectorStatus: "Available",
      connectorTariff: {
        unitRate: 14,
        hourRate: 100,
      },
    },
    {
      plugType: "CCS1",
      chargeBoxIdentifier: "CPSIM_01",
      type: "DC",
      power: "30 kW",
      connectorId: "2",
      stationName: "Shyamlalji DC fast charger 2",
      stationAddress: "123, Main Street, Anytown, USA",
      connectorStatus: "Available",
      connectorTariff: {
        unitRate: 14,
        hourRate: 100,
      },
    },
  ]);

  const setSelectedConnectorFunc = (childData) => {
    setSelectedConnector(childData);
    setLocalSelectedConnector(childData);
    console.log("selected connector from child component", childData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={cancelStartCharging}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connector details</Text>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => {
            router.push("/helpcenter");
          }}
        >
          <Ionicons name="help-circle" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* connectors list */}
        {connectors.map((connector) => (
          <RenderConnector
            key={connector.connectorId}
            connector={connector}
            setSelectedConnectorFunc={setSelectedConnectorFunc}
            localSelectedConnector={localSelectedConnector}
          />
        ))}

        {/* Plug In and Start Charging Section */}
        <View style={styles.chargingSection}>
          <Text style={styles.sectionTitle}>Plug In and Start Charging</Text>

          {/* Rate Cards */}
          <View style={styles.rateCards}>
            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => {
                setSelectedUnits(12);
              }}
            >
              <Text style={styles.rateLabel}>Units</Text>
              <Text style={styles.rateValue}>{unitRateValue}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rateCard}
              onPress={() => {
                setHourRateValue(100);
              }}
            >
              <Text style={styles.rateLabel}>Hours</Text>
              <Text style={styles.rateValue}>{hourRateValue}/hr</Text>
            </TouchableOpacity>
          </View>

          {/* Charging Units Selection */}
          <View style={styles.unitsSection}>
            <Text style={styles.unitsQuestion}>
              How much unit do you want to charge?
            </Text>

            {/* Slider */}
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderFill,
                    { width: `${(selectedUnits / 60) * 100}%` },
                  ]}
                />
                <View
                  style={[
                    styles.sliderHandle,
                    { left: `${(selectedUnits / 60) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.selectedUnits}>{selectedUnits} units</Text>
            </View>

            <View style={styles.sliderRange}>
              <Text style={styles.rangeText}>0</Text>
              <Text style={styles.rangeText}>60</Text>
            </View>

            {/* Preset Buttons */}
            <View style={styles.presetButtons}>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetUnits(20)}
              >
                <Text style={styles.presetButtonText}>20 units</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetUnits(25)}
              >
                <Text style={styles.presetButtonText}>25 units</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.presetButton}
                onPress={() => handlePresetUnits(30)}
              >
                <Text style={styles.presetButtonText}>30 units</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.estimatedTime}>
              Estimated time : {estimatedTime} mins
            </Text>
          </View>
        </View>
        {/* Payment Details */}
        <View style={styles.connectorSection}>
          <View style={styles.connectorInfo}>
            <View style={styles.connectorImageContainer}>
              <Ionicons name="card" size={54} color="#666" />
              <Text style={styles.connectorType}>Payment Method</Text>
            </View>

            <View style={styles.connectorDetails}>
              <Text style={styles.connectorName}>Payment Method</Text>
              {/* <Text style={styles.stationName}>Active Payment Card</Text> */}

              <View style={styles.connectorSpecs}>
                <View style={styles.specItem}>
                  <Ionicons name="card" size={16} color="#666" />
                  <Text style={styles.specText}>Credit Card</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specText}>{cardNumber}</Text>
                </View>
              </View>

              <View style={styles.compatibilityCheck}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.compatibilityText}>
                  This payment method is active
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Estimated Amount</Text>
          <Text style={styles.amountValue}>
            {estimatedAmount.toFixed(2)} TL
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            isLoading && styles.proceedButtonDisabled,
          ]}
          onPress={confirmStartCharging}
          disabled={isLoading}
        >
          <Text style={styles.proceedButtonText}>
            {isLoading ? "Processing..." : "Proceed"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const RenderConnector = ({
  connector,
  setSelectedConnectorFunc,
  localSelectedConnector,
}) => {
  const dispatch = useDispatch();

  // Check if this connector is currently selected
  const isSelected =
    localSelectedConnector &&
    localSelectedConnector.connectorId === connector.connectorId;

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedConnectorFunc(connector);
        //dispatch(setSelectedConnector(connector));
        console.log("selected connector", connector);
      }}
    >
      <View
        style={[
          styles.connectorSection,
          isSelected && styles.selectedConnectorSection,
        ]}
      >
        <View style={styles.connectorInfo}>
          <View style={styles.connectorImageContainer}>
            {connector.plugType === "CCS1" && (
              <MaterialCommunityIcons
                name="ev-plug-ccs1"
                size={54}
                color={isSelected ? "#fff" : "black"}
                style={{ marginBottom: 10, marginTop: 2 }}
              />
            )}
            {connector.plugType === "CCS2" && (
              <MaterialCommunityIcons
                name="ev-plug-ccs2"
                size={54}
                color={isSelected ? "#fff" : "black"}
                style={{ marginBottom: 10, marginTop: 2 }}
              />
            )}
            <Text
              style={[
                styles.connectorType,
                isSelected && styles.selectedConnectorType,
              ]}
            >
              {connector.plugType}
            </Text>
          </View>
          <View style={styles.connectorDetails}>
            <Text
              style={[
                styles.connectorName,
                isSelected && styles.selectedConnectorName,
              ]}
            >
              Connector {connector.connectorId}
            </Text>
            <Text
              style={[
                styles.stationName,
                isSelected && styles.selectedStationName,
              ]}
            >
              {connector.stationName}
            </Text>

            <View style={styles.connectorSpecs}>
              <View style={styles.specItem}>
                <Ionicons
                  name="flash"
                  size={16}
                  color={isSelected ? "#fff" : "#666"}
                />
                <Text
                  style={[
                    styles.specText,
                    isSelected && styles.selectedSpecText,
                  ]}
                >
                  {connector.plugType}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Ionicons
                  name="flash"
                  size={16}
                  color={isSelected ? "#fff" : "#666"}
                />
                <Text
                  style={[
                    styles.specText,
                    isSelected && styles.selectedSpecText,
                  ]}
                >
                  {connector.type}
                </Text>
                <Text
                  style={[
                    styles.specText,
                    isSelected && styles.selectedSpecText,
                  ]}
                >
                  {connector.power}
                </Text>
              </View>
            </View>

            {/* Selection indicator */}
            {isSelected && (
              <View style={styles.selectionIndicator}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.selectionText}>Selected</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  helpButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  connectorSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  connectorInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  connectorImageContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  connectorImage: {
    width: 60,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  connectorPins: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  pin: {
    width: 6,
    height: 6,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  connectorType: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  connectorDetails: {
    flex: 1,
  },
  connectorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  stationName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  connectorSpecs: {
    flexDirection: "row",
    marginBottom: 12,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  specText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  compatibilityCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  compatibilityText: {
    fontSize: 12,
    color: "#4CAF50",
    marginLeft: 8,
    flex: 1,
  },
  chargingSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
  rateCards: {
    flexDirection: "row",
    marginBottom: 24,
  },
  rateCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  rateLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  unitsSection: {
    marginBottom: 20,
  },
  unitsQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    position: "relative",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#2196F3",
    borderRadius: 2,
  },
  sliderHandle: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2196F3",
    top: -8,
    marginLeft: -10,
  },
  selectedUnits: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 16,
    minWidth: 80,
  },
  sliderRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rangeText: {
    fontSize: 12,
    color: "#666",
  },
  presetButtons: {
    flexDirection: "row",
    marginBottom: 16,
  },
  presetButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  estimatedTime: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  bottomSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: "600",
    // color: Colors.green.primary,
    color: Colors.blue2.primary,
  },
  proceedButton: {
    //backgroundColor: "#FF9800",
    backgroundColor: Colors.green.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  proceedButtonDisabled: {
    backgroundColor: "#ccc",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedConnectorSection: {
    borderColor: Colors.blue2.primary,
    borderWidth: 2,
    backgroundColor: "#e0f7fa", // Light blue background for selected
  },
  selectedConnectorType: {
    color: "#fff",
    backgroundColor: Colors.blue2.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  selectedConnectorName: {
    color: Colors.blue2.primary,
  },
  selectedStationName: {
    color: Colors.blue2.primary,
  },
  selectedSpecText: {
    color: "#fff",
  },
  selectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Colors.blue2.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 8,
  },
});
