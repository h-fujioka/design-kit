'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'default' | 'user';
}

export function MarkdownRenderer({ content, className = '', variant = 'default' }: MarkdownRendererProps) {
  const isUserVariant = variant === 'user';
  const textColor = isUserVariant ? 'text-white' : 'text-foreground';
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, {
            allowedTags: ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'code', 'pre', 'blockquote'],
            allowedAttributes: {
              div: ['class', 'className'],
              span: ['class', 'className'],
              a: ['href', 'target', 'rel'],
              code: ['class', 'className']
            }
          }]
        ]}
        components={{
          // 見出し
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-foreground mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-foreground mb-3 mt-5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-foreground mb-2 mt-3 first:mt-0">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-semibold text-foreground mb-2 mt-3 first:mt-0">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium text-foreground mb-2 mt-3 first:mt-0">
              {children}
            </h6>
          ),
          
          // 段落
          p: ({ children }) => (
            <p className={`${textColor} mb-3 leading-relaxed last:mb-0`} style={{ fontSize: '16px' }}>
              {children}
            </p>
          ),
          
          // 強調
          strong: ({ children }) => (
            <strong className={`font-semibold ${textColor}`} style={{ fontSize: '16px' }}>
              {children}
            </strong>
          ),
          
          // イタリック
          em: ({ children }) => (
            <em className={`italic ${textColor}`} style={{ fontSize: '16px' }}>
              {children}
            </em>
          ),
          
          // リスト
          ul: ({ children }) => (
            <ul className={`list-disc list-inside mb-3 space-y-1 ${textColor}`} style={{ fontSize: '16px' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={`list-decimal list-inside mb-3 space-y-1 ${textColor}`} style={{ fontSize: '16px' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={`${textColor} leading-relaxed`} style={{ fontSize: '16px' }}>
              {children}
            </li>
          ),
          
          // テーブル
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white dark:bg-gray-900">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className={`px-4 py-2 text-left font-semibold ${textColor} border-r border-gray-300 dark:border-gray-600 last:border-r-0`} style={{ fontSize: '16px' }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className={`px-4 py-2 ${textColor} border-r border-gray-300 dark:border-gray-600 last:border-r-0`} style={{ fontSize: '16px' }}>
              {children}
            </td>
          ),
          
          // コードブロック
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-mono" style={{ fontSize: '16px' }}>
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-md font-mono overflow-x-auto mb-3" style={{ fontSize: '16px' }}>
                {children}
              </code>
            );
          },
          
          // 引用
          blockquote: ({ children }) => (
            <blockquote className={`border-l-4 border-brand-500 pl-4 py-2 mb-3 bg-brand-50/50 dark:bg-brand-900/20 ${textColor} italic`} style={{ fontSize: '16px' }}>
              {children}
            </blockquote>
          ),
          
          // 水平線
          hr: () => (
            <hr className="border-t border-gray-300 dark:border-gray-600 my-6" />
          ),
          
          // リンク
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline transition-colors"
              style={{ fontSize: '16px' }}
            >
              {children}
            </a>
          ),
          
          // div要素
          div: ({ children, className, ...props }) => {
            // ReactMarkdownから渡される不要なpropsを除外
            const { node, ...cleanProps } = props;
            
            // 既存のクラスをチェック
            const existingClasses = className ? className.split(' ') : [];
            const hasExistingPadding = existingClasses.some(cls => cls.startsWith('p-'));
            const hasExistingBorder = existingClasses.some(cls => cls.includes('border'));
            const hasExistingRounded = existingClasses.some(cls => cls.includes('rounded'));
            
            // 既にスタイルが適用されている場合は何も追加しない
            if (hasExistingPadding && hasExistingBorder && hasExistingRounded) {
              return (
                <div className={className} {...cleanProps}>
                  {children}
                </div>
              );
            }
            
            // 最上位のdivかどうかを判定（クラスがなく、複数の子要素を持つ）
            const isTopLevelDiv = !className && children && 
              (Array.isArray(children) && children.length > 1);
            
            // 特定の条件でpaddingとborderを追加（既存スタイルがない場合のみ）
            const shouldAddPaddingAndBorder = (className?.includes('prose') || 
                                            className?.includes('pitch-content') ||
                                            className?.includes('bg-gray-100') ||
                                            className?.includes('bg-gray-800') ||
                                            isTopLevelDiv) && 
                                            !(hasExistingPadding && hasExistingBorder);
            
            // 必要なクラスのみを追加
            let additionalClasses = [];
            if (shouldAddPaddingAndBorder) {
              if (!hasExistingPadding) additionalClasses.push('p-6');
              if (!hasExistingBorder) additionalClasses.push('border', 'border-gray-300', 'dark:border-gray-600');
              if (!hasExistingRounded) additionalClasses.push('rounded-lg');
            }
            
            const enhancedClassName = additionalClasses.length > 0
              ? `${className || ''} ${additionalClasses.join(' ')}`.trim()
              : className;
            
            return (
              <div className={enhancedClassName} {...cleanProps}>
                {children}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
