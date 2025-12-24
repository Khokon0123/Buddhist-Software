import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/monk_provider.dart';
import '../providers/village_provider.dart';
import 'monks/monk_detail_screen.dart';
import 'villages/village_detail_screen.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _searchController = TextEditingController();
  String _selectedTab = 'monks';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final monkProvider = Provider.of<MonkProvider>(context);
    final villageProvider = Provider.of<VillageProvider>(context);

    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'সার্চ করুন...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          monkProvider.searchMonks('');
                          villageProvider.searchVillages('');
                        },
                      )
                    : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: (value) {
                monkProvider.searchMonks(value);
                villageProvider.searchVillages(value);
              },
            ),
          ),
          Row(
            children: [
              Expanded(
                child: ChoiceChip(
                  label: const Text('ভিক্ষু'),
                  selected: _selectedTab == 'monks',
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _selectedTab = 'monks';
                      });
                    }
                  },
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ChoiceChip(
                  label: const Text('গ্রাম'),
                  selected: _selectedTab == 'villages',
                  onSelected: (selected) {
                    if (selected) {
                      setState(() {
                        _selectedTab = 'villages';
                      });
                    }
                  },
                ),
              ),
            ],
          ),
          Expanded(
            child: _selectedTab == 'monks'
                ? monkProvider.monks.isEmpty
                    ? const Center(child: Text('কোন ফলাফল নেই'))
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: monkProvider.monks.length,
                        itemBuilder: (context, index) {
                          final monk = monkProvider.monks[index];
                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: ListTile(
                              title: Text(monk.name),
                              subtitle: Text(monk.occupation),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => MonkDetailScreen(monk: monk),
                                  ),
                                );
                              },
                            ),
                          );
                        },
                      )
                : villageProvider.villages.isEmpty
                    ? const Center(child: Text('কোন ফলাফল নেই'))
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: villageProvider.villages.length,
                        itemBuilder: (context, index) {
                          final village = villageProvider.villages[index];
                          return Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: ListTile(
                              title: Text(village.name),
                              subtitle: Text('${village.upazila}, ${village.district}'),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => VillageDetailScreen(village: village),
                                  ),
                                );
                              },
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}

