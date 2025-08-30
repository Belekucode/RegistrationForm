-- ITW Registration Table Schema

CREATE TABLE IF NOT EXISTS itw_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Parent/Guardian Information
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(20) NOT NULL,
    parent_second_phone VARCHAR(20),
    parent_email VARCHAR(255) NOT NULL,
    
    -- Participant Information
    participant_legal_name VARCHAR(255) NOT NULL,
    participant_preferred_name VARCHAR(255),
    participant_dob DATE NOT NULL,
    participant_zip VARCHAR(10) NOT NULL,
    
    -- Additional Information
    case_manager_name VARCHAR(255),
    case_manager_phone VARCHAR(20),
    case_manager_email VARCHAR(255),
    safety_concerns TEXT,
    participant_strengths TEXT,
    social_behavior_description TEXT,
    additional_notes TEXT,
    
    -- Vocational Rehabilitation Counselor
    counselor_name VARCHAR(255),
    counselor_phone VARCHAR(20),
    counselor_email VARCHAR(255),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending',
    processed_at TIMESTAMP WITH TIME ZONE,
    processed_by VARCHAR(255)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_itw_registrations_created_at ON itw_registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_itw_registrations_status ON itw_registrations(status);
CREATE INDEX IF NOT EXISTS idx_itw_registrations_parent_email ON itw_registrations(parent_email);
CREATE INDEX IF NOT EXISTS idx_itw_registrations_participant_name ON itw_registrations(participant_name);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_itw_registrations_updated_at 
    BEFORE UPDATE ON itw_registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
