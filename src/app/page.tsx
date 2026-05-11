import ContactForm from "@/components/portfolio/ContactForm";

const projectHighlights = [
  {
    title: "Brand Identity System",
    role: "Visual direction, logo set, art prints",
    description:
      "An elegant identity crafted for a lifestyle brand seeking a premium, timeless look across digital and print touchpoints.",
  },
  {
    title: "Editorial Campaign",
    role: "Layout design, typography, packaging mockups",
    description:
      "A vibrant campaign bringing a fresh color palette and expressive imagery to a seasonal product launch.",
  },
  {
    title: "UX-led Website Refresh",
    role: "UI concept, motion, landing page art",
    description:
      "A design direction that blends sophisticated visuals with modern usability for a creative service brand.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F4EE] text-[#1D1914] selection:bg-[#D8CEBF] selection:text-[#1D1914]">
      <section className="relative overflow-hidden px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#8A5A37]/90 mb-3">Godswill Chizoba</p>
              <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl">
                Designing bold, refined visual stories for brands that want to be remembered.
              </h1>
            </div>
            <div className="rounded-3xl border border-[#D8CEBE] bg-white/80 p-6 shadow-xl shadow-[#1D1914]/5 max-w-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-[#8A5A37] mb-3">Available for freelance</p>
              <p className="text-base leading-relaxed text-[#1D1914]/80">
                I help businesses translate ideas into premium visual systems, campaigns and digital experiences.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-12">
              <section className="rounded-[2rem] border border-[#D8CEBE] bg-white p-10 shadow-[0_25px_80px_rgba(26,23,18,0.05)]">
                <h2 className="text-3xl font-semibold mb-6">About me</h2>
                <p className="text-base leading-8 text-[#1D1914]/85">
                  I’m a graphic designer who builds meaningful visual experiences for brands,
                  campaigns and products. My work blends clean typography, expressive color and
                  thoughtful storytelling to make every project feel cohesive and unforgettable.
                </p>
                <p className="text-base leading-8 text-[#1D1914]/85 mt-6">
                  If you’re looking for a creative partner who can elevate your identity,
                  packaging, editorial or digital experience, let’s talk.
                </p>
              </section>

              <section className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-[#D8CEBF] p-8 shadow-inner shadow-[#1D1914]/5">
                  <h3 className="text-xl font-semibold mb-3">Craft</h3>
                  <p className="text-sm leading-7 text-[#1D1914]/80">
                    Brand systems, editorial design, packaging, motion assets and visual concepting.
                  </p>
                </div>
                <div className="rounded-[2rem] bg-[#1D1914] p-8 text-white shadow-inner shadow-[#1D1914]/10">
                  <h3 className="text-xl font-semibold mb-3">Approach</h3>
                  <p className="text-sm leading-7 text-white/85">
                    I build work with nuance, strong visual hierarchy and a refined sense of detail.
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-10">
              <div className="rounded-[2rem] border border-[#D8CEBE] bg-white p-8 shadow-[0_20px_50px_rgba(26,23,18,0.06)]">
                <p className="text-xs uppercase tracking-[0.35em] text-[#8A5A37]/80 mb-4">Selected work</p>
                <div className="space-y-6">
                  {projectHighlights.map((project) => (
                    <div key={project.title} className="rounded-3xl border border-[#E5DED3] bg-[#FBF7F2] p-6">
                      <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm uppercase tracking-[0.25em] text-[#8A5A37]/80 mb-3">{project.role}</p>
                      <p className="text-sm leading-7 text-[#1D1914]/80">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#DAF1DE]/80 p-8">
                <h2 className="text-2xl font-semibold mb-3">Design that moves people</h2>
                <p className="text-base leading-7 text-[#1D1914]/85">
                  I create visuals that feel modern, warm and strategic — from brand launches to
                  immersive marketing systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#D8CEBE] bg-white p-10 shadow-[0_30px_90px_rgba(26,23,18,0.08)]">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8A5A37]/80 mb-4">Let’s work together</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Start a project or just say hello.</h2>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
