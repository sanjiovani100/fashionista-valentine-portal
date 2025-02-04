-- Create the SQL execution function
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    EXECUTE query;
    result := json_build_object('success', true);
    RETURN result;
EXCEPTION WHEN OTHERS THEN
    result := json_build_object(
        'success', false,
        'error', SQLERRM,
        'detail', SQLSTATE
    );
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 