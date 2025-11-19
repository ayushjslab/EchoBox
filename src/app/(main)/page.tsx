/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import ProfileMenu from "@/components/custom/profile-menu";
import { HowItWorks } from "@/components/custom/how-it-works";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import InstallTabs from "@/components/custom/install-command";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="echomark-logo"
              className="h-12 hidden sm:block"
            />
            EchoMark
          </div>
          <div className="hidden md:flex gap-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center justify-center gap-3">
            {user ? (
              <ProfileMenu />
            ) : (
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Log in
              </Button>
            )}
            <Button onClick={() => router.push("/dashboard")}>
              {user ? "Dasboard" : "Get Started"}
            </Button>
          </div>
        </div>
      </nav>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
                Understand Your Customers Better
              </h1>
              <p className="text-xl text-muted-foreground text-balance">
                Add a feedback widget to your website in seconds. Collect
                real-time insights and make data-driven decisions with our
                powerful analytics dashboard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                {user ? (
                  <Link href="/dashboard">Get Started</Link>
                ) : (
                  <Link href="/login">Start Free Trial</Link>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Link
                  href="#watch-demo"
                  className="flex items-center justify-center"
                >
                  {" "}
                  Watch Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>

          <div className="min-h- flex items-center justify-center">
            <img
              src="/images/feedback-preview.png"
              alt="Feedback Widget Preview"
              className="w-full max-w-md rounded-xl"
            />
          </div>
        </div>
      </section>
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features Built for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to collect, analyze, and act on customer
            feedback
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "One-Click Installation",
              description:
                "Just paste a single script on your website. No complex setup needed.",
            },
            {
              icon: MessageCircle,
              title: "Beautiful Feedback Widget",
              description:
                "Customizable feedback widget that matches your brand perfectly.",
            },
            {
              icon: BarChart3,
              title: "Advanced Analytics",
              description:
                "Real-time insights, sentiment analysis, and comprehensive dashboards.",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description:
                "Enterprise-grade security with GDPR and data privacy compliance.",
            },
            {
              icon: MessageCircle,
              title: "Smart Notifications",
              description:
                "Get instant alerts for critical feedback from your customers.",
            },
            {
              icon: BarChart3,
              title: "Integration Ready",
              description:
                "Connect with your favorite tools and platforms seamlessly.",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="flex flex-col md:flex-row items-start md:items-center justify-around p-6 mt-10 bg-emerald-50/60 rounded-3xl border border-emerald-200 shadow-md lg:mx-20 md:mx-15 mx-10">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-emerald-800 mb-3">
            Install the Package
          </h1>
          <p className="text-emerald-700 leading-relaxed">
            Customize everything according to your needs and take full control
            in your hands. EchoMark makes integration smooth, flexible, and
            developer-friendly.
          </p>
        </div>

        <InstallTabs />
      </section>
      <section id="watch-demo">
        <HowItWorks />
      </section>
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-20 md:py-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get started in three simple steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Sign Up",
              description:
                "Create your free account and add your website URL. Takes less than 2 minutes.",
            },
            {
              step: "02",
              title: "Install Widget",
              description:
                "Copy the provided script and paste it on your website. No coding skills needed.",
            },
            {
              step: "03",
              title: "Analyze Feedback",
              description:
                "View real-time feedback, analytics, and actionable insights on your dashboard.",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-primary/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
              {index < 2 && (
                <ArrowRight className="hidden lg:block absolute -right-12 top-8 w-6 h-6 text-border" />
              )}
            </div>
          ))}
        </div>
      </section>{" "}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Start free, scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter",
              price: "$0",
              description: "Perfect for getting started",
              features: [
                "Up to 100 feedbacks/month",
                "Basic analytics",
                "Email support",
                "1 website",
              ],
            },
            {
              name: "Professional",
              price: "$49",
              description: "For growing businesses",
              features: [
                "Up to 5,000 feedbacks/month",
                "Advanced analytics",
                "Priority support",
                "5 websites",
                "Custom branding",
              ],
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations",
              features: [
                "Unlimited feedbacks",
                "Custom integrations",
                "Dedicated support",
                "Unlimited websites",
                "API access",
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border transition p-8 ${
                plan.highlighted
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
              <Button
                className="w-full mb-6"
                variant={plan.highlighted ? "default" : "outline"}
              >
                Choose Plan
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="bg-linear-to-r from-primary/10 to-accent/10 border border-border rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Listen to Your Customers?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies using SenitWave to transform customer
            feedback into growth
          </p>
          <Button size="lg" asChild>
            {user ? (
              <Link href="/dashboard">Get Started</Link>
            ) : (
              <Link href="/login">Start Your Free Trial</Link>
            )}
          </Button>
        </div>
      </section>
      <footer className="border-t border-border/60 py-20 mt-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            {/* Brand */}
            <div>
              <h4 className="text-3xl font-extrabold text-foreground tracking-tight">
                EchoMark
              </h4>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-sm">
                Transform customer voices into powerful insights with real-time
                feedback, analytics, and automation.
              </p>
            </div>

            {/* Product */}
            <div>
              <h5 className="font-semibold text-foreground mb-5 text-lg">
                Explore
              </h5>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-primary transition"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#watch-demo"
                    className="hover:text-primary transition"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-semibold text-foreground mb-5 text-lg">
                Legal
              </h5>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li>
                  <a href="/privacy" className="hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-primary transition">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-border/40 pt-8"></div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              © 2025 EchoMark — Built with precision for modern creators.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6 mt-6 md:mt-0 text-2xl text-foreground/80">
              <a
                href="https://www.linkedin.com/in/ayushjslab/"
                target="_blank"
                aria-label="LinkedIn"
                className="hover:text-primary transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/ayushjslab"
                target="_blank"
                aria-label="GitHub"
                className="hover:text-primary transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://x.com/ayushjslab"
                target="_blank"
                aria-label="X Twitter"
                className="hover:text-primary transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.instagram.com/ayushjslab"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-primary transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.thread.com/ayushjslab"
                target="_blank"
                aria-label="Threads"
                className="hover:text-primary transition"
              >
                <SiThreads />
              </a>
              <a
                href="https://ayushjslab.vercel.app"
                target="_blank"
                aria-label="Portfolio"
                className="hover:text-primary transition"
              >
                <HiOutlineGlobeAlt />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
