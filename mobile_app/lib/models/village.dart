class Village {
  final String id;
  final String name;
  final String district;
  final String upazila;
  final String description;
  final String revolution;
  final String? imageUrl;
  final String createdAt;
  final String updatedAt;

  Village({
    required this.id,
    required this.name,
    required this.district,
    required this.upazila,
    required this.description,
    this.revolution = '',
    this.imageUrl,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Village.fromJson(Map<String, dynamic> json) {
    return Village(
      id: json['id'] as String,
      name: json['name'] as String,
      district: json['district'] as String,
      upazila: json['upazila'] as String,
      description: json['description'] as String,
      revolution: json['revolution'] as String? ?? '',
      imageUrl: json['imageUrl'] as String?,
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'district': district,
      'upazila': upazila,
      'description': description,
      'revolution': revolution,
      'imageUrl': imageUrl,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }

  Village copyWith({
    String? id,
    String? name,
    String? district,
    String? upazila,
    String? description,
    String? revolution,
    String? imageUrl,
    String? createdAt,
    String? updatedAt,
  }) {
    return Village(
      id: id ?? this.id,
      name: name ?? this.name,
      district: district ?? this.district,
      upazila: upazila ?? this.upazila,
      description: description ?? this.description,
      revolution: revolution ?? this.revolution,
      imageUrl: imageUrl ?? this.imageUrl,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

