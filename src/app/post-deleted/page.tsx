"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostDeleted() {
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickNotifications = () => {
    router.push("/notifications");
  };
  return (
    <div className="bg- flex h-screen flex-col items-center justify-center gap-5">
      <Card className="max-w-[26.5rem] border shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-destructive">
            Post Deleted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            The post you&#39;re looking for has been removed or no longer
            exists.
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-3">
        <Button
          variant="outline"
          className="border-gray-300 bg-background"
          onClick={handleClickNotifications}
        >
          Back to notifications page <Undo2 className="ml-2 size-5" />
        </Button>
        <Button onClick={handleClickHome}>
          Back to home page <Undo2 className="ml-2 size-5" />
        </Button>
      </div>
    </div>
  );
}
