"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type DocumentProps = { content: string; id: string; name?: string };
type FolderProps = { id: string; name: string; documents: string[] };

export default function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const router = useRouter();

  const [folder, setFolder] = React.useState<FolderProps | null>(null);
  const [documents, setDocuments] = React.useState<DocumentProps[]>([]);

  useEffect(() => {
    const folders: FolderProps[] = JSON.parse(
      localStorage.getItem("folder") || "[]"
    );
    const foundFolder = folders.find((f) => f.id === id);
    if (foundFolder) setFolder(foundFolder);

    const docs: DocumentProps[] = JSON.parse(
      localStorage.getItem("documents") || "[]"
    );
    if (foundFolder)
      setDocuments(
        docs.filter((doc) => foundFolder.documents.includes(doc.id))
      );
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-6">{folder?.name}</h1>
      <div className="flex flex-wrap">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border border-gray-300 rounded-xl w-55 h-75 my-4 hover:shadow-lg transition-shadow mr-4 shadow flex items-center justify-center cursor-pointer"
            onClick={() => router.push(`/doc/${doc.id}`)}
          >
            <span className="text-xl font-medium text-center">
              {doc.content.substring(0, 20) || "Untitled Document"}
            </span>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-gray-500 text-lg">
            No documents yet in this folder.
          </p>
        )}
      </div>
    </div>
  );
}
