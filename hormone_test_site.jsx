import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Head from "next/head";

const questions = [
  // （省略）そのまま質問20問を維持
];

const results = [
  // （省略）結果6タイプもそのまま維持
];

const shareUrl = "https://yourdomain.com";

export default function HormoneTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setAnswers([...answers, index]);
    setStep(step + 1);
  };

  const getResult = () => {
    const sum = answers.reduce((acc, cur) => acc + cur, 0);
    const index = sum % results.length;
    return results[index];
  };

  const pageWrapperClass = "min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 font-sans text-gray-800";
  const cardClass = "bg-white rounded-2xl shadow-lg p-6 border border-gray-100";

  if (step >= questions.length) {
    const result = getResult();
    const shareText = encodeURIComponent(`私は「${result.type}」ホルモン型！あなたも試してみて →`);
    const shareLink = `${shareUrl}?result=${encodeURIComponent(result.type)}`;

    return (
      <div className={pageWrapperClass}>
        <Head>
          <title>ホルモン性格診断 | 結果</title>
          <meta name="description" content="あなたのホルモン型を診断しよう！" />
        </Head>
        <div className="max-w-xl mx-auto text-center p-8">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">あなたのホルモンタイプは…</h1>
          <div className="text-7xl mb-4 animate-pulse">{result.emoji}</div>
          <h2 className="text-3xl font-semibold mb-2 text-pink-600">{result.type}</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{result.description}</p>

          <div className="space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-5 py-2 rounded-full shadow hover:bg-blue-600 transition"
            >
              Xでシェア
            </a>
            <a
              href={`https://line.me/R/msg/text/?${shareText} ${shareLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-5 py-2 rounded-full shadow hover:bg-green-600 transition"
            >
              LINEでシェア
            </a>
          </div>
        </div>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className={pageWrapperClass}>
      <Head>
        <title>ホルモン性格診断</title>
        <meta name="description" content="あなたの性格をホルモンで診断してみよう！" />
      </Head>
      <div className="max-w-xl mx-auto p-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className={cardClass + " mb-6"}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Q{step + 1}. {current.question}</h2>
              <div className="grid gap-4">
                {current.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl shadow"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
