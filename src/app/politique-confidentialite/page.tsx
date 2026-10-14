import fs from "node:fs/promises"
import path from "node:path"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function formatInline(text: string) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/https?:\/\/([^\s]+)$/g, '<a href="https://$1" target="_blank" rel="noreferrer">https://$1</a>')
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/)
  const html: string[] = []
  let listItems: string[] = []

  const flushList = () => {
    if (listItems.length === 0) return
    html.push(`<ul>${listItems.join("")}</ul>`)
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushList()
      continue
    }

    if (/^###\s+/.test(line)) {
      flushList()
      html.push(`<h3>${formatInline(line.replace(/^###\s+/, ""))}</h3>`)
      continue
    }

    if (/^##\s+/.test(line)) {
      flushList()
      html.push(`<h2>${formatInline(line.replace(/^##\s+/, ""))}</h2>`)
      continue
    }

    if (/^#\s+/.test(line)) {
      flushList()
      html.push(`<h1>${formatInline(line.replace(/^#\s+/, ""))}</h1>`)
      continue
    }

    if (/^[-*]\s+/.test(line)) {
      listItems.push(`<li>${formatInline(line.replace(/^[-*]\s+/, ""))}</li>`)
      continue
    }

    flushList()
    html.push(`<p>${formatInline(line)}</p>`)
  }

  flushList()

  return html.join("")
}

async function getPrivacyPolicy() {
  const filePath = path.join(process.cwd(), "politiqueconf.txt")
  return fs.readFile(filePath, "utf-8")
}

export default async function PolitiqueConfidentialitePage() {
  const content = await getPrivacyPolicy()

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-[calc(var(--header-height)+2.5rem)] sm:px-6 lg:px-8">
      <div
        className="w-full rounded-none bg-transparent p-0 text-base leading-8 text-foreground/90 shadow-none sm:text-lg [&>h1]:mb-6 [&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:tracking-tight [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-xl [&>h3]:font-semibold [&>p]:mb-5 [&>p]:leading-8 [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2 [&>strong]:font-semibold [&>code]:rounded [&>code]:bg-slate-100 [&>code]:px-1 [&>code]:py-0.5"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </main>
  )
}
