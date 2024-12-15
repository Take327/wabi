type MessageCardProps = {
  message: string;
};

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="background-washi w-full max-w-5xl p-6 flex justify-end items-start">
      <p className="text-vertical whitespace-pre-wrap text-left">
        {message || "メッセージがありません。"}
      </p>
    </div>
  );
}
