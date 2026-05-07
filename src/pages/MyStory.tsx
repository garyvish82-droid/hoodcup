export default function MyStory() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero */}
      <div className="bg-amber-900 text-white px-6 py-16 text-center">
        <div className="text-5xl mb-4">☕</div>
        <h1 className="text-4xl font-bold mb-3">HoodCup</h1>
        <p className="text-amber-200 text-lg max-w-sm mx-auto">
          A free loyalty card app for every coffee shop that deserves one.
        </p>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12 space-y-12">

        {/* The story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-900">Why I built this</h2>
          <p className="text-gray-700 leading-relaxed">
            I'm a product manager who believes the best products are the ones that just work —
            no friction, no noise, no paywall. I walk into small coffee shops all the time and
            see paper stamp cards getting lost, forgotten, or just never used.
          </p>
          <p className="text-gray-700 leading-relaxed">
            HoodCup is my answer to that. A digital loyalty card that any coffee shop can use
            today, for free, forever. No subscription. No setup fee. No catch.
          </p>
        </section>

        {/* Built from love */}
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
          <div className="text-3xl">🛠️</div>
          <h2 className="text-xl font-bold text-amber-900">Built from love, not a roadmap</h2>
          <p className="text-gray-700 leading-relaxed">
            This is a side project I vibe-coded in my spare time. No team, no investors,
            no OKRs. Just me, a strong coffee, and a genuine belief that small businesses
            deserve great software too.
          </p>
        </section>

        {/* Free forever */}
        <section className="bg-amber-900 text-white rounded-2xl p-6 space-y-3">
          <div className="text-3xl">🎁</div>
          <h2 className="text-xl font-bold">Free. Always.</h2>
          <p className="text-amber-200 leading-relaxed">
            HoodCup is a give-away. If you run a coffee shop and want to use it —
            it's yours. If you know someone who would love it, share it.
            That's the whole business model.
          </p>
        </section>

        {/* Simple product values */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-900">What I believe in</h2>
          <div className="space-y-3">
            {[
              ["✦", "Simple beats clever"],
              ["✦", "Speed of use is a feature"],
              ["✦", "Small businesses deserve great tools"],
              ["✦", "Good products come from empathy, not specs"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-amber-600 font-bold mt-0.5">{icon}</span>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 pt-4">
          <p className="text-gray-500 text-sm">Want to use HoodCup at your coffee shop?</p>
          <a
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Get started — it's free ☕
          </a>
        </section>

        {/* Try it */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
          <p className="text-amber-900 font-semibold text-lg">Try it yourself 👇</p>
          <p className="text-gray-500 text-sm">Enter your phone and see the loyalty card flow</p>
          <a
            href="/join"
            className="inline-block bg-amber-900 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Check my loyalty card ☕
          </a>
        </section>

        {/* Tech spec */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-amber-900">Under the hood</h2>
            <p className="text-gray-500 text-sm mt-1">For the technical folks evaluating this for their shop</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: "🏗️",
                title: "Frontend",
                items: ["React 18 + TypeScript", "Vite build tooling", "Tailwind CSS", "Hosted on AWS Amplify CDN"],
              },
              {
                icon: "🗄️",
                title: "Backend & Database",
                items: ["Supabase (PostgreSQL)", "Row Level Security on all tables", "Real-time capable", "Automatic backups"],
              },
              {
                icon: "🔒",
                title: "Auth & Security",
                items: ["Supabase Auth (JWT)", "Role-based access (admin / client)", "RLS policies per role", "No passwords stored in plain text"],
              },
              {
                icon: "🚀",
                title: "Scale & Performance",
                items: ["CDN-served static assets", "Free tier handles ~50k MAU", "Sub-100ms DB queries", "Zero cold starts"],
              },
              {
                icon: "💰",
                title: "Cost",
                items: ["$0/month up to ~5,000 users", "AWS Amplify free tier", "Supabase free tier", "No hidden fees"],
              },
              {
                icon: "🔧",
                title: "Ops",
                items: ["CI/CD via GitHub → Amplify", "Zero-downtime deploys", "No server to manage", "Open for self-hosting"],
              },
            ].map(({ icon, title, items }) => (
              <div key={title} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-bold text-amber-900">{title}</h3>
                </div>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Social links */}
        <section className="border-t border-amber-200 pt-8 flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">Built by Garik — say hi</p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/garikvishnevski"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-amber-200 text-amber-900 font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-shadow text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/garikvishnevski"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-amber-200 text-amber-900 font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-shadow text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
