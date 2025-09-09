import type { Meta, StoryObj } from '@storybook/react'
import { Home, Settings, User } from 'lucide-react'
import { Breadcrumb } from './breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'brand'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    showHome: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'Styleguide' },
    ],
  },
}

export const WithHome: Story = {
  args: {
    items: [
      { label: 'Styleguide' },
    ],
    showHome: true,
  },
}

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'コンポーネント', href: '/components' },
      { label: 'ボタン' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/', icon: <Home className="h-3 w-3" /> },
      { label: 'ユーザー', href: '/users', icon: <User className="h-3 w-3" /> },
      { label: '設定', icon: <Settings className="h-3 w-3" /> },
    ],
  },
}

export const BrandVariant: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'コンポーネント', href: '/components' },
      { label: 'ボタン' },
    ],
    variant: 'brand',
  },
}

export const Small: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'Styleguide' },
    ],
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'コンポーネント', href: '/components' },
      { label: 'ボタン' },
    ],
    size: 'lg',
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'プロジェクト', href: '/projects' },
      { label: 'デザインシステム', href: '/projects/design-system' },
      { label: 'コンポーネント', href: '/projects/design-system/components' },
      { label: 'ナビゲーション', href: '/projects/design-system/components/navigation' },
      { label: 'パンくずリスト' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: 'コンポーネント', href: '/components' },
      { label: 'ボタン' },
    ],
    separator: <span className="mx-1 text-muted-foreground">/</span>,
  },
}
