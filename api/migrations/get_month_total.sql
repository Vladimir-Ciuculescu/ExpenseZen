DROP function get_month_total

CREATE OR REPLACE FUNCTION get_month_total(start_month date, end_month date,user_id integer)
RETURNS float AS $$
DECLARE
    total float;
BEGIN
    SELECT SUM(amount) INTO total FROM expenses WHERE date >= get_month_total.start_month AND date <= get_month_total.end_month AND expenses.user_id = get_month_total.user_id;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;

--SELECT get_month_total('2023-07-01','2023-07-31',1);