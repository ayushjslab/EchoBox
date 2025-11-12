"use client"
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Home() {


const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      console.log("Google Token Response:", tokenResponse);

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      if(userInfo.data){
        const { data } = await axios.post(`http://localhost:3001/api/user`,{
          name: userInfo.data.name,
          email: userInfo.data.email,
          picture: userInfo.data.picture
        });
        console.log(data)
      }

      console.log("Google User Info:", userInfo.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },
  onError: (errorResponse) => {
    console.error("Login Failed:", errorResponse);
  },
});

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">SenitWave</div>
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
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => googleLogin()}>
              Log in
            </Button>
            <Button>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
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
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 min-h-96 flex items-center justify-center border border-border">
            <div className="text-center space-y-4">
              <MessageCircle className="w-16 h-16 mx-auto text-primary" />
              <p className="text-muted-foreground">Feedback Widget Preview</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 pt-12 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              "TechCorp",
              "StartupHub",
              "DataFlow",
              "CloudSync",
              "VisionAI",
            ].map((company) => (
              <div
                key={company}
                className="text-sm font-semibold text-muted-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-20 md:py-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How SenitWave Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in three simple steps
          </p>
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
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-border rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Listen to Your Customers?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of companies using SenitWave to transform customer
            feedback into growth
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">SenitWave</h4>
              <p className="text-sm text-muted-foreground">
                Customer feedback made simple and powerful.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2025 SenitWave. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">
                Twitter
              </a>
              <a href="#" className="hover:text-primary transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-primary transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
