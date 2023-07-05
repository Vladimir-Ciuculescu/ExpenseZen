
DROP function get_today_total

CREATE OR REPLACE FUNCTION get_today_total(user_id integer)
RETURNS float AS $$
DECLARE
    total float;
BEGIN
    SELECT SUM(amount) INTO total FROM expenses WHERE date = CURRENT_DATE AND expenses.user_id = get_today_total.user_id;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

--SELECT get_today_total(1);