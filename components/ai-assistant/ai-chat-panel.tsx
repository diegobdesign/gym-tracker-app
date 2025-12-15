'use client'

import { useEffect, useRef } from 'react'
import { useAIChatStore } from '@/lib/stores/ai-chat-store'
import { useAIChat, useUserContext } from '@/hooks/use-ai-chat'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Bot, Trash2 } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { FeatureSuggestions } from './feature-suggestions'
import { AIFeatureType } from '@/lib/types/ai.types'
import { toast } from 'sonner'

export function AIChatPanel() {
  const {
    messages,
    currentFeature,
    isOpen,
    setOpen,
    setFeature,
    addMessage,
    clearMessages,
  } = useAIChatStore()

  const { sendMessage, isLoading, error } = useAIChat()
  const { data: context } = useUserContext()

  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to send message')
    }
  }, [error])

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
      feature: currentFeature || undefined,
    })

    try {
      // Send to API
      const response = await sendMessage({
        message: content,
        feature: currentFeature || 'general-qa',
        context,
        conversationHistory: messages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      })

      // Add assistant response
      addMessage({
        role: 'assistant',
        content: response.message,
        feature: currentFeature || undefined,
      })
    } catch (err) {
      // Error already handled by useAIChat
      console.error('Failed to send message:', err)
    }
  }

  const handleSelectFeature = (feature: AIFeatureType, prompt: string) => {
    setFeature(feature)
    if (prompt) {
      handleSendMessage(prompt)
    }
  }

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      clearMessages()
      toast.success('Chat cleared')
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Fitness Assistant
              </SheetTitle>
              <SheetDescription>
                Powered by Claude - Get personalized fitness guidance
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <Separator />

        {messages.length === 0 && (
          <FeatureSuggestions onSelectFeature={handleSelectFeature} />
        )}

        <ScrollArea
          ref={scrollRef}
          className="flex-1 px-2"
        >
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div className="space-y-3">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Hi! I'm your AI fitness assistant. I can help you with:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Personalized routine suggestions</li>
                  <li>• Workout performance analysis</li>
                  <li>• Exercise form and technique tips</li>
                  <li>• General fitness questions</li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  Select a feature above or ask me anything!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
        </ScrollArea>

        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder={
            currentFeature
              ? `Ask about ${currentFeature.replace('-', ' ')}...`
              : 'Ask me anything about your fitness...'
          }
        />
      </SheetContent>
    </Sheet>
  )
}
