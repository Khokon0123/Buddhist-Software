import 'package:flutter/foundation.dart';
import '../models/monk.dart';
import '../services/storage_service.dart';

class MonkProvider with ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Monk> _monks = [];
  List<Monk> _filteredMonks = [];
  String _searchQuery = '';

  List<Monk> get monks => _filteredMonks;
  String get searchQuery => _searchQuery;

  Future<void> loadMonks() async {
    _monks = await _storageService.getMonks();
    _filteredMonks = _monks;
    notifyListeners();
  }

  Future<void> addMonk(Monk monk) async {
    _monks.add(monk);
    await _storageService.saveMonks(_monks);
    searchMonks(_searchQuery);
    notifyListeners();
  }

  Future<void> updateMonk(Monk monk) async {
    final index = _monks.indexWhere((m) => m.id == monk.id);
    if (index != -1) {
      _monks[index] = monk;
      await _storageService.saveMonks(_monks);
      searchMonks(_searchQuery);
      notifyListeners();
    }
  }

  Future<void> deleteMonk(String id) async {
    _monks.removeWhere((m) => m.id == id);
    await _storageService.saveMonks(_monks);
    searchMonks(_searchQuery);
    notifyListeners();
  }

  void searchMonks(String query) {
    _searchQuery = query;
    if (query.isEmpty) {
      _filteredMonks = _monks;
    } else {
      _filteredMonks = _monks.where((monk) {
        return monk.name.toLowerCase().contains(query.toLowerCase()) ||
            monk.biography.toLowerCase().contains(query.toLowerCase()) ||
            monk.occupation.toLowerCase().contains(query.toLowerCase());
      }).toList();
    }
    notifyListeners();
  }
}

