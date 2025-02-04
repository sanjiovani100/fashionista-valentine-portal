-- Verify all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'sponsors',
    'sponsorship_tiers',
    'sponsor_payments',
    'sponsor_documents',
    'sponsor_contacts'
);

-- Show structure of all tables
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
    AND table_name IN (
        'sponsors',
        'sponsorship_tiers',
        'sponsor_payments',
        'sponsor_documents',
        'sponsor_contacts'
    )
ORDER BY 
    table_name,
    ordinal_position;

-- Verify indexes
SELECT
    tablename,
    indexname,
    indexdef
FROM
    pg_indexes
WHERE
    schemaname = 'public'
    AND tablename IN (
        'sponsors',
        'sponsorship_tiers',
        'sponsor_payments',
        'sponsor_documents',
        'sponsor_contacts'
    )
ORDER BY
    tablename,
    indexname;

-- Verify RLS policies
SELECT
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM
    pg_policies
WHERE
    schemaname = 'public'
    AND tablename IN (
        'sponsors',
        'sponsorship_tiers',
        'sponsor_payments',
        'sponsor_documents',
        'sponsor_contacts'
    )
ORDER BY
    tablename,
    policyname;

-- Check sponsorship tiers data
SELECT * FROM sponsorship_tiers ORDER BY price; 