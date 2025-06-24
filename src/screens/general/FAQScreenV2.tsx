// src/screens/general/FAQScreen.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/context/AppThemeContext";
import { MotiView } from "moti";
import { FAQCategoryType } from "@/types/FAQType";
import { fetchFAQs } from "@/services/serviceFAQs";

export default function FAQScreenV2() {
  console.log("FAQScreen rendered");

  const { theme } = useAppTheme();
  const [FAQs, setFAQs] = useState<FAQCategoryType[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  useEffect(() => {
    async function loadFAQs() {
      try {
        const data = await fetchFAQs();
        setFAQs(data);
      } catch (error) {
        console.error("Erro ao carregar FAQs:", error);
      }
    }
    loadFAQs();
  }, []);

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupIndex) ? prev.filter((index) => index !== groupIndex) : [...prev, groupIndex]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >
          <Text style={theme.title}>Perguntas Frequentes (FAQ)</Text>

          {FAQs.map((group, groupIndex) => {
            const isGroupOpen = expandedGroups.includes(groupIndex);

            return (
              <View key={groupIndex} style={styles.groupContainer}>
                <TouchableOpacity
                  onPress={() => toggleGroup(groupIndex)}
                  style={[styles.groupHeader, { backgroundColor: "#e0ffdd" }]}
                >
                  <Text style={[theme.subtitle, { flex: 1 }]}>{group.titulo}</Text>
                  <Ionicons
                    name={isGroupOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={theme.text.color}
                  />
                </TouchableOpacity>

                {isGroupOpen && (
                  <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 300 }}
                    style={styles.faqBox}
                  >
                    {group.faqs.map((faq, questionIndex) => (
                      <View key={questionIndex} style={styles.faqItem}>
                        <TouchableOpacity style={[styles.questionRow, { backgroundColor: "#f1f5f9", borderRadius: 6 }]}>
                          <Text style={[theme.text, { flex: 1, fontWeight: "bold" }]}>{faq.pergunta}</Text>
                          <Ionicons name="add-circle-outline" size={20} color={theme.text.color} />
                        </TouchableOpacity>
                        <Text style={[theme.text, { fontStyle: "italic", marginTop: 4 }]}>{faq.resposta}</Text>
                      </View>
                    ))}
                  </MotiView>
                )}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    marginTop: 24,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  faqBox: {
    marginTop: 12,
  },
  faqItem: {
    marginBottom: 12,
  },
  questionRow: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
