import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  MessageCircle,
  Lightbulb,
  FileText,
  Users,
  Briefcase,
  UploadCloud,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AICareerAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Career Assistant. I can help you with resume tips, interview preparation, career advice, job search strategies, and much more. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contextId, setContextId] = useState<string | null>(null);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const API_BASE =
    (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:4000";

  const quickPrompts = [
    {
      icon: <FileText className="h-4 w-4" />,
      text: "How can I improve my resume?",
    },
    {
      icon: <Users className="h-4 w-4" />,
      text: "Common interview questions?",
    },
    { icon: <Briefcase className="h-4 w-4" />, text: "Job search strategies" },
    {
      icon: <Lightbulb className="h-4 w-4" />,
      text: "Career transition advice",
    },
  ];

  // Mock AI responses based on keywords
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("resume")) {
      return "Here are some key tips to improve your resume:\n\n1. **Quantify your achievements** - Use numbers and metrics wherever possible (e.g., 'Increased sales by 25%')\n\n2. **Tailor for each job** - Customize your resume keywords to match the job description\n\n3. **Keep it concise** - Aim for 1-2 pages maximum\n\n4. **Use action verbs** - Start bullet points with strong action words like 'Led,' 'Developed,' 'Implemented'\n\n5. **Include relevant skills** - List both technical and soft skills that match the role\n\nWould you like me to elaborate on any of these points?";
    }

    if (input.includes("interview")) {
      return "Here are common interview questions and how to approach them:\n\n**1. 'Tell me about yourself'**\n- Focus on professional experience relevant to the role\n- Keep it to 2-3 minutes\n- End with why you're interested in this position\n\n**2. 'Why do you want this job?'**\n- Research the company beforehand\n- Connect your skills to their needs\n- Show genuine interest\n\n**3. 'What's your greatest weakness?'**\n- Choose a real weakness that won't disqualify you\n- Explain how you're working to improve it\n\n**4. 'Where do you see yourself in 5 years?'**\n- Show ambition but stay realistic\n- Align with potential career growth at the company\n\nWould you like practice questions for any specific type of interview?";
    }

    if (input.includes("job search") || input.includes("find job")) {
      return "Effective job search strategies:\n\n**1. Online Job Boards**\n- LinkedIn, Indeed, Glassdoor\n- Company career pages\n- Industry-specific job sites\n\n**2. Networking**\n- Attend industry events and meetups\n- Connect with alumni\n- Reach out to professionals in your field\n\n**3. Direct Applications**\n- Apply directly on company websites\n- Follow up on applications\n\n**4. Optimize Your Online Presence**\n- Update LinkedIn profile\n- Clean up social media\n- Build a professional portfolio\n\n**5. Work with Recruiters**\n- Both internal and external recruiters\n- Staffing agencies for contract work\n\nWhat specific aspect would you like to explore further?";
    }

    if (input.includes("career change") || input.includes("transition")) {
      return "Career transition can be exciting! Here's how to approach it:\n\n**1. Self-Assessment**\n- Identify transferable skills\n- Clarify your values and interests\n- Set clear career goals\n\n**2. Research Your Target Field**\n- Study job requirements\n- Understand industry trends\n- Connect with professionals in the field\n\n**3. Bridge the Gap**\n- Take relevant courses or certifications\n- Volunteer in your target field\n- Start freelancing or consulting\n\n**4. Rebrand Yourself**\n- Update resume to highlight relevant experience\n- Adjust your LinkedIn profile\n- Prepare your transition story\n\n**5. Start Small**\n- Consider lateral moves within your company\n- Look for hybrid roles that bridge both fields\n\nWhat field are you considering transitioning to?";
    }

    if (input.includes("salary") || input.includes("negotiate")) {
      return "Salary negotiation tips:\n\n**1. Do Your Research**\n- Use sites like Glassdoor, PayScale, levels.fyi\n- Consider location, experience, and company size\n- Know the market range for your role\n\n**2. Timing Matters**\n- Wait for the offer before discussing salary\n- Don't bring it up in the first interview\n\n**3. Negotiate the Package**\n- Consider benefits, PTO, flexible work\n- Stock options, bonuses, professional development\n\n**4. Practice Your Pitch**\n- Prepare your reasons for the requested amount\n- Practice with friends or career counselors\n\n**5. Be Professional**\n- Express gratitude for the offer\n- Give specific reasons for your counteroffer\n- Be prepared to compromise\n\nRemember: most employers expect some negotiation!";
    }

    // Default response
    return "That's a great question! I'd be happy to help you with career advice. Could you provide a bit more context about your specific situation? For example:\n\n- What stage of your career are you in?\n- What industry or role are you interested in?\n- What specific challenges are you facing?\n\nThe more details you share, the more personalized advice I can provide!";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const resp = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contextId, message: input }),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || `HTTP ${resp.status}`);
      }
      const data = await resp.json();
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || "Sorry, something went wrong.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (e) {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Failed to reach AI service. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const resp = await fetch(`${API_BASE}/api/upload-resume`, {
        method: "POST",
        body: formData,
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || `HTTP ${resp.status}`);
      }
      const data = await resp.json();
      if (data.contextId) {
        setContextId(data.contextId);
        setResumeScore(typeof data.score === "number" ? data.score : null);
        const strengths: string[] = Array.isArray(data.strengths)
          ? data.strengths
          : [];
        const improvements: string[] = Array.isArray(data.improvements)
          ? data.improvements
          : [];
        const report = data.report || null;

        const reportLines: string[] = [
          `Resume uploaded. Score: ${data.score}/100.`,
          report?.overall_score !== undefined
            ? `Overall Report Score: ${report.overall_score}/10`
            : "",
          report?.ats_score !== undefined
            ? `ATS Score: ${report.ats_score}%`
            : "",
          strengths.length ? "\nStrengths:" : "",
          ...strengths.map((s: string) => `- ${s}`),
          improvements.length ? "\nImprovements:" : "",
          ...improvements.map((s: string) => `- ${s}`),
          "\nYou can now ask questions and get tailored advice based on your resume.",
        ].filter(Boolean);

        const reportMessage = reportLines.join("\n");

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: reportMessage,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: "Upload failed. Please try a different file.",
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Error uploading resume. Please try again later.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Career Assistant
          </h1>
          <p className="text-gray-600">
            Get personalized career advice and guidance powered by AI
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center gap-3">
              <button
                onClick={onUploadClick}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                disabled={uploading}
              >
                <UploadCloud className="h-4 w-4" />
                <span>
                  {uploading ? "Uploading…" : "Upload Resume (PDF/Image)"}
                </span>
              </button>
              {resumeScore !== null && (
                <span className="text-sm text-gray-700">
                  Resume Score:{" "}
                  <span className="font-semibold">{resumeScore}/100</span>
                </span>
              )}
            </div>
            {contextId && (
              <span className="text-xs text-gray-500">Context ready</span>
            )}
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-blue-500 ml-2"
                        : "bg-gray-200 mr-2"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Quick prompts:
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  {prompt.icon}
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: "40px", maxHeight: "120px" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              24/7 Career Guidance
            </h3>
            <p className="text-gray-600 text-sm">
              Get instant answers to your career questions anytime, anywhere.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Personalized Advice
            </h3>
            <p className="text-gray-600 text-sm">
              Receive tailored recommendations based on your experience and
              goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Industry Insights
            </h3>
            <p className="text-gray-600 text-sm">
              Stay updated with the latest trends and best practices in your
              field.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerAssistant;
