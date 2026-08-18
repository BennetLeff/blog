'use client'

import React, { useState, useEffect } from 'react'
import Prism from 'prismjs'

// Import core language components
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'

interface CodeRendererProps {
  code: string
  language?: string
}

const languageAliases: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  rs: 'rust',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  yml: 'yaml',
}

export function CodeRenderer({ code, language = 'text' }: CodeRendererProps) {
  const [copied, setCopied] = useState(false)
  const normalizedLang = languageAliases[language.toLowerCase()] || language.toLowerCase()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const grammar = Prism.languages[normalizedLang] || Prism.languages.text
  const highlightedCode = grammar ? Prism.highlight(code, grammar, normalizedLang) : code

  return (
    <div className="my-6 rounded-lg border border-[#d4cdc0] bg-[#ded7c8] overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#d4cdc0] bg-[#d6cfbe]/60 text-xs font-mono text-[#575249]">
        <span className="uppercase tracking-wider font-medium">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ece7da] hover:bg-[#e4decb] text-[#1c1a17] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d84715]"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#d84715]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-[#575249]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono custom-scrollbar text-[#1c1a17]">
        <code
          className={`language-${normalizedLang}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  )
}
