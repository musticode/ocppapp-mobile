import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CATEGORIES = [
  "Account",
  "Services",
  "General",
  "Booking",
  "Charging Station",
];
const FAQS = [
  {
    question: "What is EV PlugMap?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How to use EV PlugMap?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How to Cancel Booking?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How to see saved stations?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How to plan trip?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "How to add vehicle?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function HelpCenter() {
  const router = useRouter();
  const [tab, setTab] = useState("FAQ");
  const [category, setCategory] = useState("Account");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 38 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabBtn} onPress={() => setTab("FAQ")}>
            <Text
              style={[styles.tabText, tab === "FAQ" && styles.tabTextActive]}
            >
              FAQ
            </Text>
            {tab === "FAQ" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBtn}
            onPress={() => setTab("Contact Us")}
          >
            <Text
              style={[
                styles.tabText,
                tab === "Contact Us" && styles.tabTextActive,
              ]}
            >
              Contact Us
            </Text>
            {tab === "Contact Us" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>
        {/* Category Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
          contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                category === cat && styles.categoryBtnActive,
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* FAQ Accordion */}
        <View style={styles.accordionList}>
          {FAQS.map((faq, idx) => (
            <View key={faq.question} style={styles.accordionCard}>
              <TouchableOpacity
                style={styles.accordionHeader}
                onPress={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <Text style={styles.accordionQuestion}>{faq.question}</Text>
                <Ionicons
                  name={openIndex === idx ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="#888"
                />
              </TouchableOpacity>
              {openIndex === idx && (
                <Text style={styles.accordionAnswer}>{faq.answer}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 18,
    marginBottom: 8,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    marginBottom: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    position: "relative",
  },
  tabText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 15,
  },
  tabTextActive: {
    color: "#1ec28b",
  },
  tabIndicator: {
    position: "absolute",
    left: "20%",
    right: "20%",
    bottom: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#1ec28b",
  },
  categoryRow: {
    marginBottom: 8,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f7f7f7",
  },
  categoryBtnActive: {
    backgroundColor: "#1ec28b20",
    borderWidth: 1.5,
    borderColor: "#1ec28b",
  },
  categoryText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 15,
  },
  categoryTextActive: {
    color: "#1ec28b",
  },
  accordionList: {
    marginTop: 8,
  },
  accordionCard: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionQuestion: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#222",
    flex: 1,
    marginRight: 8,
  },
  accordionAnswer: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
});
