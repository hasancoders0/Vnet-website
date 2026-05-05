export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🚧 Coming Soon
        </h1>
        <p className="text-gray-400">
          We are building something awesome. Stay tuned!
        </p>
      </div>
    </div>
  );
}