// 基本エンティティ型
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザー関連型
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  isActive: boolean;
}

// 商品関連型
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  tags: string[];
  stock: number;
  isActive: boolean;
}

// 注文関連型
export interface Order extends BaseEntity {
  userId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// 投稿関連型
export interface Post extends BaseEntity {
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  featuredImage?: string;
}

// コメント関連型
export interface Comment extends BaseEntity {
  postId: string;
  authorId: string;
  content: string;
  parentId?: string;
  isApproved: boolean;
}

// API レスポンス型
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 認証関連型
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// ダッシュボード関連型
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

// モバイル関連型
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}
