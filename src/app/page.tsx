"use client"

import { useState, useEffect } from "react"
import { Header } from "../../src/app/components/header"
import { Footer } from "../../src/app/components/footer"
import {
  Mic,
  FileText,
  GraduationCap,
  Globe,
  ArrowRight,
  Play,
  Check,
  ChevronDown,
  MessageCircle,
  Headphones,
  BookOpen,
  Zap,
  Shield,
  Clock,
  Users,
  Brain,
  Smartphone,
} from "lucide-react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const mainFeatures = [
    {
      icon: <Mic className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-600" />,
      title: "Voice Translation",
      description: "Real-time voice translation with natural speech output and accent recognition",
      details: "Supports 100+ languages with 99.9% accuracy",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FileText className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-purple-600" />,
      title: "Document Translation",
      description: "Upload documents and translate text instantly with formatting preservation",
      details: "PDF, Word, Excel, PowerPoint supported",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <GraduationCap className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-green-600" />,
      title: "AI Language Tutor",
      description: "Personalized language learning with interactive AI-powered conversations",
      details: "Adaptive learning with progress tracking",
      gradient: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
    },
  ]

  const keyFeatures = [
    {
      icon: <Zap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Get translations in milliseconds",
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600" />,
      title: "Secure & Private",
      description: "End-to-end encryption for all data",
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />,
      title: "24/7 Available",
      description: "Always ready when you need it",
    },
    {
      icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-600" />,
      title: "Team Collaboration",
      description: "Share and work together seamlessly",
    },
    {
      icon: <Brain className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-pink-600" />,
      title: "AI-Powered",
      description: "Advanced machine learning algorithms",
    },
    {
      icon: <Smartphone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-indigo-600" />,
      title: "Cross-Platform",
      description: "Works on all devices and platforms",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Choose Your Method",
      description: "Select voice, text, or document translation based on your needs",
      icon: <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />,
      bgColor: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      number: "02",
      title: "Input Your Content",
      description: "Speak, type, or upload your content in any supported language",
      icon: <Headphones className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />,
      bgColor: "from-green-500 to-green-600",
      lightBg: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      number: "03",
      title: "Get Instant Results",
      description: "Receive accurate translations with natural pronunciation and context",
      icon: <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" />,
      bgColor: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  const faqs = [
    {
      question: "How accurate are the translations?",
      answer:
        "Our AI-powered translation engine achieves 99.9% accuracy for major languages, with continuous learning from user feedback and context analysis.",
    },
    {
      question: "Which languages are supported?",
      answer:
        "We support over 100 languages including all major world languages, regional dialects, and specialized terminology for various industries.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use enterprise-grade encryption and never store your personal translations. All data is processed securely and deleted after translation.",
    },
    {
      question: "Can I use it offline?",
      answer:
        "Basic text translation is available offline, while advanced features like voice translation and AI tutoring require an internet connection.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "scroll md:fixed",
          }}
        ></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-10 sm:top-16 md:top-20 left-5 sm:left-8 md:left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-5 sm:right-8 md:right-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-cyan-200/20 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4 z-20 relative pt-8 sm:pt-12 md:pt-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6 sm:mb-7 md:mb-8">
              <div className="relative">
                <Globe className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 text-blue-600 animate-bounce" />
                <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-7 md:mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in leading-tight">
              Break Language
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Barriers Forever</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay px-4 md:px-0">
              Experience the future of communication with AI-powered translation that understands context, emotion, and
              cultural nuances
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-center mb-12 sm:mb-14 md:mb-16 px-4 md:px-0">
              <button className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base sm:text-lg md:text-lg px-8 sm:px-9 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center">
                Start Translating Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full sm:w-auto group border-2 border-gray-400 hover:border-gray-600 text-gray-700 hover:text-gray-900 text-base sm:text-lg md:text-lg px-8 sm:px-9 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center hover:bg-gray-50">
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section - Interactive Cards */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-18 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Discover our suite of advanced AI-powered translation tools designed for the modern world
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-7xl mx-auto items-center">
            {/* Feature Cards */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {mainFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-4 sm:p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? `border-blue-500 ${feature.bgColor} shadow-2xl scale-105`
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4 sm:space-x-5 md:space-x-6">
                    <div
                      className={`p-3 sm:p-3.5 md:p-4 rounded-2xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-base text-gray-600 mb-2 sm:mb-2.5 md:mb-3 leading-relaxed">
                        {feature.description}
                      </p>
                      <p className="text-xs sm:text-sm md:text-sm text-blue-600 font-medium">{feature.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Showcase */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl">
                <div className="text-center">
                  <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center">{mainFeatures[activeFeature].icon}</div>
                  <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-3.5 md:mb-4 text-gray-900">
                    {mainFeatures[activeFeature].title}
                  </h3>
                  <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-6">
                    {mainFeatures[activeFeature].description}
                  </p>
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg">
                    <p className="text-sm sm:text-base md:text-base text-blue-600 font-semibold">
                      {mainFeatures[activeFeature].details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-14 md:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 md:gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: "100+", label: "Languages", color: "text-blue-600" },
              { number: "99.9%", label: "Accuracy", color: "text-green-600" },
              { number: "24/7", label: "Available", color: "text-purple-600" },
              { number: "2M+", label: "Users", color: "text-orange-600" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-18 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Advanced features that make translation effortless and reliable
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-6 sm:p-7 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-xl font-bold ml-3 sm:ml-3.5 md:ml-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-18 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Get started with our intuitive three-step process
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  {/* Connection Line - Hidden on mobile */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 sm:top-18 md:top-20 left-full w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-6 z-0 rounded-full"></div>
                  )}

                  <div className="relative z-10">
                    <div className="flex justify-center mb-6 sm:mb-7 md:mb-8">
                      <div className="relative">
                        <div
                          className={`w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gradient-to-br ${step.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 sm:-top-2.5 md:-top-3 -right-2 sm:-right-2.5 md:-right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center text-gray-700 text-sm sm:text-base md:text-lg font-bold shadow-lg">
                          {step.number}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2 md:px-0">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase - Alternating Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 md:space-y-24">
            {/* Voice Translation Showcase */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <Mic className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 mr-3 sm:mr-3.5 md:mr-4 flex-shrink-0" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Voice Translation</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  Experience real-time voice translation with natural speech output. Our advanced AI recognizes accents,
                  dialects, and context to provide the most accurate translations.
                </p>
                <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
                  {[
                    "Real-time voice recognition",
                    "Natural speech synthesis",
                    "100+ language support",
                    "Accent adaptation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 bg-white p-6 sm:p-7 md:p-8 rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 sm:p-10 md:p-12 rounded-2xl text-white text-center">
                  <Mic className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mx-auto mb-4 sm:mb-5 md:mb-6" />
                  <h4 className="text-xl sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4">Speak Naturally</h4>
                  <p className="text-blue-100 text-sm sm:text-base md:text-base">
                    Just speak and get instant translations
                  </p>
                </div>
              </div>
            </div>

            {/* Document Translation Showcase */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="lg:order-2">
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <FileText className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mr-3 sm:mr-3.5 md:mr-4 flex-shrink-0" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Document Translation</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  Upload any document and get professional translations while preserving formatting, layout, and
                  structure. Perfect for business documents and academic papers.
                </p>
                <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
                  {[
                    "PDF, Word, Excel support",
                    "Formatting preservation",
                    "Batch processing",
                    "Professional accuracy",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:order-1 bg-white p-6 sm:p-7 md:p-8 rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 sm:p-10 md:p-12 rounded-2xl text-white text-center">
                  <FileText className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mx-auto mb-4 sm:mb-5 md:mb-6" />
                  <h4 className="text-xl sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4">
                    Upload & Translate
                  </h4>
                  <p className="text-purple-100 text-sm sm:text-base md:text-base">
                    Drag, drop, and get professional translations
                  </p>
                </div>
              </div>
            </div>

            {/* AI Tutor Showcase */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mr-3 sm:mr-3.5 md:mr-4 flex-shrink-0" />
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">AI Language Tutor</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  Learn languages with our AI-powered tutor that adapts to your learning style. Get personalized
                  lessons, practice conversations, and track your progress.
                </p>
                <ul className="space-y-3 sm:space-y-3.5 md:space-y-4">
                  {[
                    "Personalized learning paths",
                    "Interactive conversations",
                    "Progress tracking",
                    "Cultural context learning",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 bg-white p-6 sm:p-7 md:p-8 rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 sm:p-10 md:p-12 rounded-2xl text-white text-center">
                  <GraduationCap className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mx-auto mb-4 sm:mb-5 md:mb-6" />
                  <h4 className="text-xl sm:text-xl md:text-2xl font-bold mb-3 sm:mb-3.5 md:mb-4">Learn & Practice</h4>
                  <p className="text-green-100 text-sm sm:text-base md:text-base">
                    AI-powered personalized language learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-18 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl md:text-xl text-gray-600 max-w-3xl mx-auto px-4 md:px-0">
              Get answers to common questions about our translation platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-4 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-4 sm:p-5 md:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base sm:text-lg md:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFaq === index && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 border-t border-gray-100">
                    <p className="text-sm sm:text-base md:text-base text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-18 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900">
            Ready to Start?
          </h2>
          <p className="text-base sm:text-lg md:text-lg lg:text-xl mb-8 sm:mb-9 md:mb-10 max-w-2xl mx-auto text-gray-600 px-4 md:px-0">
            Join millions of users who trust TranslateAI for their communication needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg md:text-lg px-6 sm:px-7 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5" />
            </button>

            <button className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-base sm:text-lg md:text-lg px-6 sm:px-7 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
