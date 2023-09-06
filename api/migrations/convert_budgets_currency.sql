DROP function convert_budgets_currency;


CREATE OR REPLACE FUNCTION convert_budgets_currency(user_id integer, conversion_rate numeric)
RETURNS VOID AS $$
BEGIN
    UPDATE monthly_budgets mb
    SET budget = budget * convert_budgets_currency.conversion_rate
    WHERE mb.user_id = convert_budgets_currency.user_id;
    
END;
$$ LANGUAGE plpgsql;

--SELECT convert_budgets_currency(14,2.2)