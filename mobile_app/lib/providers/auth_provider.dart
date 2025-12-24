import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../services/storage_service.dart';

class AuthProvider with ChangeNotifier {
  final StorageService _storageService = StorageService();
  AppUser? _currentUser;

  AppUser? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  bool get isAdmin => _currentUser?.isAdmin ?? false;

  Future<void> initialize() async {
    await _storageService.getUsers(); // Ensure admin user exists
    _currentUser = await _storageService.getCurrentUser();
    notifyListeners();
  }

  Future<bool> login(String identifier, String password) async {
    final users = await _storageService.getUsers();
    final user = users.firstWhere(
      (u) => (u.email == identifier || u.phone == identifier || u.name == identifier) &&
          u.password == password,
      orElse: () => AppUser(
        id: '',
        name: '',
        password: '',
        createdAt: '',
      ),
    );

    if (user.id.isNotEmpty) {
      _currentUser = user;
      await _storageService.setCurrentUser(user);
      notifyListeners();
      return true;
    }
    return false;
  }

  Future<bool> register(String name, String? email, String? phone, String password) async {
    final users = await _storageService.getUsers();
    
    // Check if user already exists
    final exists = users.any((u) => 
      (email != null && u.email == email) || 
      (phone != null && u.phone == phone)
    );
    
    if (exists) return false;

    final newUser = AppUser(
      id: 'user_${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      email: email,
      phone: phone,
      password: password,
      isAdmin: false,
      createdAt: DateTime.now().toIso8601String(),
    );

    users.add(newUser);
    await _storageService.saveUsers(users);
    _currentUser = newUser;
    await _storageService.setCurrentUser(newUser);
    notifyListeners();
    return true;
  }

  Future<void> logout() async {
    _currentUser = null;
    await _storageService.clearCurrentUser();
    notifyListeners();
  }
}

