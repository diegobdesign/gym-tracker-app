import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt } from '@/lib/ai/prompts'
import { buildContextPrompt } from '@/lib/ai/context-builder'
import { AIFeatureType } from '@/lib/types/ai.types'

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(userId)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 10) { // 10 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Parse request
    const body = await request.json()
    const {
      message,
      feature = 'general-qa' as AIFeatureType,
      context,
      conversationHistory = [],
    } = body

    // Get user ID from auth (simplified - should use Supabase auth)
    const userId = request.headers.get('x-user-id') || 'anonymous'

    // Rate limiting
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a moment.' },
        { status: 429 }
      )
    }

    // Validate message
    if (!message || typeof message !== 'string' || message.length === 0) {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message too long (max 2000 characters)' },
        { status: 400 }
      )
    }

    // Build system prompt
    const systemPrompt = getSystemPrompt(feature)
    const contextPrompt = context ? buildContextPrompt(context, feature) : ''

    // Prepare messages for Claude
    const messages: Anthropic.MessageParam[] = [
      // Include context as first user message if available
      ...(contextPrompt ? [{
        role: 'user' as const,
        content: `Context Information:\n${contextPrompt}`,
      }] : []),
      // Include conversation history (last 10 messages)
      ...conversationHistory.slice(-10).map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      // Current user message
      {
        role: 'user' as const,
        content: message,
      },
    ]

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // Use latest Claude Sonnet
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages,
    })

    // Extract response text
    const responseText = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as Anthropic.TextBlock).text)
      .join('\n')

    return NextResponse.json({
      message: responseText,
      messageId: response.id,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    })

  } catch (error: any) {
    console.error('Claude API error:', error)

    // Handle specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your configuration.' },
        { status: 500 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'AI service rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    )
  }
}
