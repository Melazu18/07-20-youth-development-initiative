import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";

/**
 * Youth/participant sign-in and sign-up.
 * Staff/board/volunteer accounts are created via invite codes on /auth/staff.
 */
export default function AuthYouth() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!isSupabaseConfigured) {
      toast({ title: t("activities.missingEnvTitle"), description: t("activities.missingEnvBody"), variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "OK", description: t("auth.signIn") });
        navigate("/activities");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        toast({ title: "OK", description: t("auth.signUp") });
        navigate("/activities");
      }
    } catch (e: any) {
      toast({ title: t("common.error"), description: e?.message ?? t("common.error"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>{mode === "signin" ? t("auth.youthSigninTitle") : t("auth.youthSignupTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
            )}

            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button onClick={submit} disabled={loading}>
              {mode === "signin" ? t("auth.signIn") : t("auth.signUp")}
            </Button>

            <div className="text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>
                  {t("auth.noAccount")}{" "}
                  <button className="underline" onClick={() => setMode("signup")}>
                    {t("auth.signUp")}
                  </button>
                </>
              ) : (
                <>
                  {t("auth.haveAccount")}{" "}
                  <button className="underline" onClick={() => setMode("signin")}>
                    {t("auth.signIn")}
                  </button>
                </>
              )}
            </div>

            <div className="text-sm">
              <Link to="/auth" className="underline">
                {t("auth.back")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
