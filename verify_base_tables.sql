-- Verify if base tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('sponsors', 'sponsorship_tiers');

-- Show structure of existing tables if they exist
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name IN ('sponsors', 'sponsorship_tiers')
ORDER BY 
    table_name,
    ordinal_position; 