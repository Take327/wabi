type MessageCardProps = {
  messageType: string;
  message: string;
};

export default function MessageCard({ messageType, message }: MessageCardProps) {
  return (
    <div className="background-washi w-full max-w-5xl p-6 flex justify-end items-start">

      <p className="text-vertical whitespace-pre-wrap text-left">
        {message || "メッセージがありません。"}
      </p>

      <p className="text-vertical whitespace-pre-wrap text-center text-lg font-bold mt-4  min-w-12 overflow-y-hidden">
        {messageType}
      </p>
    </div>
  );
}
