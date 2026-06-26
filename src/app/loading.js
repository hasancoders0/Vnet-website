export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816]">
      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />

        <p className="text-sm text-white/60 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}