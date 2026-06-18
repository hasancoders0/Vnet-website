import { connectDB } from '@/lib/db'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server'

// ================= SLUG =================
const generateSlug = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// ================= SEO HELPERS =================
const normalize = (text = '') => String(text).toLowerCase()

const includesKeyword = (text = '', keyword = '') => {
  if (!keyword) return false

  return normalize(text).includes(normalize(keyword))
}

const wordCount = (text = '') => text.trim().split(/\s+/).filter(Boolean).length

const keywordCount = (text = '', keyword = '') => {
  if (!text || !keyword) return 0

  const words = normalize(text).split(/\s+/)
  const key = normalize(keyword)

  return words.filter(w => w.includes(key)).length
}

const keywordDensity = (text = '', keyword = '') => {
  if (!keyword) return 0

  const total = wordCount(text)

  if (!total) return 0

  const count = keywordCount(text, keyword)

  return (count / total) * 100
}

// ================= SEO SCORE =================
const calculateSEOScore = ({
  title = '',
  description = '',
  keyword = '',
  slug = '',
  contentText = '',
  image = ''
}) => {
  let score = 0

  // Title length
  if (title.length >= 50 && title.length <= 60) {
    score += 15
  }

  // Description length
  if (description.length >= 120 && description.length <= 160) {
    score += 15
  }

  // Keyword scoring (OPTIONAL)
  if (keyword?.trim()) {
    if (includesKeyword(title, keyword)) {
      score += 15
    }

    if (includesKeyword(description, keyword)) {
      score += 15
    }

    if (includesKeyword(slug, keyword)) {
      score += 10
    }

    const density = keywordDensity(contentText, keyword)

    if (density >= 1 && density <= 2.5) {
      score += 20
    }
  }

  // Image
  if (image) {
    score += 10
  }

  return Math.min(score, 100)
}

// ================= BUILD =================
const buildBlogData = (body, slug) => {
  const seo = body.seo || {}

  const contentText = (body.content || []).map(c => c.text || '').join(' ')

  const metaTitle = body.metaTitle || body.title

  const metaDescription = body.metaDescription || ''

  const score = calculateSEOScore({
    title: metaTitle,
    description: metaDescription,
    keyword: body.focusKeyword || '',
    slug,
    contentText,
    image: body.metaImage || body.featuredImage
  })

  return {
    title: body.title,
    subtitle: body.subtitle || '',
    shortDescription: body.shortDescription || '',
    featuredImage: body.featuredImage || '',
    category: body.category,

    content: body.content || [],

    // SEO
    slug,
    metaTitle,
    metaDescription,
    metaImage: body.metaImage || body.featuredImage || '',

    focusKeyword: body.focusKeyword || '',

    tags: body.tags || [],

    score,

    status: body.status || 'draft'
  }
}

// ================= CREATE =================
export async function POST (req) {
  try {
    await connectDB()

    const body = await req.json()

    // VALIDATION
    if (!body.title) {
      return NextResponse.json(
        {
          success: false,
          message: 'Title is required'
        },
        { status: 400 }
      )
    }

    if (!body.category) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category is required'
        },
        { status: 400 }
      )
    }

    if (!body.content || body.content.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Content is required'
        },
        { status: 400 }
      )
    }

    // SLUG
    let slug = body.slug ? generateSlug(body.slug) : generateSlug(body.title)

    const exists = await Blog.findOne({
      slug
    })

    if (exists) {
      slug = `${slug}-${Date.now()}`
    }

    const blogData = buildBlogData(body, slug)

    const blog = await Blog.create(blogData)

    return NextResponse.json({
      success: true,
      data: blog
    })
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message
      },
      { status: 500 }
    )
  }
}

// ================= GET =================
export async function GET (req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)

    const slug = searchParams.get('slug')

    // SLUG CHECK
    if (slug) {
      const exists = await Blog.findOne({
        slug
      })

      return NextResponse.json({
        success: true,
        available: !exists
      })
    }

    const blogs = await Blog.find().populate('category', 'name').sort({
      createdAt: -1
    })

    return NextResponse.json({
      success: true,
      data: blogs
    })
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message
      },
      { status: 500 }
    )
  }
}
