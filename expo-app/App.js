import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const STORAGE_KEYS = {
  MONKS: 'lifeStories',
  VILLAGES: 'villages',
  RENOWNED: 'renownedPeople',
  USERS: 'appUsers',
  CURRENT_USER: 'currentUser'
};

// Initialize default admin user
const initializeDefaultUser = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    const users = usersJson ? JSON.parse(usersJson) : [];
    const adminExists = users.find(u => u.name === 'khokon');
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin_' + Date.now(),
        name: 'khokon',
        email: 'khokon',
        password: 'joy1234',
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      users.push(adminUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminUser));
    } else {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminExists));
    }
  } catch (error) {
    console.error('Error initializing user:', error);
  }
};

// Monks Screen
function MonksScreen({ navigation }) {
  const [monks, setMonks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadMonks();
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      const user = userJson ? JSON.parse(userJson) : null;
      setIsAdmin(user?.isAdmin || false);
    } catch (error) {
      console.error('Error checking admin:', error);
    }
  };

  const loadMonks = async () => {
    try {
      const monksJson = await AsyncStorage.getItem(STORAGE_KEYS.MONKS);
      const allMonks = monksJson ? JSON.parse(monksJson) : [];
      const approvedMonks = allMonks.filter(m => m.status === 'approved' || !m.status);
      setMonks(approvedMonks);
    } catch (error) {
      console.error('Error loading monks:', error);
    }
  };

  const filteredMonks = monks.filter(monk =>
    monk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (monk.biography && monk.biography.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <BlurView intensity={20} style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="ভিক্ষু খুঁজুন…"
          placeholderTextColor="rgba(102, 102, 102, 0.7)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </BlurView>
      <ScrollView style={styles.scrollView}>
        {filteredMonks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>এখনও কোন কাহিনী নেই</Text>
          </View>
        ) : (
          filteredMonks.map(monk => (
            <TouchableOpacity
              key={monk.id}
              style={styles.card}
              onPress={() => navigation.navigate('MonkDetail', { monk })}
            >
              <BlurView intensity={20} style={styles.cardBlur}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{monk.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{monk.name}</Text>
                    <Text style={styles.cardSubtitle}>{monk.occupation || ''}</Text>
                  </View>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {monk.biography || ''}
                </Text>
              </BlurView>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {isAdmin && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddMonk')}
        >
          <LinearGradient
            colors={['rgba(255, 165, 100, 0.65)', 'rgba(255, 140, 66, 0.65)']}
            style={styles.fabGradient}
          >
            <Text style={styles.fabText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Villages Screen
function VillagesScreen() {
  const [villages, setVillages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadVillages();
  }, []);

  const loadVillages = async () => {
    try {
      const villagesJson = await AsyncStorage.getItem(STORAGE_KEYS.VILLAGES);
      const allVillages = villagesJson ? JSON.parse(villagesJson) : [];
      setVillages(allVillages);
    } catch (error) {
      console.error('Error loading villages:', error);
    }
  };

  const filteredVillages = villages.filter(village =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (village.description && village.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="গ্রাম খুঁজুন…"
          placeholderTextColor="rgba(102, 102, 102, 0.7)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </BlurView>
      <ScrollView style={styles.scrollView}>
        {filteredVillages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏘</Text>
            <Text style={styles.emptyText}>এখনও কোন গ্রাম নেই</Text>
          </View>
        ) : (
          filteredVillages.map(village => (
            <View key={village.id} style={styles.card}>
              <BlurView intensity={20} style={styles.cardBlur}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>🏘</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{village.name}</Text>
                    <Text style={styles.cardSubtitle}>{village.upazila}, {village.district}</Text>
                  </View>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {village.description || ''}
                </Text>
              </BlurView>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Renowned Screen
function RenownedScreen() {
  const [renowned, setRenowned] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRenowned();
  }, []);

  const loadRenowned = async () => {
    try {
      const renownedJson = await AsyncStorage.getItem(STORAGE_KEYS.RENOWNED);
      const allRenowned = renownedJson ? JSON.parse(renownedJson) : [];
      setRenowned(allRenowned);
    } catch (error) {
      console.error('Error loading renowned:', error);
    }
  };

  const filteredRenowned = renowned.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (person.biography && person.biography.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="বিশিষ্ট ব্যক্তিত্ব খুঁজুন…"
          placeholderTextColor="rgba(102, 102, 102, 0.7)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </BlurView>
      <ScrollView style={styles.scrollView}>
        {filteredRenowned.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⭐</Text>
            <Text style={styles.emptyText}>এখনও কোন বিশিষ্ট ব্যক্তিত্ব নেই</Text>
          </View>
        ) : (
          filteredRenowned.map(person => (
            <View key={person.id} style={styles.card}>
              <BlurView intensity={20} style={styles.cardBlur}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{person.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{person.name}</Text>
                    <Text style={styles.cardSubtitle}>{person.era || ''} {person.region ? '• ' + person.region : ''}</Text>
                  </View>
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {person.legacy || person.biography || ''}
                </Text>
              </BlurView>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Search Screen
function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>অনুসন্ধান</Text>
    </View>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>প্রোফাইল</Text>
    </View>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeDefaultUser().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>লোড হচ্ছে...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <LinearGradient
        colors={['#FFD3A6', '#FFB77A', '#FFA95E']}
        style={styles.backgroundGradient}
      >
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.28)',
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 255, 255, 0.4)',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: '700',
            },
            tabBarStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.24)',
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.3)',
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: '#FFA95E',
            tabBarInactiveTintColor: '#999',
          }}
        >
          <Tab.Screen
            name="Monks"
            component={MonksScreen}
            options={{
              title: 'ভিক্ষু',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📖</Text>,
            }}
          />
          <Tab.Screen
            name="Villages"
            component={VillagesScreen}
            options={{
              title: 'গ্রাম',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🏘</Text>,
            }}
          />
          <Tab.Screen
            name="Renowned"
            component={RenownedScreen}
            options={{
              title: 'বিশিষ্ট ব্যক্তিত্ব',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⭐</Text>,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              title: 'অনুসন্ধান',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🔎</Text>,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'প্রোফাইল',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
            }}
          />
        </Tab.Navigator>
      </LinearGradient>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA95E',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  searchContainer: {
    margin: 16,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  cardBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 168, 94, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFA95E',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    color: 'rgba(102, 102, 102, 0.8)',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 40,
  },
});

