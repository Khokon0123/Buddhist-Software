import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/village.dart';
import '../../providers/village_provider.dart';

class VillageFormScreen extends StatefulWidget {
  final Village? village;

  const VillageFormScreen({super.key, this.village});

  @override
  State<VillageFormScreen> createState() => _VillageFormScreenState();
}

class _VillageFormScreenState extends State<VillageFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _districtController = TextEditingController();
  final _upazilaController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _revolutionController = TextEditingController();
  final _imageUrlController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.village != null) {
      _nameController.text = widget.village!.name;
      _districtController.text = widget.village!.district;
      _upazilaController.text = widget.village!.upazila;
      _descriptionController.text = widget.village!.description;
      _revolutionController.text = widget.village!.revolution;
      _imageUrlController.text = widget.village!.imageUrl ?? '';
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _districtController.dispose();
    _upazilaController.dispose();
    _descriptionController.dispose();
    _revolutionController.dispose();
    _imageUrlController.dispose();
    super.dispose();
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    final villageProvider = Provider.of<VillageProvider>(context, listen: false);

    final village = Village(
      id: widget.village?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
      name: _nameController.text.trim(),
      district: _districtController.text.trim(),
      upazila: _upazilaController.text.trim(),
      description: _descriptionController.text.trim(),
      revolution: _revolutionController.text.trim(),
      imageUrl: _imageUrlController.text.trim().isEmpty
          ? null
          : _imageUrlController.text.trim(),
      createdAt: widget.village?.createdAt ?? DateTime.now().toIso8601String(),
      updatedAt: DateTime.now().toIso8601String(),
    );

    if (widget.village != null) {
      await villageProvider.updateVillage(village);
    } else {
      await villageProvider.addVillage(village);
    }

    if (mounted) {
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.village != null ? 'সম্পাদনা করুন' : 'যোগ করুন'),
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
                  labelText: 'গ্রামের নাম *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'গ্রামের নাম প্রয়োজন';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _districtController,
                      decoration: const InputDecoration(
                        labelText: 'জেলা *',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'জেলা প্রয়োজন';
                        }
                        return null;
                      },
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextFormField(
                      controller: _upazilaController,
                      decoration: const InputDecoration(
                        labelText: 'উপজেলা *',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'উপজেলা প্রয়োজন';
                        }
                        return null;
                      },
                    ),
                  ),
                ],
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
                controller: _descriptionController,
                decoration: const InputDecoration(
                  labelText: 'গ্রাম সম্পর্কে *',
                  border: OutlineInputBorder(),
                ),
                maxLines: 8,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'বর্ণনা প্রয়োজন';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _revolutionController,
                decoration: const InputDecoration(
                  labelText: 'ইতিহাস ও বিপ্লব',
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
                child: Text(widget.village != null ? 'আপডেট করুন' : 'যোগ করুন'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

