class AppUser {
  final String id;
  final String name;
  final String? email;
  final String? phone;
  final String password;
  final bool isAdmin;
  final String createdAt;

  AppUser({
    required this.id,
    required this.name,
    this.email,
    this.phone,
    required this.password,
    this.isAdmin = false,
    required this.createdAt,
  });

  factory AppUser.fromJson(Map<String, dynamic> json) {
    return AppUser(
      id: json['id'] as String,
      name: json['name'] as String,
      email: json['email'] as String?,
      phone: json['phone'] as String?,
      password: json['password'] as String,
      isAdmin: json['isAdmin'] as bool? ?? false,
      createdAt: json['createdAt'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'password': password,
      'isAdmin': isAdmin,
      'createdAt': createdAt,
    };
  }
}

