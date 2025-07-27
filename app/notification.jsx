import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "charging",
    title: "Charging Complete",
    message:
      "Your vehicle has finished charging at Tesla Supercharger - Downtown",
    time: "2 minutes ago",
    isRead: false,
    icon: "battery-charging-100",
    color: "#4CAF50",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Successful",
    message: "Payment of $12.45 has been processed for your charging session",
    time: "1 hour ago",
    isRead: false,
    icon: "credit-card-check",
    color: "#2196F3",
  },
  {
    id: "3",
    type: "promo",
    title: "Special Offer",
    message: "Get 20% off your next charging session this weekend!",
    time: "3 hours ago",
    isRead: true,
    icon: "gift",
    color: "#FF9800",
  },
  {
    id: "4",
    type: "maintenance",
    title: "Station Maintenance",
    message:
      "Tesla Supercharger - Downtown will be temporarily unavailable tomorrow",
    time: "1 day ago",
    isRead: true,
    icon: "wrench",
    color: "#F44336",
  },
  {
    id: "5",
    type: "system",
    title: "App Update Available",
    message: "A new version of the app is available with improved features",
    time: "2 days ago",
    isRead: true,
    icon: "update",
    color: "#9C27B0",
  },
  {
    id: "6",
    type: "charging",
    title: "Charging Started",
    message: "Charging session has begun at Electrify America - Mall",
    time: "3 days ago",
    isRead: true,
    icon: "battery-charging-50",
    color: "#4CAF50",
  },
];

const NotificationItem = ({ notification, onPress }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          backgroundColor: Colors[theme].background,
          borderBottomColor: Colors[theme].icon + "20",
        },
        !notification.isRead && styles.unreadNotification,
      ]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.notificationContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: notification.color + "20" },
          ]}
        >
          <Icon name={notification.icon} size={24} color={notification.color} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.notificationTitle, { color: Colors[theme].text }]}
            >
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View
                style={[
                  styles.unreadDot,
                  { backgroundColor: notification.color },
                ]}
              />
            )}
          </View>

          <Text
            style={[styles.notificationMessage, { color: Colors[theme].icon }]}
          >
            {notification.message}
          </Text>

          <Text
            style={[styles.notificationTime, { color: Colors[theme].icon }]}
          >
            {notification.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NotificationFilter = ({ activeFilter, onFilterChange }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";

  const filters = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "charging", label: "Charging" },
    { key: "payment", label: "Payment" },
  ];

  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  activeFilter === filter.key
                    ? Colors[theme].tint
                    : Colors[theme].background,
                borderColor: Colors[theme].icon + "30",
              },
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    activeFilter === filter.key
                      ? Colors[theme].background
                      : Colors[theme].text,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function Notification() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";
  const [activeFilter, setActiveFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.isRead;
    return notification.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationPress = (notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );

    // Handle different notification types
    switch (notification.type) {
      case "charging":
        router.push("/(tabs)/transactions");
        break;
      case "payment":
        router.push("/payments");
        break;
      case "promo":
        // Handle promo notification
        console.log("Promo notification pressed");
        break;
      default:
        console.log("Notification pressed:", notification.title);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <AppHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : undefined}
        showBackButton={true}
        showProfile={false}
        onLeftPress={() => router.back()}
      />

      <NotificationFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {unreadCount > 0 && (
        <View style={styles.markAllContainer}>
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={[styles.markAllText, { color: Colors[theme].tint }]}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={handleNotificationPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors[theme].tint]}
            tintColor={Colors[theme].tint}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="bell-off" size={64} color={Colors[theme].icon} />
            <Text style={[styles.emptyTitle, { color: Colors[theme].text }]}>
              No notifications
            </Text>
            <Text style={[styles.emptyMessage, { color: Colors[theme].icon }]}>
              {activeFilter === "all"
                ? "You're all caught up!"
                : `No ${activeFilter} notifications`}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  markAllContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  markAllButton: {
    alignSelf: "flex-end",
  },
  markAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  unreadNotification: {
    backgroundColor: "#f8f9fa",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    fontWeight: "400",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
