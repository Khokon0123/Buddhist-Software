import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../models/monk.dart';
import '../../providers/monk_provider.dart';
import '../../providers/auth_provider.dart';
import 'monk_form_screen.dart';

class MonkDetailScreen extends StatelessWidget {
  final Monk monk;

  const MonkDetailScreen({super.key, required this.monk});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final monkProvider = Provider.of<MonkProvider>(context);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: monk.imageUrl != null && monk.imageUrl!.isNotEmpty
                  ? Image.network(
                      monk.imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          color: Colors.grey[300],
                          child: const Icon(Icons.person, size: 100),
                        );
                      },
                    )
                  : Container(
                      color: Colors.grey[300],
                      child: const Icon(Icons.person, size: 100),
                    ),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.share),
                onPressed: () {
                  Share.share('${monk.name}\n\n${monk.biography}');
                },
              ),
            ],
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    monk.name,
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  if (monk.occupation.isNotEmpty) ...[
                    const SizedBox(height: 8),
                    Text(
                      monk.occupation,
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                  const SizedBox(height: 16),
                  if (monk.birthDate != null || monk.deathDate != null)
                    Row(
                      children: [
                        if (monk.birthDate != null)
                          Chip(
                            label: Text('জন্ম: ${monk.birthDate}'),
                            avatar: const Icon(Icons.calendar_today, size: 18),
                          ),
                        if (monk.deathDate != null) ...[
                          const SizedBox(width: 8),
                          Chip(
                            label: Text('মৃত্যু: ${monk.deathDate}'),
                            avatar: const Icon(Icons.event, size: 18),
                          ),
                        ],
                      ],
                    ),
                  const SizedBox(height: 24),
                  const Text(
                    'জীবনী',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    monk.biography,
                    style: const TextStyle(fontSize: 16, height: 1.6),
                  ),
                  if (monk.achievements.isNotEmpty) ...[
                    const SizedBox(height: 24),
                    const Text(
                      'অর্জনসমূহ',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ...monk.achievements.map((achievement) => Padding(
                          padding: const EdgeInsets.only(bottom: 8.0),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Icon(Icons.star, color: Colors.amber, size: 20),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  achievement,
                                  style: const TextStyle(fontSize: 16),
                                ),
                              ),
                            ],
                          ),
                        )),
                  ],
                  if (authProvider.isAdmin) ...[
                    const SizedBox(height: 32),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => MonkFormScreen(monk: monk),
                                ),
                              );
                            },
                            icon: const Icon(Icons.edit),
                            label: const Text('সম্পাদনা'),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: () async {
                              final confirm = await showDialog<bool>(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: const Text('নিশ্চিত করুন'),
                                  content: const Text('আপনি কি এই কাহিনী মুছে ফেলতে চান?'),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context, false),
                                      child: const Text('বাতিল'),
                                    ),
                                    TextButton(
                                      onPressed: () => Navigator.pop(context, true),
                                      child: const Text('মুছুন'),
                                    ),
                                  ],
                                ),
                              );
                              if (confirm == true && context.mounted) {
                                await monkProvider.deleteMonk(monk.id);
                                if (context.mounted) {
                                  Navigator.pop(context);
                                }
                              }
                            },
                            icon: const Icon(Icons.delete),
                            label: const Text('মুছুন'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red,
                              foregroundColor: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

