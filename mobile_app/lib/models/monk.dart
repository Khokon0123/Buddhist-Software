class Monk {
  final String id;
  final String name;
  final String? birthDate;
  final String? deathDate;
  final String occupation;
  final String biography;
  final List<String> achievements;
  final String? imageUrl;
  final String createdAt;
  final String updatedAt;

  Monk({
    required this.id,
    required this.name,
    this.birthDate,
    this.deathDate,
    this.occupation = '',
    required this.biography,
    this.achievements = const [],
    this.imageUrl,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Monk.fromJson(Map<String, dynamic> json) {
    return Monk(
      id: json['id'] as String,
      name: json['name'] as String,
      birthDate: json['birthDate'] as String?,
      deathDate: json['deathDate'] as String?,
      occupation: json['occupation'] as String? ?? '',
      biography: json['biography'] as String,
      achievements: json['achievements'] != null
          ? List<String>.from(json['achievements'])
          : [],
      imageUrl: json['imageUrl'] as String?,
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'birthDate': birthDate,
      'deathDate': deathDate,
      'occupation': occupation,
      'biography': biography,
      'achievements': achievements,
      'imageUrl': imageUrl,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }

  Monk copyWith({
    String? id,
    String? name,
    String? birthDate,
    String? deathDate,
    String? occupation,
    String? biography,
    List<String>? achievements,
    String? imageUrl,
    String? createdAt,
    String? updatedAt,
  }) {
    return Monk(
      id: id ?? this.id,
      name: name ?? this.name,
      birthDate: birthDate ?? this.birthDate,
      deathDate: deathDate ?? this.deathDate,
      occupation: occupation ?? this.occupation,
      biography: biography ?? this.biography,
      achievements: achievements ?? this.achievements,
      imageUrl: imageUrl ?? this.imageUrl,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

