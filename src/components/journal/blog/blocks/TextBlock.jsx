"use client";

export default function TextBlock({ block }) {
  if (!block?.content) return null;

  return (
    <article
      className="
        prose
        prose-slate
        lg:prose-lg
        max-w-none

        prose-headings:font-bold
        prose-headings:text-slate-900
        prose-headings:tracking-tight
        prose-headings:scroll-mt-28

        prose-h1:text-4xl
        prose-h1:mt-0
        prose-h1:mb-8

        prose-h2:text-[30px]
        prose-h2:leading-tight
        prose-h2:mt-12
        prose-h2:mb-5

        prose-h3:text-[24px]
        prose-h3:leading-tight
        prose-h3:mt-10
        prose-h3:mb-4

        prose-h4:text-[20px]
        prose-h4:leading-tight
        prose-h4:mt-8
        prose-h4:mb-3

        prose-p:text-slate-700
        prose-p:leading-8
        prose-p:mb-6

        prose-strong:font-semibold
        prose-strong:text-slate-900

        prose-a:text-purple-600
        prose-a:font-semibold
        prose-a:underline
        prose-a:decoration-2
        prose-a:underline-offset-4
        prose-a:decoration-purple-500

        hover:prose-a:text-purple-700
        hover:prose-a:decoration-purple-700

        prose-ul:list-disc
        prose-ul:pl-6
        prose-ul:my-6

        prose-ol:list-decimal
        prose-ol:pl-6
        prose-ol:my-6

        prose-li:text-slate-700
        prose-li:my-2

        prose-li:marker:text-slate-500
        prose-li:marker:font-medium

        [&_ul_ul]:mt-2
        [&_ul_ul]:mb-2
        [&_ul_ul]:list-circle

        [&_ol_ol]:mt-2
        [&_ol_ol]:mb-2

        [&_li>p]:m-0
        [&_li>p]:leading-7
        [&_li>p]:text-slate-700

        prose-blockquote:border-l-4
        prose-blockquote:border-purple-500
        prose-blockquote:bg-purple-50
        prose-blockquote:px-6
        prose-blockquote:py-4
        prose-blockquote:rounded-r-2xl
        prose-blockquote:italic
        prose-blockquote:text-slate-700

        prose-code:text-purple-700
        prose-code:bg-purple-50
        prose-code:px-1.5
        prose-code:py-1
        prose-code:rounded-md
        prose-code:font-medium
        prose-code:before:content-none
        prose-code:after:content-none

        prose-pre:bg-slate-950
        prose-pre:text-slate-100
        prose-pre:rounded-2xl
        prose-pre:p-6
        prose-pre:overflow-x-auto

        prose-img:rounded-2xl
        prose-img:shadow-sm
        prose-img:my-10

        prose-hr:my-12
        prose-hr:border-slate-200

        prose-table:w-full
        prose-table:border-collapse
        prose-table:block
        prose-table:overflow-x-auto

        prose-th:border
        prose-th:border-slate-200
        prose-th:bg-slate-50
        prose-th:px-4
        prose-th:py-3
        prose-th:text-left

        prose-td:border
        prose-td:border-slate-200
        prose-td:px-4
        prose-td:py-3

        prose-figure:my-10

        prose-figcaption:text-center
        prose-figcaption:text-sm
        prose-figcaption:text-slate-500
      "
      dangerouslySetInnerHTML={{
        __html: block.content,
      }}
    />
  );
}
