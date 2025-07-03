import React, { FC, useEffect, useRef, useState } from 'react';
import {
      ActivityIndicator,
      Alert,
      Dimensions,
      FlatList,
      StyleSheet,
      Text,
      TextInput,
      TouchableOpacity,
      View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// #region types

interface Coordinates {
      latitude: number;
      longitude: number;
}

interface Address {
      country?: string;
      [key: string]: unknown;
}

export interface SelectableLocation extends Coordinates {
      id: number;
      name: string;        // full display name
      shortName: string;   // condensed name we show in list
      type: string;
      address: Address;
      importance: number;
}

interface Props {
      value: string;
      /**
       * Called when the user picks a location from the dropdown.
       * Only passes minimal data back to the parent.
       */
      onLocationSelect: (loc: { name: string; latitude: number; longitude: number }) => void;
      placeholder?: string;
      style?: any;
      placeholderTextColor?: string;
}

// #endregion

const LocationSearchInput: FC<Props> = ({
      value,
      onLocationSelect,
      placeholder = "Enter birth location",
      style,
      placeholderTextColor = "#999"
}) => {
      const [query, setQuery] = useState(value || '');
      const [results, setResults] = useState<SelectableLocation[]>([]);
      const [loading, setLoading] = useState(false);
      const [showResults, setShowResults] = useState(false);
      const [selectedLocation, setSelectedLocation] = useState<SelectableLocation | null>(null);
      const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

      // Update query when value prop changes
      useEffect(() => {
            if (value !== query) {
                  setQuery(value || '');
            }
      }, [value]);

      // Helper function to create shorter, more readable location names
      const getShortLocationName = (item: any) => {
            const address = item.address ?? {};
            const parts = [];

            // Add city/town/village
            if (address.city) parts.push(address.city);
            else if (address.town) parts.push(address.town);
            else if (address.village) parts.push(address.village);
            else if (address.hamlet) parts.push(address.hamlet);

            // Add state/province for clarity
            if (address.state) parts.push(address.state);
            else if (address.province) parts.push(address.province);

            // Always add country
            if (address.country) parts.push(address.country);

            return parts.length > 0 ? parts.join(', ') : item.display_name;
      };
      const searchLocations = async (searchQuery: string) => {
            if (searchQuery.length < 2) {
                  setResults([]);
                  setShowResults(false);
                  return;
            }

            setLoading(true);

            try {
                  const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?` +
                        `format=json&` +
                        `q=${encodeURIComponent(searchQuery)}&` +
                        `limit=8&` +
                        `addressdetails=1&` +
                        `extratags=1`, // Removed countrycodes to allow worldwide search
                        {
                              headers: {
                                    'User-Agent': 'AstroChart-App/1.0 (your-email@example.com)', // Required by Nominatim
                                    'Accept-Language': 'en-US,en',
                              },
                        }
                  );

                  if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  const data = await response.json();

                  // Filter and format results with better global context
                  const formattedResults: SelectableLocation[] = data
                        .filter((item: any) => item.display_name && item.lat && item.lon)
                        .map((item: any): SelectableLocation => ({
                              id: item.place_id,
                              name: item.display_name,
                              shortName: getShortLocationName(item),
                              latitude: parseFloat(item.lat),
                              longitude: parseFloat(item.lon),
                              type: item.type,
                              address: (item.address as Address) || {},
                              importance: item.importance ?? 0,
                        }))
                        .sort((a: SelectableLocation, b: SelectableLocation) => b.importance - a.importance); // Sort by importance

                  setResults(formattedResults);
                  setShowResults(true);
            } catch (error: unknown) {
                  console.error('Search error:', error);

                  // Handle different error types
                  if (error instanceof Error && error.message.includes('429')) {
                        Alert.alert('Rate Limited', 'Too many requests. Please wait a moment and try again.');
                  } else if (error instanceof Error && error.message.includes('Network')) {
                        Alert.alert('Network Error', 'Please check your internet connection and try again.');
                  } else {
                        Alert.alert('Search Error', 'Unable to search locations. Please try again.');
                  }

                  setResults([]);
                  setShowResults(false);
            } finally {
                  setLoading(false);
            }
      };

      // Handle text input with debouncing
      const handleQueryChange = (text: string) => {
            setQuery(text);
            setSelectedLocation(null);

            // Clear previous timeout
            if (searchTimeout.current) {
                  clearTimeout(searchTimeout.current);
            }

            // Set new timeout for debounced search
            searchTimeout.current = setTimeout(() => {
                  searchLocations(text);
            }, 300); // 300ms delay
      };

      // Handle location selection
      const handleLocationSelect = (location: SelectableLocation) => {
            setQuery(location.name);
            setSelectedLocation(location);
            setShowResults(false);
            setResults([]);

            if (onLocationSelect) {
                  onLocationSelect({
                        name: location.name,
                        latitude: location.latitude,
                        longitude: location.longitude,
                  });
            }
      };

      // Handle focus
      const handleFocus = () => {
            if (results.length > 0) {
                  setShowResults(true);
            }
      };

      // Handle blur
      const handleBlur = () => {
            // Delay hiding results to allow for selection
            setTimeout(() => {
                  setShowResults(false);
            }, 200);
      };

      // Cleanup timeout on unmount
      useEffect(() => {
            return () => {
                  if (searchTimeout.current) {
                        clearTimeout(searchTimeout.current);
                  }
            };
      }, []);

      const renderLocationItem = ({ item }: { item: SelectableLocation }) => (
            <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleLocationSelect(item)}
                  activeOpacity={0.7}
            >
                  <Text style={styles.locationName} numberOfLines={1}>
                        {item.shortName || item.name}
                  </Text>
                  
            </TouchableOpacity>
      );

      return (
            <View style={[styles.container, style]}>
                  <View style={styles.inputContainer}>
                        <TextInput
                              style={[styles.textInput, { color: selectedLocation ? '#fff' : '#999' }]}
                              value={query}
                              onChangeText={handleQueryChange}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                              placeholder={placeholder}
                              placeholderTextColor={placeholderTextColor}
                              autoCorrect={false}
                              autoCapitalize="words"
                              returnKeyType="search"
                        />
                        {loading && (
                              <ActivityIndicator
                                    style={styles.loadingIndicator}
                                    size="small"
                                    color="#007AFF"
                              />
                        )}
                  </View>

                  {showResults && results.length > 0 && (
                        <View style={styles.resultsContainer}>
                              <FlatList
                                    data={results}
                                    renderItem={renderLocationItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    style={styles.resultsList}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                              />
                        </View>
                  )}
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            position: 'relative',
            zIndex: 1000,
            width: '70%',
      },
      inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#444',
            borderRadius: 8,
            backgroundColor: 'transparent',
            height: 48,
      },
      textInput: {
            flex: 1,
            paddingHorizontal: 16,
            fontSize: 16,
            color: '#fff',
      },
      loadingIndicator: {
            marginRight: 12,
      },
      resultsContainer: {
            position: 'absolute',
            top: 48,
            left: 0,
            right: 0,
            backgroundColor: '#1a1a1a',
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: '#444',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            maxHeight: 200,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
      },
      resultsList: {
            maxHeight: 200,
      },
      resultItem: {
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#333',
      },
      locationName: {
            fontSize: 14,
            fontWeight: '500',
            color: '#fff',
            marginBottom: 4,
      },
      locationType: {
            fontSize: 12,
            color: '#999',
      },
});

export default LocationSearchInput;