"use client";

import { Loader } from "@/components/loader";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;