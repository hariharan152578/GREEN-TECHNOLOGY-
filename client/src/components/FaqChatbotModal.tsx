import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  colors: any;
}

interface Message {
  sender: "user" | "bot";
  text: string;
}

const questionFlow = [
  {
    questions: [
      {
        q: "What is Green Technology?",
        a: "Green technology focuses on eco-friendly solutions that reduce environmental impact."
      },
      {
        q: "What courses do you offer?",
        a: "We offer Data Science, Full Stack, Cyber Security, and AI/ML."
      },
      {
        q: "Do you provide placements?",
        a: "Yes, we provide placement training and interview support."
      },
      {
        q: "Where are you located?",
        a: "We are located in multiple cities across India."
      }
    ]
  },
  {
    questions: [
      {
        q: "Is the course beginner friendly?",
        a: "Yes, our courses are designed for freshers and beginners."
      },
      {
        q: "Are classes online or offline?",
        a: "We offer both online and classroom training."
      },
      {
        q: "What is course duration?",
        a: "Duration ranges from 3 to 6 months depending on the course."
      },
      {
        q: "Do you provide certificates?",
        a: "Yes, industry-recognized certificates are provided."
      }
    ]
  },
  {
    questions: [
      {
        q: "How can I enroll?",
        a: "You can enroll by filling the enquiry form or contacting us."
      },
      {
        q: "Is EMI available?",
        a: "Yes, flexible EMI options are available."
      },
      {
        q: "What is the course fee?",
        a: "Fees vary by course; our team will guide you personally."
      },
      {
        q: "Can I talk to a counselor?",
        a: "Yes, our academic counselor will contact you."
      }
    ]
  }
];

const FaqChatbotModal = ({ isOpen, onClose, colors }: Props) => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const handleQuestionClick = (q: string, a: string) => {
    setMessages(prev => [
      ...prev,
      { sender: "user", text: q },
      { sender: "bot", text: a }
    ]);

    if (step < 2) setStep(step + 1);
  };

  return (
    <div className="fixed right-6 bottom-6 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] h-[600px] rounded-2xl shadow-2xl flex flex-col"
        style={{ backgroundColor: colors.cream }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex justify-between items-center rounded-t-2xl"
          style={{ backgroundColor: colors.darkGreen, color: colors.cream }}
        >
          <h3 className="font-bold">🤖 Green Tech Assistant</h3>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.sender === "user" ? "ml-auto" : "mr-auto"
              }`}
              style={{
                backgroundColor:
                  msg.sender === "user" ? colors.gold : colors.white
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Question Options */}
        {step < questionFlow.length && (
          <div className="border-t p-3 space-y-2">
            {questionFlow[step].questions.map((item, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick(item.q, item.a)}
                className="w-full text-left px-3 py-2 rounded-lg border text-sm hover:opacity-80"
                style={{ borderColor: colors.gold }}
              >
                {item.q}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FaqChatbotModal;
