DROP function get_month_expenses


CREATE OR REPLACE FUNCTION get_month_expenses(start_month date, end_month date, user_id integer)
RETURNS table ("categoryId" integer, name text, description text, amount float, color text, "payDate" date) AS $$

BEGIN
    return query
    SELECT es.category_id AS "categoryId", c.name, es.description, es.amount, c.color, es.date as "payDate" FROM expenses es
    INNER join categories c ON c.id = es.category_id
    WHERE date >= get_month_expenses.start_month AND date <= get_month_expenses.end_month AND es.user_id = get_month_expenses.user_id;
END;

$$ LANGUAGE plpgsql;


--SELECT get_month_expenses('2023-07-01','2023-07-31',3);