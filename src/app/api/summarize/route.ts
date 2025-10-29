import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // API 키 확인
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    // 요청 본문에서 메모 내용 추출
    const body = await request.json()
    const { content, title } = body

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: '유효한 메모 내용이 필요합니다.' },
        { status: 400 }
      )
    }

    // Google Gemini AI 초기화
    const ai = new GoogleGenAI({ apiKey })

    // 요약 생성
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: `다음 메모를 3-5문장으로 간결하게 요약해주세요. 핵심 내용과 주요 포인트를 중심으로 요약해주세요.

제목: ${title || '(제목 없음)'}

내용:
${content}

요약:`,
      config: {
        temperature: 0.3,
        maxOutputTokens: 500,
      },
    })

    // 응답 처리
    const summary = response.text

    if (!summary) {
      return NextResponse.json(
        { error: '요약 생성에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('요약 생성 중 오류 발생:', error)
    
    const errorMessage =
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'

    return NextResponse.json(
      { error: `요약 생성 실패: ${errorMessage}` },
      { status: 500 }
    )
  }
}

