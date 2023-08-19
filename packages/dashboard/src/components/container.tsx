import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
    </main>
  );
}

export default Container;
