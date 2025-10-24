import { Platform } from "react-native";
import Constants from "expo-constants";

/**
 * API Konfiguration für verschiedene Umgebungen
 */

// WICHTIG: Deine Computer IP-Adresse hier eintragen für physisches Gerät!
// Finde deine IP: System Settings → Network → WiFi → Details → IP Address
const YOUR_COMPUTER_IP = "192.168.2.62";

const getApiUrl = (): string => {
  // Production
  if (!__DEV__) {
    return "https://api.aura-app.com/api";
  }

  // Development
  const { manifest } = Constants;

  // Expo Go auf physischem Gerät
  if (manifest?.debuggerHost) {
    const host = manifest.debuggerHost.split(":")[0];
    console.log("📱 Detected Expo debuggerHost:", host);
    // Verwende die IP aus Expo's debuggerHost
    return `http://${host}:5094/api`;
  }

  // Check if we're on a real device (not simulator)
  // Real devices should use the LAN IP, not localhost
  const isSimulator = Platform.OS === "ios" && (
    Platform.isTV ||
    // @ts-ignore - checking for simulator
    Constants.platform?.ios?.simulator === true
  );

  if (!isSimulator) {
    console.log("📱 Real device detected, using LAN IP:", YOUR_COMPUTER_IP);
    return `http://${YOUR_COMPUTER_IP}:5094/api`;
  }

  // iOS Simulator
  if (Platform.OS === "ios") {
    return "http://localhost:5094/api";
  }

  // Android Emulator
  if (Platform.OS === "android") {
    return "http://10.0.2.2:5094/api";
  }

  // Fallback: Verwende eingetragene IP
  return `http://${YOUR_COMPUTER_IP}:5094/api`;
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  TIMEOUT: 15000,
};

// Debug Logging
console.log("🌐 API URL:", API_CONFIG.BASE_URL);
console.log("📱 Platform:", Platform.OS);
console.log("🔧 DEV Mode:", __DEV__);
