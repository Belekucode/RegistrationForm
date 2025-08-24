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
    participant_name VARCHAR(255) NOT NULL,
    participant_dob DATE NOT NULL,
    participant_zip VARCHAR(10) NOT NULL,
    
    -- Class Preferences (stored as JSON array)
    class_preferences JSONB DEFAULT '[]'::jsonb,
    
    -- Additional Information
    case_manager_name VARCHAR(255),
    case_manager_phone VARCHAR(20),
    allergies TEXT,
    social_behavior_description TEXT,
    additional_notes TEXT,
    
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
