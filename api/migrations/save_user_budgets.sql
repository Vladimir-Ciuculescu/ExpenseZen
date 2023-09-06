DROP function save_user_budget;

CREATE OR REPLACE FUNCTION save_user_budget(user_id integer, category_id integer, budget numeric)
RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM monthly_budgets mb WHERE mb.category_id = save_user_budget.category_id AND mb.user_id = save_user_budget.user_id) THEN
    UPDATE monthly_budgets mb
    SET budget = save_user_budget.budget
    WHERE  mb.user_id = save_user_budget.user_id AND mb.category_id = save_user_budget.category_id;
  ELSE
    INSERT INTO monthly_budgets (budget, user_id, category_id)
    VALUES (save_user_budget.budget, save_user_budget.user_id, save_user_budget.category_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

--select save_user_budget(3,2,700)


