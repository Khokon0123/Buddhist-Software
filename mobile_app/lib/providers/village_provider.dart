import 'package:flutter/foundation.dart';
import '../models/village.dart';
import '../services/storage_service.dart';

class VillageProvider with ChangeNotifier {
  final StorageService _storageService = StorageService();
  List<Village> _villages = [];
  List<Village> _filteredVillages = [];
  String _searchQuery = '';

  List<Village> get villages => _filteredVillages;
  String get searchQuery => _searchQuery;

  Future<void> loadVillages() async {
    _villages = await _storageService.getVillages();
    _filteredVillages = _villages;
    notifyListeners();
  }

  Future<void> addVillage(Village village) async {
    _villages.add(village);
    await _storageService.saveVillages(_villages);
    searchVillages(_searchQuery);
    notifyListeners();
  }

  Future<void> updateVillage(Village village) async {
    final index = _villages.indexWhere((v) => v.id == village.id);
    if (index != -1) {
      _villages[index] = village;
      await _storageService.saveVillages(_villages);
      searchVillages(_searchQuery);
      notifyListeners();
    }
  }

  Future<void> deleteVillage(String id) async {
    _villages.removeWhere((v) => v.id == id);
    await _storageService.saveVillages(_villages);
    searchVillages(_searchQuery);
    notifyListeners();
  }

  void searchVillages(String query) {
    _searchQuery = query;
    if (query.isEmpty) {
      _filteredVillages = _villages;
    } else {
      _filteredVillages = _villages.where((village) {
        return village.name.toLowerCase().contains(query.toLowerCase()) ||
            village.district.toLowerCase().contains(query.toLowerCase()) ||
            village.description.toLowerCase().contains(query.toLowerCase());
      }).toList();
    }
    notifyListeners();
  }
}

