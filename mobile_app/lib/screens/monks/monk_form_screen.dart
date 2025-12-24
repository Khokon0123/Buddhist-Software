import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/monk.dart';
import '../../providers/monk_provider.dart';

class MonkFormScreen extends StatefulWidget {
  final Monk? monk;

  const MonkFormScreen({super.key, this.monk});

  @override
  State<MonkFormScreen> createState() => _MonkFormScreenState();
}

class _MonkFormScreenState extends State<MonkFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _birthDateController = TextEditingController();
  final _deathDateController = TextEditingController();
  final _occupationController = TextEditingController();
  final _biographyController = TextEditingController();
  final _imageUrlController = TextEditingController();
  final _achievementsController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.monk != null) {
      _nameController.text = widget.monk!.name;
      _birthDateController.text = widget.monk!.birthDate ?? '';
      _deathDateController.text = widget.monk!.deathDate ?? '';
      _occupationController.text = widget.monk!.occupation;
      _biographyController.text = widget.monk!.biography;
      _imageUrlController.text = widget.monk!.imageUrl ?? '';
      _achievementsController.text = widget.monk!.achievements.join('\n');
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _birthDateController.dispose();
    _deathDateController.dispose();
    _occupationController.dispose();
    _biographyController.dispose();
    _imageUrlController.dispose();
    _achievementsController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    final monkProvider = Provider.of<MonkProvider>(context, listen: false);
    final achievements = _achievementsController.text
        .split('\n')
        .map((a) => a.trim())
        .where((a) => a.isNotEmpty)
        .toList();

    final monk = Monk(
      id: widget.monk?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      name: _nameController.text.trim(),
      birthDate: _birthDateController.text.trim().isEmpty
          ? null
          : _birthDateController.text.trim(),
      deathDate: _deathDateController.text.trim().isEmpty
          ? null
          : _deathDateController.text.trim(),
      occupation: _occupationController.text.trim(),
      biography: _biographyController.text.trim(),
      achievements: achievements,
      imageUrl: _imageUrlController.text.trim().isEmpty
          ? null
          : _imageUrlController.text.trim(),
      createdAt: widget.monk?.createdAt ?? DateTime.now().toIso8601String(),
      updatedAt: DateTime.now().toIso8601String(),
    );

    if (widget.monk != null) {
      await monkProvider.updateMonk(monk);
    } else {
      await monkProvider.addMonk(monk);
    }

    if (mounted) {
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.monk != null ? 'সম্পাদনা করুন' : 'যোগ করুন'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'নাম *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'নাম প্রয়োজন';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _birthDateController,
                      decoration: const InputDecoration(
                        labelText: 'জন্ম তারিখ',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextFormField(
                      controller: _deathDateController,
                      decoration: const InputDecoration(
                        labelText: 'মৃত্যু তারিখ',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _occupationController,
                decoration: const InputDecoration(
                  labelText: 'উপাধি/ভূমিকা',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _imageUrlController,
                decoration: const InputDecoration(
                  labelText: 'ছবির URL',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _biographyController,
                decoration: const InputDecoration(
                  labelText: 'জীবনী *',
                  border: OutlineInputBorder(),
                ),
                maxLines: 8,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'জীবনী প্রয়োজন';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _achievementsController,
                decoration: const InputDecoration(
                  labelText: 'অর্জনসমূহ (প্রতি লাইনে একটি)',
                  border: OutlineInputBorder(),
                ),
                maxLines: 5,
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _handleSubmit,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text(widget.monk != null ? 'আপডেট করুন' : 'যোগ করুন'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

