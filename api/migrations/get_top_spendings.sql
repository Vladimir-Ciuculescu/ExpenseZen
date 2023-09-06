DROP function get_top_spendings

create or replace function get_top_spendings(user_id integer, start_month date, end_month date)
returns table (id integer,name text, total float, color text) AS $$

  BEGIN 
  return query
    SELECT c.id, c.name, SUM(e.amount) as total_spending, c.color from expenses e 
      inner join users  AS u on e.user_id = u.id
      inner join categories as c on c.id = e.category_id
    WHERE 
      u.id = get_top_spendings.user_id and e.date >= get_top_spendings.start_month and e.date <= get_top_spendings.end_month
    GROUP BY 
      c.name, c.id
    ORDER BY 
      total_spending desc;
    END;

$$ language plpgsql;

--SELECT get_top_spendings(1, '2023-07-01', '2023-07-31')

