// app/page.tsx
import CodeRainBackground from "@/components/CodeRainBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      <CodeRainBackground />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to My Page</h1>
        <p className="mt-2">Cool VS Code style background effect!</p>
      </div>
    </main>
  );
}
