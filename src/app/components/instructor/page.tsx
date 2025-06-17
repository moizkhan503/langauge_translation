"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "../../components/header"
import { Footer } from "../../components/footer"
import { Send, Bot, Mic, Volume2, Languages, X } from "lucide-react"
import { getLearningRecommendations, getInstructorResponse } from "../const_model_api"

type MessageType = {
  type: "user" | "bot"
  message: string
  time: string
}

type Language = {
  code: string
  name: string
  color: string
  bgColor: string
}

type ModalState = "language-select" | "recommendations" | "chat"

export default function InstructorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [modalState, setModalState] = useState<ModalState>("language-select")
  const [showModal, setShowModal] = useState(true)
  const [recommendations, setRecommendations] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<Array<{role: string, content: string}>>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages: Language[] = [
    {
      code: "es",
      name: "Spanish",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200 hover:border-red-400 hover:bg-red-100",
    },
    {
      code: "fr",
      name: "French",
      color: "text-blue-700",
      bgColor: "bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100",
    },
    {
      code: "de",
      name: "German",
      color: "text-gray-700",
      bgColor: "bg-gray-50 border-gray-200 hover:border-gray-400 hover:bg-gray-100",
    },
    {
      code: "it",
      name: "Italian",
      color: "text-green-700",
      bgColor: "bg-green-50 border-green-200 hover:border-green-400 hover:bg-green-100",
    },
    {
      code: "pt",
      name: "Portuguese",
      color: "text-emerald-700",
      bgColor: "bg-emerald-50 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100",
    },
    {
      code: "ru",
      name: "Russian",
      color: "text-indigo-700",
      bgColor: "bg-indigo-50 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100",
    },
    {
      code: "zh",
      name: "Chinese",
      color: "text-yellow-700",
      bgColor: "bg-yellow-50 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-100",
    },
    {
      code: "ar",
      name: "Arabic",
      color: "text-purple-700",
      bgColor: "bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100",
    },
    {
      code: "hi",
      name: "Hindi",
      color: "text-orange-700",
      bgColor: "bg-orange-50 border-orange-200 hover:border-orange-400 hover:bg-orange-100",
    },
    {
      code: "tr",
      name: "Turkish",
      color: "text-pink-700",
      bgColor: "bg-pink-50 border-pink-200 hover:border-pink-400 hover:bg-pink-100",
    },
  ]

  const [chatMessages, setChatMessages] = useState<MessageType[]>([
    {
      type: "bot",
      message:
        "Hello! I'm your AI language instructor. 👋 Click the language button above to start your personalized learning journey!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  // Auto-scroll to bottom of chat
  useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement
    if (chatContainer) {
      const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop <= chatContainer.clientHeight + 100

      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [chatMessages])

  const handleLanguageSelect = async (language: Language) => {
    setSelectedLanguage(language)
    setModalState("recommendations")
    setIsLoading(true)

    // Add user's language selection to chat
    const newMessage: MessageType = {
      type: "user",
      message: `I want to learn ${language.name}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages((prev) => [...prev, newMessage])

    try {
      console.log(`Generating learning recommendations for ${language.name}...`)
      const aiRecommendations = await getLearningRecommendations(language.name)
      console.log('AI Recommendations received:', aiRecommendations)
      
      // Convert markdown to HTML for better display
      const htmlRecommendations = aiRecommendations
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/#{3}\s(.*?)$/gm, '<h3 class="text-lg font-semibold text-gray-900 mb-2 mt-4">$1</h3>')
        .replace(/#{2}\s(.*?)$/gm, '<h2 class="text-xl font-bold text-gray-900 mb-3 mt-6">$1</h2>')
        .replace(/#{1}\s(.*?)$/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h1>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/^(?!<[h|p])/gm, '<p class="mb-4">')
        .replace(/(?<!>)$/gm, '</p>')
        .replace(/<\/p><p class="mb-4"><\/p>/g, '</p>')

      setRecommendations(`<div class="prose max-w-none">${htmlRecommendations}</div>`)
      setIsLoading(false)
    } catch (error) {
      console.error('Error getting AI recommendations:', error)
      setRecommendations(`
        <div class="text-center py-8">
          <p class="text-red-600 mb-4">Sorry, I couldn't generate your learning plan right now.</p>
          <p class="text-gray-600">Please try again in a moment.</p>
        </div>
      `)
      setIsLoading(false)
    }
  }

  const handleStartLearning = () => {
    setShowModal(false)
    setModalState("chat")

    // Add welcome message to chat and initialize conversation history
    const welcomeMessage: MessageType = {
      type: "bot",
      message: `Welcome to your ${selectedLanguage?.name} learning journey! 🎉 I'm here to help you learn and practice. What would you like to focus on first?`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([welcomeMessage])
    setConversationHistory([
      { role: 'assistant', content: welcomeMessage.message }
    ])
  }

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedLanguage) return

    const userMessage: MessageType = {
      type: "user",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => [...prev, userMessage])
    
    // Update conversation history
    const updatedHistory = [...conversationHistory, { role: 'user', content: message }]
    setConversationHistory(updatedHistory)
    
    setMessage("")
    setIsTyping(true)

    try {
      console.log(`Getting AI response for ${selectedLanguage.name} conversation...`)
      const aiResponse = await getInstructorResponse(selectedLanguage.name, updatedHistory)
      console.log('AI Response received:', aiResponse)

      const botResponse: MessageType = {
        type: "bot",
        message: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => [...prev, botResponse])
      setConversationHistory([...updatedHistory, { role: 'assistant', content: aiResponse }])
      setIsTyping(false)
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      const errorResponse: MessageType = {
        type: "bot",
        message: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setChatMessages((prev) => [...prev, errorResponse])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderModalContent = () => {
    switch (modalState) {
      case "language-select":
        return (
          <div className="text-center p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-6">
              <Languages className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Select a Language</h3>
            <p className="text-gray-600 mb-8 text-lg">Choose the language you want to learn with AI</p>
            <div className="grid grid-cols-2 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${lang.bgColor}`}
                >
                  <span className="text-3xl">
                    {lang.code === "es" && "🇪🇸"}
                    {lang.code === "fr" && "🇫🇷"}
                    {lang.code === "de" && "🇩🇪"}
                    {lang.code === "it" && "🇮🇹"}
                    {lang.code === "pt" && "🇵🇹"}
                    {lang.code === "ru" && "🇷🇺"}
                    {lang.code === "zh" && "🇨🇳"}
                    {lang.code === "ar" && "🇸🇦"}
                    {lang.code === "hi" && "🇮🇳"}
                    {lang.code === "tr" && "🇹🇷"}
                  </span>
                  <span className={`font-semibold text-lg ${lang.color}`}>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case "recommendations":
        return (
          <div className="flex flex-col h-full max-h-[80vh]">
            <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">Your {selectedLanguage?.name} Learning Plan</h3>
              <p className="text-gray-600 mt-2">Here's your personalized learning path</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600 text-lg">Creating your personalized learning plan...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                </div>
              ) : (
                <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: recommendations }} />
              )}
            </div>
            <div className="p-6 bg-white border-t border-gray-200 flex justify-between items-center sticky bottom-0 rounded-b-2xl">
              <button
                onClick={() => setModalState("language-select")}
                className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Back to Languages
              </button>
              <button
                onClick={handleStartLearning}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Learning {selectedLanguage?.name} →
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />

      {/* Language Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() =>
                modalState === "language-select" ? setShowModal(false) : setModalState("language-select")
              }
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            {renderModalContent()}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div
          className={`container mx-auto px-4 py-6 flex-1 flex flex-col max-w-4xl ${showModal ? "opacity-30 pointer-events-none" : ""}`}
        >
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {selectedLanguage ? `${selectedLanguage.name} Tutor` : "AI Language Tutor"}
                    </h3>
                    <p className="text-blue-100 text-sm">{isTyping ? "Typing..." : "Online • Ready to help"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 text-sm bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors flex items-center gap-2"
                  >
                    <Languages className="h-4 w-4" />
                    {selectedLanguage ? selectedLanguage.name : "Select Language"}
                  </button>
                  <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Volume2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.type === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-4"
                          : "bg-white text-gray-900 shadow-md mr-4 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {msg.type === "bot" && (
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          <p className={`text-xs mt-2 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 shadow-md rounded-2xl px-4 py-3 mr-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3 items-end">
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <Mic className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
