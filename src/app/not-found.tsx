import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground">That thread is not on the map.</p>
      <Button nativeButton={false} render={<Link href="/" />} className="mt-8 h-10">
        Back home
      </Button>
    </div>
  );
}
