import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { useNavigate  } from "react-router-dom";
import { LocalizedLink as Link } from "@/components/LocalizedLink";

/**
 * Staff login + invite-code signup.
 * - Sign in: normal email/password.
 * - Sign up: requires an invite code (validated/consumed by DB function).
 */
export default function AuthStaff() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
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
        toast({ title: t("common.success"), description: t("auth.signIn") });
        navigate("/staff");
        return;
      }

      // Signup with invite
      const { error: signUpErr } = await supabase.auth.signUp({ email, password });
      if (signUpErr) throw signUpErr;

      // After signup, user is authenticated in most cases (or after email confirm). Try consume now.
      const { data, error } = await supabase.rpc("consume_staff_invite", { p_invite_code: inviteCode });
      if (error) throw error;

      toast({ title: "OK", description: `${t("auth.applyInvite")}: ${data?.[0]?.assigned_role ?? ""}`.trim() });
      navigate("/staff");
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
            <CardTitle>{mode === "signin" ? t("auth.staffSigninTitle") : t("auth.staffSignupTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-muted-foreground">{t("auth.staffNote")}</p>

            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {mode === "signup" && (
              <div>
                <Label htmlFor="invite">{t("auth.inviteCode")}</Label>
                <Input id="invite" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} />
              </div>
            )}

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
