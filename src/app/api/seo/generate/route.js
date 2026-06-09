import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, description, keyword } = await req.json();

    const prompt = `
    Generate SEO meta title (60 chars) and description (160 chars)
    Title: ${title}
    Description: ${description}
    Keyword: ${keyword}
    `;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();

    const text = data.choices[0].message.content;

    return NextResponse.json({ result: text });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}