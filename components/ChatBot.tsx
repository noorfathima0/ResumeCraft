// components/ChatBot.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Bot, Send } from "lucide-react";
import { useResumeStore } from "@/lib/resume-store";

const chatSteps = [
  { key: "firstName", question: "Hey there! 👋 What's your first name?" },
  { key: "lastName", question: "Great! And your last name?" },
  { key: "title", question: "What’s your current job title or the one you're aiming for?" },
  { key: "email", question: "Awesome. What's the best email to contact you at?" },
  { key: "phone", question: "And your phone number, please?" },
  { key: "location", question: "Where are you based? 🌍" },
  { key: "linkedin", question: "Can you share your LinkedIn profile URL?" },
  { key: "website", question: "Do you have a personal website or portfolio you'd like to add?" },
  { key: "summary", question: "Lastly, give me a short summary of your professional background. 🧠" },
];

async function askHuggingFace(question: string): Promise<string> {
  const response = await fetch("https://api-inference.huggingface.co/models/deepset/roberta-base-squad2", {
    method: "POST",
    headers: {
      Authorization: `Bearer YOUR_HUGGINGFACE_API_TOKEN`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        question,
        context: `You are a friendly, helpful AI assistant guiding users to build awesome resumes. Answer questions like:
        - What skills should a software engineer include?
        - How do I write a professional summary?
        - What's the best way to format education details?
        - Do I need to include a photo?
        - Should I tailor my resume for each job?`,
      },
    }),
  });

  const data = await response.json();
  return data?.answer || "Hmm, I couldn't find a perfect answer, but feel free to rephrase that! 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<any>({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [mode, setMode] = useState<"resume" | "qa">("resume");
  const { updatePersonalInfo, addEducation, addExperience, addProject, updateSkills } = useResumeStore();

  const handleSend = async () => {
    if (!input.trim()) return;

    if (mode === "qa") {
      const answer = await askHuggingFace(input);
      setMessages([...messages, { role: "user", content: input }, { role: "bot", content: answer }]);
      setInput("");
      return;
    }

    const currentKey = chatSteps[step].key;
    const newResponses = { ...responses, [currentKey]: input };
    setResponses(newResponses);
    setInput("");

    if (step < chatSteps.length - 1) {
      setStep(step + 1);
    } else {
      updatePersonalInfo({
        firstName: newResponses.firstName,
        lastName: newResponses.lastName,
        title: newResponses.title,
        email: newResponses.email,
        phone: newResponses.phone,
        location: newResponses.location,
        linkedin: newResponses.linkedin,
        website: newResponses.website,
        summary: newResponses.summary,
      });

      // Add placeholders or basic entries for other fields as friendly suggestions
      addEducation({
        id: Date.now().toString(),
        institution: "", degree: "", field: "", location: "", startDate: "", endDate: "", gpa: "",
      });
      addExperience({
        id: Date.now().toString(),
        company: "", position: "", location: "", startDate: "", endDate: "", current: false, description: [],
      });
      addProject({
        id: Date.now().toString(),
        name: "", description: "", technologies: [], link: "", github: "",
      });
      updateSkills({
        technical: [],
        soft: [],
      });
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Bot size={24} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl p-4 z-50"
        >
          <div className="text-sm text-gray-800 mb-2 font-semibold">
            {mode === "qa" ? "💬 Ask me anything about resumes!" : chatSteps[step].question}
          </div>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring"
            placeholder="Type your response here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="mt-2 w-full flex justify-center items-center gap-2 text-sm bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handleSend}
          >
            Send <Send size={16} />
          </button>
          <div className="mt-3 text-xs text-right">
          </div>
        </motion.div>
      )}
    </>
  );
}
