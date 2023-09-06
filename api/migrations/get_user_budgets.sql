DROP function get_user_budgets;

CREATE OR REPLACE FUNCTION get_user_budgets(user_id integer)
RETURNS TABLE (budget float, category text,id integer, color text) as $$

  BEGIN
  return query
  select mb.budget, c.name,c.id,c.color  from monthly_budgets mb
    inner join users u on u.id = mb.user_id
    inner join categories c on c.id = mb.category_id
    where u.id = get_user_budgets.user_id;
  END;

$$ language plpgsql;


--select get_user_budgets(3)
