import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: t("contact.toast.successTitle"),
        description: t("contact.toast.successBody"),
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      toast({
        title: t("contact.toast.errorTitle"),
        description: t("contact.toast.errorBody"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="section-container py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">{t("contact.title")}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">{t("contact.locationLabel")}</div>
                  <div className="text-muted-foreground">{t("contact.locationValue")}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">{t("contact.emailLabel")}</div>
                  <a className="text-muted-foreground hover:text-foreground" href="mailto:contact@07-20.org">
                    contact@07-20.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">{t("contact.responseTime")}</div>
                  <div className="text-muted-foreground">{t("contact.responseTimeValue")}</div>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <div className="font-medium text-foreground">{t("contact.specificInquiries")}</div>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div>{t("contact.safeguardingEmail")}</div>
                  <div>{t("contact.dataProtectionEmail")}</div>
                  <div>{t("contact.sponsorshipEmail")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elevated p-8">
            <h2 className="text-2xl font-semibold text-foreground">{t("contact.sendMessage")}</h2>
            <p className="mt-2 text-muted-foreground">{t("contact.sendMessageDesc")}</p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("contact.firstName")}</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder={t("contact.placeholders.firstName")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("contact.lastName")}</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder={t("contact.placeholders.lastName")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.emailLabel")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.placeholders.email")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("contact.subject")}</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t("contact.placeholders.subject")}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("contact.message")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.placeholders.message")}
                  className="min-h-[140px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90" disabled={isSubmitting}>
                {isSubmitting ? t("contact.sending") : t("contact.sendMessageButton")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
