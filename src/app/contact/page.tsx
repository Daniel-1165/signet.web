import ContactForm from "@/components/sections/ContactForm";
import { Mail, MessageCircle, Phone, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      description: "Chat with us instantly on WhatsApp for quick support and questions.",
      action: "Start Chat",
      href: "https://wa.me/2349032387758?text=Hi%20Signet%20Network%2C%20I%20need%20help%20with...",
      color: "bg-seal hover:bg-seal",
      bgColor: "bg-mist/40",
      textColor: "text-seal",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message and we'll get back to you within 24 hours.",
      action: "Send Email",
      href: "mailto:info@signet.org?subject=Support%20Request&body=Hi%20Signet%20Network%20Team%2C%0A%0A",
      color: "bg-seal hover:bg-seal",
      bgColor: "bg-mist/40",
      textColor: "text-seal",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our support team for urgent matters.",
      action: "Call Now",
      href: "tel:+2349032387758",
      color: "bg-seal hover:bg-seal",
      bgColor: "bg-mist/40",
      textColor: "text-seal",
    },
  ];

  return (
    <div className="relative min-h-screen bg-canvas text-ink font-sans selection:bg-mist selection:text-seal">
      <main className="pt-16 pb-24 px-6 md:px-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20 md:mb-24">
          <div className="flex justify-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-seal" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink opacity-25" />
            <span className="w-2.5 h-2.5 rounded-full bg-ink opacity-15" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-ink font-sans">
              Get in <span className="italic font-light text-seal">Touch</span>
            </h1>
            <p className="text-base md:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              We're here to help you on your personal development journey. Choose your preferred way to connect with our support team.
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-24">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block"
            >
              <div className={`rounded-[2.5rem] bg-white border border-rule hover:border-seal/30 transition-all duration-500 p-8 h-full shadow-sm hover:shadow-xl flex flex-col justify-between`}>
                <div className="space-y-6">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 ${method.bgColor} ${method.textColor} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    {method.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-ink tracking-tight font-sans uppercase">
                      {method.title}
                    </h3>
                    <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                      {method.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <div className={`inline-flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto ${method.color} text-white font-bold rounded-full transition-all duration-300 shadow-md shadow-seal/10 font-sans text-xs uppercase tracking-wider`}>
                    <span>{method.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-20 md:mb-24">
          <ContactForm />
        </div>

        {/* Response Times */}
        <div className="rounded-[2.5rem] bg-canvas border border-rule p-10 md:p-12 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-ink font-sans">
              Response Times
            </h3>
            <p className="text-sm md:text-base text-ink/60 max-w-2xl mx-auto font-sans font-semibold">
              We strive to respond to all inquiries as quickly as possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-mist rounded-full flex items-center justify-center mx-auto text-seal">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-ink font-sans">WhatsApp</h4>
              <p className="text-sm text-ink/60 font-medium">Within 1-2 hours during business hours</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-mist rounded-full flex items-center justify-center mx-auto text-seal">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-ink font-sans">Email</h4>
              <p className="text-sm text-ink/60 font-medium">Within 24 hours</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-mist rounded-full flex items-center justify-center mx-auto text-seal">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-ink font-sans">Phone Support</h4>
              <p className="text-sm text-ink/60 font-medium">Mon-Fri 9AM-6PM (GMT)</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 md:mt-24 space-y-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-ink uppercase tracking-tight mb-4 font-sans">
              Quick Answers
            </h2>
            <p className="text-base text-ink/60 font-sans font-semibold">
              Frequently asked questions about the Signet Mentorship Program
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  How long is the mentorship program?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  The core program spans 12 weeks of intense personal development. However, members retain lifetime access to the network to ensure continuous, compounded growth.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  Is this program a good fit for me?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  If you are hungry to optimize your habits, cultivate unwavering discipline, and become the best version of yourself, then Signet is built entirely for you.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  How much time do I need to commit?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  We recommend dedicating at least 3-5 hours a week. This allows you enough time to consume our briefs, engage with your cohort, and actively apply the frameworks.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  Is the format group or 1-on-1 driven?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  Signet leverages a powerful hybrid framework. You'll receive deep 1-on-1 strategy sessions alongside group sprints to maximize accountability and collective insights.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  What happens when the 12 weeks ends?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  Your journey never truly ends. You transition into an alumni state where you stay plugged into the global activity feed, unlocking ongoing network opportunities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-rule">
                <h3 className="font-bold text-lg text-ink mb-3 font-sans">
                  Do I need any prior experience?
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed font-sans font-medium">
                  None. We provide everything from foundational mindsets to advanced daily operating protocols. Bring only commitment, and we'll provide the blueprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}