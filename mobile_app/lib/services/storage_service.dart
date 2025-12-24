import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/monk.dart';
import '../models/village.dart';
import '../models/user.dart';

class StorageService {
  static const String _monksKey = 'lifeStories';
  static const String _villagesKey = 'villages';
  static const String _usersKey = 'appUsers';
  static const String _currentUserKey = 'currentUser';

  // Monks
  Future<List<Monk>> getMonks() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_monksKey);
    if (jsonString == null) return [];
    
    final List<dynamic> jsonList = json.decode(jsonString);
    return jsonList.map((json) => Monk.fromJson(json)).toList();
  }

  Future<void> saveMonks(List<Monk> monks) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonList = monks.map((monk) => monk.toJson()).toList();
    await prefs.setString(_monksKey, json.encode(jsonList));
  }

  // Villages
  Future<List<Village>> getVillages() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_villagesKey);
    if (jsonString == null) return [];
    
    final List<dynamic> jsonList = json.decode(jsonString);
    return jsonList.map((json) => Village.fromJson(json)).toList();
  }

  Future<void> saveVillages(List<Village> villages) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonList = villages.map((village) => village.toJson()).toList();
    await prefs.setString(_villagesKey, json.encode(jsonList));
  }

  // Users
  Future<List<AppUser>> getUsers() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_usersKey);
    if (jsonString == null) {
      // Initialize default admin user
      final adminUser = AppUser(
        id: 'default_user_${DateTime.now().millisecondsSinceEpoch}',
        name: 'khokon',
        email: 'khokon',
        password: 'joy1234',
        isAdmin: true,
        createdAt: DateTime.now().toIso8601String(),
      );
      await saveUsers([adminUser]);
      return [adminUser];
    }
    
    final List<dynamic> jsonList = json.decode(jsonString);
    return jsonList.map((json) => AppUser.fromJson(json)).toList();
  }

  Future<void> saveUsers(List<AppUser> users) async {
    final prefs = await SharedPreferences.getInstance();
    final jsonList = users.map((user) => user.toJson()).toList();
    await prefs.setString(_usersKey, json.encode(jsonList));
  }

  // Current User
  Future<AppUser?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonString = prefs.getString(_currentUserKey);
    if (jsonString == null) return null;
    
    return AppUser.fromJson(json.decode(jsonString));
  }

  Future<void> setCurrentUser(AppUser user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_currentUserKey, json.encode(user.toJson()));
  }

  Future<void> clearCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_currentUserKey);
  }
}

