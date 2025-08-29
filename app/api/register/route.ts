import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = [
      "parentName",
      "parentPhone", 
      "parentEmail",
      "participantLegalName",
      "participantDOB",
      "participantZip",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('itw_registrations')
      .insert({
        parent_name: formData.parentName,
        parent_phone: formData.parentPhone,
        parent_second_phone: formData.parentSecondPhone || null,
        parent_email: formData.parentEmail,
        participant_legal_name: formData.participantLegalName,
        participant_preferred_name: formData.participantPreferredName || null,
        participant_dob: formData.participantDOB,
        participant_zip: formData.participantZip,
        class_preferences: formData.classPreferences.filter((pref: { date: string; time: string }) => pref.date && pref.time),
        case_manager_name: formData.caseManagerName || null,
        case_manager_phone: formData.caseManagerPhone || null,
        allergies: formData.allergies || null,
        social_behavior_description: formData.socialBehaviorDescription || null,
        additional_notes: formData.additionalNotes || null
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save registration' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
      data: data[0]
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
