"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarDays, Phone, User, Heart } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  // Parent/Guardian Information
  parentName: string
  parentPhone: string
  parentSecondPhone: string
  parentEmail: string

  // Participant Information
  participantLegalName: string
  participantPreferredName: string
  participantDOB: string
  participantZip: string

  // Additional Information
  caseManagerName: string
  caseManagerPhone: string
  caseManagerEmail: string
  allergies: string
  socialBehaviorDescription: string
  additionalNotes: string
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    parentPhone: "",
    parentSecondPhone: "",
    parentEmail: "",
    participantLegalName: "",
    participantPreferredName: "",
    participantDOB: "",
    participantZip: "",
    caseManagerName: "",
    caseManagerPhone: "",
    caseManagerEmail: "",
    allergies: "",
    socialBehaviorDescription: "",
    additionalNotes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration")
      }

      // Show success toast
      toast.success("Registration Submitted Successfully!", {
        description: "We will contact you soon with more details about your classes.",
        duration: 5000,
        className: "bg-green-50 border-green-200 text-green-800",
        style: {
          background: "var(--background)",
          border: "2px solid var(--primary)",
          color: "var(--foreground)",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        },
      })

      // Reset form
      setFormData({
        parentName: "",
        parentPhone: "",
        parentSecondPhone: "",
        parentEmail: "",
        participantLegalName: "",
        participantPreferredName: "",
        participantDOB: "",
        participantZip: "",
        caseManagerName: "",
        caseManagerPhone: "",
        caseManagerEmail: "",
        allergies: "",
        socialBehaviorDescription: "",
        additionalNotes: "",
      })
      setTermsAgreed(false)
    } catch (error) {
      console.error("Submission error:", error)
      
      // Show error toast
      toast.error("Registration Failed", {
        description: error instanceof Error ? error.message : "Please try again or contact support.",
        duration: 5000,
        className: "bg-red-50 border-red-200 text-red-800",
        style: {
          background: "var(--background)",
          border: "2px solid #ef4444",
          color: "var(--foreground)",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-foreground">ITW Registration</h1>
          </div>
          <p className="text-lg text-muted-foreground">Inclusive Technology of Washington</p>
          <p className="text-lg font-semibold text-primary mt-3">Explore, Collaborate, Lead!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Parent Registration for Participant Classes at Inclusive Technology of Washington (ITW)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Parent/Guardian Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Parent/Guardian Information
              </CardTitle>
              <CardDescription>Please provide your contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="parentName">Full Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange("parentName", e.target.value)}
                  required
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentPhone">Phone Number *</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                    required
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="parentSecondPhone">Second Phone (Optional)</Label>
                  <Input
                    id="parentSecondPhone"
                    type="tel"
                    value={formData.parentSecondPhone}
                    onChange={(e) => handleInputChange("parentSecondPhone", e.target.value)}
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="parentEmail">Email Address *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                  required
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Participant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Participant Information
              </CardTitle>
              <CardDescription>Information about the person who will be participating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="participantLegalName">Legal Name *</Label>
                <Input
                  id="participantLegalName"
                  value={formData.participantLegalName}
                  onChange={(e) => handleInputChange("participantLegalName", e.target.value)}
                  required
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                />
              </div>
              <div>
                <Label htmlFor="participantPreferredName">Preferred Name (Optional)</Label>
                <Input
                  id="participantPreferredName"
                  value={formData.participantPreferredName}
                  onChange={(e) => handleInputChange("participantPreferredName", e.target.value)}
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="participantDOB">Date of Birth *</Label>
                  <Input
                    id="participantDOB"
                    type="date"
                    value={formData.participantDOB}
                    onChange={(e) => handleInputChange("participantDOB", e.target.value)}
                    required
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="participantZip">ZIP Code *</Label>
                  <Input
                    id="participantZip"
                    value={formData.participantZip}
                    onChange={(e) => handleInputChange("participantZip", e.target.value)}
                    required
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                    maxLength={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Additional Information
              </CardTitle>
              <CardDescription>If you have a case manager, please provide their information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caseManagerName">Case Manager Name</Label>
                  <Input
                    id="caseManagerName"
                    value={formData.caseManagerName}
                    onChange={(e) => handleInputChange("caseManagerName", e.target.value)}
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="caseManagerPhone">Case Manager Phone</Label>
                  <Input
                    id="caseManagerPhone"
                    type="tel"
                    value={formData.caseManagerPhone}
                    onChange={(e) => handleInputChange("caseManagerPhone", e.target.value)}
                    className="mt-1 border-2 border-gray-300 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                                 <Label htmlFor="caseManagerEmail">Case Manager Email</Label>
                <Input
                  id="caseManagerEmail"
                  type="email"
                  value={formData.caseManagerEmail}
                  onChange={(e) => handleInputChange("caseManagerEmail", e.target.value)}
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="allergies">Allergies or Medical Considerations</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="socialBehaviorDescription">Social Communication and Behavior Description</Label>
                <Textarea
                  id="socialBehaviorDescription"
                  value={formData.socialBehaviorDescription}
                  onChange={(e) => handleInputChange("socialBehaviorDescription", e.target.value)}
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                  rows={4}
                  placeholder="Please describe any social communication needs, behavioral considerations, or support strategies that would be helpful for us to know..."
                />
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  className="mt-1 border-2 border-gray-300 focus:border-primary"
                  rows={3}
                  placeholder="Any other information you'd like us to know..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAgreed}
                  onCheckedChange={(checked) => setTermsAgreed(checked as boolean)}
                  className="border-2 border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By clicking Submit, you agree to our{" "}
                    <Dialog>
                      <DialogTrigger asChild>
                        <button type="button" className="text-blue-600 hover:text-blue-800 underline">
                          Terms & Conditions
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>ITW Terms & Conditions & Privacy Notice</DialogTitle>
                          <DialogDescription>
                            Please read these terms and conditions carefully before registering.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-sm">
                          <div>
                            <h4 className="font-semibold">COPPA:</h4>
                            <p>
                              In compliance with the Children's Online Privacy Protection Act, only parents/guardians
                              may provide information. ITW does not knowingly collect data directly from children under
                              13 without parental consent.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">HIPAA:</h4>
                            <p>
                              ITW treats health-related information with heightened safeguards consistent with HIPAA
                              standards when applicable. Such information is only shared as necessary to ensure a
                              participant's safety in programs covered by HIPAA agreements.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">Voluntary Participation & Assumption of Risk</h4>
                            <p>
                              By registering, you acknowledge that participation in ITW programs is voluntary. You
                              understand that, as with any educational or recreational activity, there may be risks
                              involved. You accept full responsibility for your participant's safety and well-being
                              while attending ITW programs.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">Release of Liability</h4>
                            <p>
                              To the maximum extent permitted by law, you release and discharge Inclusive Technology of
                              Washington (ITW), its staff, volunteers, and partners from any liability, claims, or
                              damages arising from participation in ITW programs, including but not limited to injury,
                              illness, property loss, or other incidents.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">No Guarantee of Outcomes</h4>
                            <p>
                              ITW does not guarantee specific educational, developmental, or behavioral outcomes from
                              participation in its programs. Services are offered as-is, and you agree not to hold ITW
                              accountable for results beyond its reasonable control.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">Medical Care Disclaimer</h4>
                            <p>
                              ITW may record health-related information (e.g., allergies); it is the responsibility of
                              parents/guardians to provide necessary medications, instructions, or medical care. You
                              agree that ITW is not responsible for medical treatment, and emergency services will be
                              called if required.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">Indemnification</h4>
                            <p>
                              You agree to indemnify and hold harmless ITW and its representatives from any claims,
                              actions, or expenses (including attorney fees) that arise due to your participant's
                              involvement in ITW programs, except in cases of ITW's proven gross negligence or
                              intentional misconduct.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold">Updates & Binding Effect</h4>
                            <p>
                              These Terms may be updated by ITW at any time. By registering, you consent to future
                              updates and agree that continued participation is subject to the latest version. Your
                              agreement is binding on you and your participant.
                            </p>
                          </div>

                          <p className="text-xs text-muted-foreground mt-4">
                            This text is informational and not legal advice.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting || !termsAgreed} className="w-full max-w-md">
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Questions? Contact us at info@InclusiveTechWa.org</p>
        </div>
      </div>
    </main>
  )
}
