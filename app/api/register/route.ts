import { type NextRequest, NextResponse } from "next/server"

// TODO: Uncomment and configure when Supabase is connected
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// )

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate required fields
    const requiredFields = [
      "parentName",
      "parentPhone",
      "parentEmail",
      "participantName",
      "participantDOB",
      "participantZip",
    ]

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // TODO: Uncomment when Supabase is connected
    // const { data, error } = await supabase
    //   .from('itw_registrations')
    //   .insert({
    //     parent_name: formData.parentName,
    //     parent_phone: formData.parentPhone,
    //     parent_second_phone: formData.parentSecondPhone || null,
    //     parent_email: formData.parentEmail,
    //     participant_name: formData.participantName,
    //     participant_dob: formData.participantDOB,
    //     participant_zip: formData.participantZip,
    //     class_preferences: formData.classPreferences.filter(Boolean),
    //     case_manager_name: formData.caseManagerName || null,
    //     case_manager_phone: formData.caseManagerPhone || null,
    //     allergies: formData.allergies || null,
    //     social_behavior_description: formData.socialBehaviorDescription || null,
    //     additional_notes: formData.additionalNotes || null
    //   })
    //   .select()

    // if (error) {
    //   console.error('Supabase error:', error)
    //   return NextResponse.json(
    //     { error: 'Failed to save registration' },
    //     { status: 500 }
    //   )
    // }

    // For now, just log the data (remove when Supabase is connected)
    console.log("Registration data received:", formData)

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
