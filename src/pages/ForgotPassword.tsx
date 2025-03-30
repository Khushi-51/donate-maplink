
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      setIsSubmitting(true);
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-maplink-lightgray p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-maplink-green">
            Map<span className="text-maplink-orange">Link</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Connecting surplus food to those who need it
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <Button className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Link
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center gap-2 py-4">
                <CheckCircle className="h-12 w-12 text-maplink-green mb-2" />
                <h3 className="text-lg font-semibold">Check your email</h3>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm">
              <Link to="/login" className="text-maplink-blue hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
