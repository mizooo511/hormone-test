import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import Head from "next/head";

const questions = [{ question: "朝起きてまず何をする？", options: ["スマホ", "水を飲む", "顔を洗う", "二度寝"] }];
const results = [{ type: "セロトニン型", description: "癒し系で安定志向。", emoji: "🌿" }];
const shareUrl = "https://yourdomain.com";

export default function HormoneTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const handleAnswer = (index: number) => {
    setAnswers([...answers, index]);
    setStep(step + 1);
  };
  const getResult = () => results[answers.reduce((acc, cur) => acc + cur, 0) % results.length];
  const pageWrapperClass = "min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 font-sans text-gray-800";
  const cardClass = "bg-white rounded-2xl shadow-lg p-6 border border-gray-100";

  if (step >= questions.length) {
    const result = getResult();
    const shareText = encodeURIComponent(`私は「${result.type}」ホルモン型！`);
    const shareLink = `${shareUrl}?result=${encodeURIComponent(result.type)}`;
    return (
      <div className={pageWrapperClass}>
        <Head><title>結果</title></Head>
        <div className="max-w-xl mx-auto text-center p-8">
          <h1 className="text-3xl font-bold mb-4">あなたのホルモンタイプは…</h1>
          <div className="text-6xl mb-2">{result.emoji}</div>
          <h2 className="text-2xl mb-2">{result.type}</h2>
          <p className="mb-4">{result.description}</p>
        </div>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className={pageWrapperClass}>
      <Head><title>ホルモン性格診断</title></Head>
      <div className="max-w-xl mx-auto p-6">
        <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className={cardClass + " mb-6"}>
            <CardContent className="p-6">
              <h2 className="text-xl mb-4">Q{step + 1}. {current.question}</h2>
              <div className="grid gap-4">
                {current.options.map((opt, idx) => (
                  <Button key={idx} onClick={() => handleAnswer(idx)} className="bg-pink-500 text-white px-4 py-2 rounded-xl">{opt}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}