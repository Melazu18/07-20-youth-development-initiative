import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Whether you're a parent, potential volunteer, partner organization, or sponsor, 
              we'd love to hear from you. Reach out and let's discuss how we can work together.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="mt-1 text-muted-foreground">
                    Trollhättan, Sweden
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a 
                    href="mailto:contact@07-20.org" 
                    className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contact@07-20.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                  <p className="mt-1 text-muted-foreground">
                    We aim to respond within 48 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-10 rounded-lg border border-border bg-secondary/30 p-6">
              <h3 className="font-semibold text-foreground">Specific Inquiries</h3>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <strong>Safeguarding:</strong> safeguarding@07-20.org
                </p>
                <p className="text-muted-foreground">
                  <strong>Data Protection:</strong> dpo@07-20.org
                </p>
                <p className="text-muted-foreground">
                  <strong>Sponsorship:</strong> partners@07-20.org
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card p-8 shadow-card">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Send us a message
            </h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    placeholder="Anna" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    placeholder="Svensson" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="anna@example.com" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  placeholder="How can we help?" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Tell us more about your inquiry..." 
                  rows={5}
                  required 
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-hero hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
