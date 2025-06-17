"use client"

import { useState, useRef, useEffect } from 'react'
import { Mic, Volume2, RotateCw, Pause, Loader2 } from 'lucide-react'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'
import { translateText } from '../../components/const_model_api'
import { systemPrompt, getTranslationPrompt } from "./prompt"

// Type definitions for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
    interpretation: any;
    emma: Document | null;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    abort(): void;
    start(): void;
    stop(): void;
  }

  var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
}

type Language = {
  code: string
  name: string
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  
] as const;

type LanguageCode = typeof LANGUAGES[number]['code'];

export default function VoiceTranslationPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>('en');
    const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('es');
    const [transcript, setTranscript] = useState('');
    const [translation, setTranslation] = useState('');
    const [error, setError] = useState('');

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Store the latest transcript in a ref to avoid stale closures
    const transcriptRef = useRef(transcript);
    
    // Keep the ref in sync with state
    useEffect(() => {
        transcriptRef.current = transcript;
    }, [transcript]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition() as SpeechRecognition;
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = sourceLanguage;

                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    const newTranscript = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
                    setTranscript(newTranscript);
                };
                
                // Handle when speech recognition ends
                recognition.onend = () => {
                    // Only process if we have a transcript
                    if (transcriptRef.current && transcriptRef.current.trim()) {
                        processAudio();
                    }
                };

                recognition.onerror = (event: Event) => {
                    const errorEvent = event as unknown as SpeechRecognitionErrorEvent;
                    console.error('Speech recognition error:', errorEvent.error);
                    setError(`Error in speech recognition: ${errorEvent.error}`);
                    setIsRecording(false);
                };

                recognitionRef.current = recognition;
            } else {
                setError('Speech recognition is not supported in this browser');
            }
        }
    }, [sourceLanguage]);

    // Clean up function
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
            }
            if (synthesisRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                // Clear the audio chunks for the next recording
                audioChunksRef.current = [];
                
                // Process the current transcript if we have one
                if (transcript.trim()) {
                    processAudio();
                }
            };

            mediaRecorderRef.current.start();
            recognitionRef.current?.start();
            setIsRecording(true);
            setError('');
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setError('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        // Don't do anything if we're not actually recording
        if (!isRecording) return;
        
        // Update UI state immediately
        setIsRecording(false);
        
        // Stop the media recorder
        if (mediaRecorderRef.current) {
            try {
                if (mediaRecorderRef.current.state !== 'inactive') {
                    mediaRecorderRef.current.stop();
                }
            } catch (err) {
                console.error('Error stopping media recorder:', err);
            }
        }
        
        // Stop speech recognition
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (err) {
                console.error('Error stopping speech recognition:', err);
            }
        }
        
        // If we have a transcript, process it
        if (transcript.trim()) {
            processAudio();
        }
    };

    const processAudio = async (audioBlob?: Blob) => {
        try {
            setIsTranslating(true);
            
            // Get the current transcript
            const currentTranscript = transcript.trim();
            
            if (!currentTranscript) {
                throw new Error('No text to translate. Please speak clearly and try again.');
            }
            
            // In a real app, you would send the audio to a speech-to-text API here
            // For this example, we're using the Web Speech API's recognition result
            const translatedText = await translateText(currentTranscript, targetLanguage, sourceLanguage);
            
            if (!translatedText || !translatedText.trim()) {
                throw new Error('Received empty translation. Please try again.');
            }
            
            setTranslation(translatedText);
            speakText(translatedText);
        } catch (err) {
            // console.error('Translation error:', err);
            // setError('Error during translation. Please try again.');
        } finally {
            setIsTranslating(false);
        }
    };

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = targetLanguage;
            utterance.onend = () => setIsPlaying(false);
            
            // Stop any ongoing speech
            window.speechSynthesis.cancel();
            
            synthesisRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        } else {
            setError('Text-to-speech is not supported in this browser');
        }
    };

    const stopSpeaking = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        }
    };

    const reset = () => {
        setTranscript('');
        setTranslation('');
        setError('');
        stopSpeaking();
    };

    const getLanguageName = (code: LanguageCode) => {
        return LANGUAGES.find(lang => lang.code === code)?.name || code;
    };

    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setTranscript(translation);
        setTranslation(transcript);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Voice-to-Voice Translation</h1>
                        <p className="text-xl text-gray-600">Speak naturally and get instant voice translation</p>
                    </div>

                    {/* Language Selection */}
                    <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">Select Languages</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-gray-900">
                            {/* Source Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                                <select
                                    value={sourceLanguage}
                                    onChange={(e) => setSourceLanguage(e.target.value as LanguageCode)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    disabled={isRecording}
                                >
                                    {LANGUAGES.map((lang) => (
                                        <option key={`src-${lang.code}`} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Swap Button */}
                            <div className="flex items-center justify-center">
                                <button 
                                    onClick={swapLanguages}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                    disabled={isRecording || isTranslating}
                                    type="button"
                                >
                                    <RotateCw className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Target Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                                <select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value as LanguageCode)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    disabled={isRecording}
                                >
                                    {LANGUAGES.filter(lang => lang.code !== sourceLanguage).map((lang) => (
                                        <option key={`tgt-${lang.code}`} value={lang.code}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Translation Box */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                        {/* Source Text */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                    {getLanguageName(sourceLanguage)}
                                </span>
                                <button
                                    onClick={reset}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                    disabled={isRecording || isTranslating}
                                    type="button"
                                >
                                    <RotateCw className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="min-h-24 p-3 bg-gray-50 rounded-lg">
                                {transcript || (
                                    <p className="text-gray-600 italic">Your speech will appear here...</p>
                                )}
                            </div>
                        </div>

                        {/* Target Text */}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-500">
                                    {getLanguageName(targetLanguage)}
                                </span>
                                <div className="flex space-x-2">
                                    {translation && (
                                        <button
                                            onClick={() => isPlaying ? stopSpeaking() : speakText(translation)}
                                            className={`p-2 rounded-full ${isPlaying ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:opacity-80`}
                                            disabled={isTranslating}
                                            type="button"
                                        >
                                            {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="min-h-24 p-3 bg-blue-50 rounded-lg">
                                {isTranslating ? (
                                    <div className="flex items-center space-x-2 text-blue-600">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Translating...</span>
                                    </div>
                                ) : translation ? (
                                    <span className="text-gray-900">{translation}</span>
                                ) : (
                                    <p className="text-gray-600 italic">Translation will appear here...</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Record Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`flex items-center space-x-2 px-8 py-4 rounded-full text-white font-semibold text-lg ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} transition-colors shadow-lg hover:shadow-xl`}
                            disabled={isTranslating}
                            type="button"
                        >
                            {isRecording ? (
                                <>
                                    <div className="h-4 w-4 bg-white rounded-full animate-pulse"></div>
                                    <span>Stop Recording</span>
                                </>
                            ) : (
                                <>
                                    <Mic className="h-6 w-6" />
                                    <span>Start Speaking</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="mt-12 bg-blue-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">How to use:</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Select the source and target languages</li>
                            <li>Click "Start Speaking" and speak into your microphone</li>
                            <li>Click "Stop Recording" when you're done</li>
                            <li>Your speech will be translated and read aloud automatically</li>
                        </ol>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
