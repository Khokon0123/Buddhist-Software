import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import 'monks/monks_list_screen.dart';
import 'villages/villages_list_screen.dart';
import 'search_screen.dart';
import 'profile_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const MonksListScreen(),
    const VillagesListScreen(),
    const SearchScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.book),
            label: 'ভিক্ষু',
          ),
          NavigationDestination(
            icon: Icon(Icons.home),
            label: 'গ্রাম',
          ),
          NavigationDestination(
            icon: Icon(Icons.search),
            label: 'অনুসন্ধান',
          ),
          NavigationDestination(
            icon: Icon(Icons.person),
            label: 'প্রোফাইল',
          ),
        ],
      ),
      appBar: AppBar(
        title: const Text('বাংলাদেশের বৌদ্ধ ভিক্ষু'),
        backgroundColor: const Color(0xFF667eea),
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          if (authProvider.isAdmin)
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Chip(
                label: Text('প্রশাসক', style: TextStyle(color: Colors.white)),
                backgroundColor: Colors.red,
              ),
            ),
        ],
      ),
    );
  }
}

