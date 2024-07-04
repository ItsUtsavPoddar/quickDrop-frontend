import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function convertToLocalTime(dateTimeString) {
  const date = new Date(dateTimeString); // Automatically converts to local time

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const MessageReceived = ({ data }) => {
  return (
    <div className="flex items-start gap-4 relative z-10">
      <Avatar className="h-10 w-10 text-black">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>
          {data.username
            ? data.username[0].toUpperCase()
            : data.guestName
            ? data.guestName[0].toUpperCase()
            : ""}
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{data.username || data.guestName}</p>
          <p className="text-xs text-gray-300">
            {convertToLocalTime(data.createdAt)}
          </p>
        </div>
        <div className="bg-[#0000004d] text-white rounded-md px-4 py-2">
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageReceived;
