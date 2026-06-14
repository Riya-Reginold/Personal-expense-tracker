import {
  IconShoppingCart,
  IconBus,
  IconBriefcase,
  IconShoppingBag,
  IconHome,
  IconDeviceTv,
  IconPackage,
} from '@tabler/icons-react';
import type { ComponentType } from 'react';

export type Category =
  | 'food'
  | 'transport'
  | 'salary'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'other';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  date: string;
}

export const CATEGORY_ICONS: Record<Category, ComponentType<{ size?: number; stroke?: number; color?: string }>> = {
  food: IconShoppingCart,
  transport: IconBus,
  salary: IconBriefcase,
  shopping: IconShoppingBag,
  bills: IconHome,
  entertainment: IconDeviceTv,
  other: IconPackage,
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: '#dbeafe',
  transport: '#ffedd5',
  salary: '#dcfce7',
  shopping: '#f3e8ff',
  bills: '#fee2e2',
  entertainment: '#fce7f3',
  other: '#f3f4f6',
};

export const CATEGORY_ICON_COLORS: Record<Category, string> = {
  food: '#2563eb',
  transport: '#ea580c',
  salary: '#16a34a',
  shopping: '#9333ea',
  bills: '#dc2626',
  entertainment: '#db2777',
  other: '#6b7280',
};