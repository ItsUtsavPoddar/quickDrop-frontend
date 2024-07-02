import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderChat() {
  return (
    <div className="flex flex-row justify-center items-center pt-32  space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

// This component is used to show a loading state when the messages are being fetched from the server.

const LoaderChatSmall = () => {
  return (
    <div className="flex items-start gap-4 justify-end">
      <div className="grid gap-1">
        <div className="grid items-center gap-2 justify-end">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
};

export { LoaderChatSmall };
