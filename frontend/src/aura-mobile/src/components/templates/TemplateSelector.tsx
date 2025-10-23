import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Template } from '../../types/template.types';
import { useTemplateStore } from '../../state/templateStore';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const { templates, loading, error, fetchTemplates } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTemplates(templates);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = templates.filter(
        (t) =>
          t.provider.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
      setFilteredTemplates(filtered);
    }
  }, [searchQuery, templates]);

  const renderTemplateItem = ({ item }: { item: Template }) => (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={styles.templateCard}
    >
      <View style={styles.templateContent}>
        <View style={styles.templateInfo}>
          <Text style={styles.templateProvider}>{item.provider}</Text>
          <Text style={styles.templateCategory}>{item.category}</Text>
          {item.estimatedCost && (
            <Text style={styles.templateCost}>
              ab {item.estimatedCost.toFixed(2).replace('.', ',')} € / {item.defaultBillingCycle || 'Monat'}
            </Text>
          )}
        </View>
        <View style={styles.templateArrow}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategorySection = () => {
    const categories = [...new Set(filteredTemplates.map((t) => t.category))];

    return categories.map((category) => {
      const categoryTemplates = filteredTemplates.filter((t) => t.category === category);

      return (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {categoryTemplates.map((template) => (
            <View key={template.id}>{renderTemplateItem({ item: template })}</View>
          ))}
        </View>
      );
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Vorlagen werden geladen...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={fetchTemplates}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Erneut versuchen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vorlage wählen</Text>
        <Text style={styles.subtitle}>
          Wählen Sie eine Vorlage für Ihren Vertrag
        </Text>

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Anbieter oder Kategorie suchen..."
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={[{ key: 'categories' }]}
        renderItem={() => <View style={styles.listContent}>{renderCategorySection()}</View>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Keine Vorlagen gefunden</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    color: '#6B7280',
    marginTop: 16,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  templateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  templateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  templateInfo: {
    flex: 1,
  },
  templateProvider: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  templateCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  templateCost: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 4,
  },
  templateArrow: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#3B82F6',
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#6B7280',
  },
});
