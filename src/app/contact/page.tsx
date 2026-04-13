import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import { Mail, MessageCircle, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      description: "Chat with us instantly on WhatsApp for quick support and questions.",
      action: "Start Chat",
      href: "https://wa.me/15551234567?text=Hi%20Signet%20Network%2C%20I%20need%20help%20with...",
      color: "bg-green-500 hover:bg-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message and we'll get back to you within 24 hours.",
      action: "Send Email",
      href: "mailto:hello@signetnetwork.com?subject=Support%20Request&body=Hi%20Signet%20Network%20Team%2C%0A%0A",
      color: "bg-blue-500 hover:bg-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our support team for urgent matters.",
      action: "Call Now",
      href: "tel:+15551234567",
      color: "bg-purple-500 hover:bg-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
  ];

  const supportTopics = [
    {
      title: "Technical Support",
      description: "Issues with assessments, account access, or platform functionality",
      icon: "🔧",
    },
    {
      title: "Assessment Questions",
      description: "Help with IQ/EQ tests, scoring, or interpretation",
      icon: "🧠",
    },
    {
      title: "Community Guidelines",
      description: "Questions about community participation and moderation",
      icon: "👥",
    },
    {
      title: "Billing & Subscriptions",
      description: "Payment issues, refunds, or subscription management",
      icon: "💳",
    },
    {
      title: "Partnership Inquiries",
      description: "Business partnerships, collaborations, or media requests",
      icon: "🤝",
    },
    {
      title: "General Feedback",
      description: "Share your thoughts, suggestions, or feature requests",
      icon: "💬",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#F7F8F5] to-white">
      <Navbar />

      <main className="pt-40 pb-24 px-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-12 mb-32">
          <div className="flex justify-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              We're here to help you on your personal development journey. Choose your preferred way to connect with our support team.
            </p>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent/20 mx-auto rounded-full" />
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {contactMethods.map((method, index) => (
            <Link
              key={index}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block"
            >
              <div className={`rounded-3xl ${method.bgColor} border-2 border-transparent hover:border-current transition-all duration-500 p-8 h-full hover:shadow-xl hover:shadow-black/5`}>
                {/* Icon */}
                <div className={`w-16 h-16 ${method.textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-2xl font-black ${method.textColor} uppercase tracking-tight`}>
                    {method.title}
                  </h3>
                  <p className="text-foreground/70 text-base leading-relaxed">
                    {method.description}
                  </p>

                  {/* Action Button */}
                  <div className={`inline-flex items-center gap-2 px-6 py-3 ${method.color} text-white font-bold rounded-xl transition-all duration-300 group-hover:shadow-lg`}>
                    <span>{method.action}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-32">
          <ContactForm />
        </div>

        {/* Support Topics */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground uppercase tracking-tight mb-6">
              What Can We Help With?
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Common topics our support team handles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTopics.map((topic, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-black/5 hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <div className="space-y-2">
                    <h3 className="font-black text-lg text-foreground uppercase tracking-tight">
                      {topic.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Times */}
        <div className="rounded-3xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-12 text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-foreground">
              Response Times
            </h3>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              We strive to respond to all inquiries as quickly as possible
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-black text-lg text-foreground">WhatsApp</h4>
              <p className="text-foreground/60">Within 1-2 hours during business hours</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-black text-lg text-foreground">Email</h4>
              <p className="text-foreground/60">Within 24 hours</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-black text-lg text-foreground">Phone</h4>
              <p className="text-foreground/60">Mon-Fri 9AM-6PM (GMT)</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-black text-foreground uppercase tracking-tight mb-6">
              Quick Answers
            </h2>
            <p className="text-xl text-foreground/60">
              Frequently asked questions about our support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  How do I reset my password?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Use the "Forgot Password" link on the login page. We'll send reset instructions to your email.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  Can I retake assessments?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Yes, you can retake assessments after 30 days. Premium members get unlimited retakes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  How do I delete my account?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Contact us via email with your account details and we'll assist with account deletion.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  Are my results private?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Yes, all assessment results are private and only visible to you. We never share personal data.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  How do I report a bug?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  Use the contact form above or email us with screenshots and steps to reproduce the issue.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-black/5">
                <h3 className="font-black text-lg text-foreground mb-3">
                  Do you offer refunds?
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  We offer refunds within 30 days of purchase. Contact us to discuss your specific situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}