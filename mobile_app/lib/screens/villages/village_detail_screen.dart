import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../models/village.dart';
import '../../providers/village_provider.dart';
import '../../providers/auth_provider.dart';
import 'village_form_screen.dart';

class VillageDetailScreen extends StatelessWidget {
  final Village village;

  const VillageDetailScreen({super.key, required this.village});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    final villageProvider = Provider.of<VillageProvider>(context);

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: village.imageUrl != null && village.imageUrl!.isNotEmpty
                  ? Image.network(
                      village.imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          color: Colors.grey[300],
                          child: const Icon(Icons.home, size: 100),
                        );
                      },
                    )
                  : Container(
                      color: Colors.grey[300],
                      child: const Icon(Icons.home, size: 100),
                    ),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.share),
                onPressed: () {
                  Share.share('${village.name}\n\n${village.description}');
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
                    village.name,
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${village.upazila}, ${village.district}',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'বর্ণনা',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    village.description,
                    style: const TextStyle(fontSize: 16, height: 1.6),
                  ),
                  if (village.revolution.isNotEmpty) ...[
                    const SizedBox(height: 24),
                    const Text(
                      'ইতিহাস ও বিপ্লব',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      village.revolution,
                      style: const TextStyle(fontSize: 16, height: 1.6),
                    ),
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
                                  builder: (context) => VillageFormScreen(village: village),
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
                                  content: const Text('আপনি কি এই গ্রাম মুছে ফেলতে চান?'),
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
                                await villageProvider.deleteVillage(village.id);
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

