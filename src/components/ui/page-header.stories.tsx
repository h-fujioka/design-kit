import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { PageHeader } from './page-header'

const meta: Meta<typeof PageHeader> = {
  title: 'UI/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'centered', 'left'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default'],
    },
    showDescription: {
      control: { type: 'boolean' },
    },
    showAction: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'ダッシュボード',
    description: 'プロジェクトの概要と主要な指標を確認できます',
    action: <Button>新規作成</Button>,
  },
}

export const WithoutDescription: Story = {
  args: {
    title: '設定',
    action: <Button variant="outline">保存</Button>,
  },
}

export const WithoutAction: Story = {
  args: {
    title: 'プロフィール',
    description: 'ユーザー情報の管理と設定を行います',
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'シンプルなページ',
    showDescription: false,
    showAction: false,
  },
}

export const Small: Story = {
  args: {
    title: '小さいヘッダー',
    description: 'コンパクトなレイアウト用',
    size: 'sm',
    action: <Button size="sm">アクション</Button>,
  },
}


export const Centered: Story = {
  args: {
    title: '中央揃えヘッダー',
    description: '中央に配置されたページヘッダー',
    variant: 'centered',
    action: <Button>アクション</Button>,
  },
}

export const LeftAligned: Story = {
  args: {
    title: '左揃えヘッダー',
    description: '左側に配置されたページヘッダー',
    variant: 'left',
    action: <Button variant="outline">アクション</Button>,
  },
}

export const WithLongDescription: Story = {
  args: {
    title: '詳細な説明付きヘッダー',
    description: 'このページでは、ユーザーが様々な機能を利用できます。データの管理、設定の変更、レポートの生成など、包括的な機能を提供しています。',
    action: <Button>詳細を見る</Button>,
  },
}

export const MultipleActions: Story = {
  args: {
    title: '複数アクション',
    description: '複数のアクションボタンを持つヘッダー',
    action: (
      <div className="flex gap-2">
        <Button variant="outline">キャンセル</Button>
        <Button>保存</Button>
      </div>
    ),
  },
}
