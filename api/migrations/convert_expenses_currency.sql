DROP function convert_expenses_currency;


CREATE OR REPLACE FUNCTION convert_expenses_currency(user_id integer, conversion_rate numeric)
RETURNS VOID AS $$
BEGIN
    UPDATE expenses e
    SET amount = amount * convert_expenses_currency.conversion_rate
    WHERE e.user_id = convert_expenses_currency.user_id;
    
END;
$$ LANGUAGE plpgsql;

--SELECT convert_expenses_currency(1,2.2)