// src/screens/general/FAQScreen.tsx
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/context/AppThemeContext";
import { MotiView } from "moti";
import mockFaqs from "@/mocks/mockFaqs.json";

type Faq = {
  pergunta: string;
  resposta: string;
};

type FaqGroup = {
  titulo: string;
  faqs: Faq[];
};

export default function FAQScreen() {
  const { theme } = useAppTheme();
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<{ [groupIndex: number]: number[] }>({});

  const toggleGroup = (index: number) => {
    setExpandedGroups((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleQuestion = (groupIndex: number, questionIndex: number) => {
    setExpandedQuestions((prev) => {
      const groupQuestions = prev[groupIndex] || [];
      const alreadyExpanded = groupQuestions.includes(questionIndex);

      return {
        ...prev,
        [groupIndex]: alreadyExpanded
          ? groupQuestions.filter((i) => i !== questionIndex)
          : [...groupQuestions, questionIndex],
      };
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // ou ajustar conforme cabeçalho
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={[{ flex: 1 }]}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.basicView.backgroundColor }}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        >
          <Text style={theme.title}>Perguntas Frequentes (FAQ)</Text>

          {(mockFaqs as FaqGroup[]).map((group, groupIndex) => {
            const isGroupOpen = expandedGroups.includes(groupIndex);

            return (
              <View key={groupIndex} style={styles.groupContainer}>
                {/* Grupo: título */}
                <TouchableOpacity
                  onPress={() => toggleGroup(groupIndex)}
                  // style={[styles.groupHeader, { backgroundColor: theme.card.backgroundColor }]}
                  style={[styles.groupHeader, { backgroundColor: "#e0ffdd" }]}
                >
                  <Text style={[theme.subtitle, { flex: 1 }]}>{group.titulo}</Text>
                  <Ionicons
                    name={isGroupOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={theme.text.color}
                  />
                </TouchableOpacity>

                {/* Grupo: perguntas e respostas */}
                {isGroupOpen && (
                  <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 300 }}
                    style={styles.faqBox}
                  >
                    {group.faqs.map((faq, questionIndex) => {
                      const isQuestionOpen =
                        expandedQuestions[groupIndex]?.includes(questionIndex) ?? false;

                      return (
                        <View key={questionIndex} style={styles.faqItem}>
                          <TouchableOpacity
                            onPress={() => toggleQuestion(groupIndex, questionIndex)}
                            style={[styles.questionRow, { backgroundColor: "#f1f5f9", borderRadius: 6 }]}
                          >
                            <Text style={[theme.text, { flex: 1, fontWeight: "bold" }]}>
                              {faq.pergunta}
                            </Text>
                            <Ionicons
                              name={isQuestionOpen ? "remove-circle-outline" : "add-circle-outline"}
                              size={20}
                              color={theme.text.color}
                            />
                          </TouchableOpacity>

                          {isQuestionOpen && (
                            <MotiView
                              from={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ type: "timing", duration: 250 }}
                              style={{ marginTop: 4 }}
                            >
                              <Text style={[theme.text, { fontStyle: "italic" }]}>
                                {faq.resposta}
                              </Text>
                            </MotiView>
                          )}
                        </View>
                      );
                    })}
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
    paddingTop: 8,
    paddingHorizontal: 8,
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
