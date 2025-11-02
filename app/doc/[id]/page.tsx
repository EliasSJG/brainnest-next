"use client";
import React, { useEffect } from "react";

type DocumentProps = { id: string; content: string };

export default function DocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [content, setContent] = React.useState("");

  useEffect(() => {
    const docs: DocumentProps[] = JSON.parse(
      localStorage.getItem("documents") || "[]"
    );
    const doc = docs.find((d) => d.id === id);
    if (doc) setContent(doc.content);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    const docs: DocumentProps[] = JSON.parse(
      localStorage.getItem("documents") || "[]"
    );
    const index = docs.findIndex((d) => d.id === id);

    if (index !== -1) {
      docs[index].content = newContent;
      localStorage.setItem("documents", JSON.stringify(docs));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <textarea
        className="w-2/4 h-30 border border-gray-300 rounded-lg p-4 text-[3rem] my-10 shadow-lg resize-none text-center"
        placeholder="Name Your document..."
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}
