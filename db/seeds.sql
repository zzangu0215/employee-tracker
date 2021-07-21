INSERT INTO
  department (name)
VALUES
  ("Engineering"),
  ("Finance"),
  ("Legal"),
  ("Marketing"),
  ("Sales");

INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Engineering", 85000, 1),
  ("Finance Staff", 55000, 2),
  ("Lawyer", 75000, 3),
  ("Marketing Clerk", 50000, 4),
  ("Sales Clerk", 52000, 4);

INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jun", "Park", 1, 2),
  ("Israel", "Magallon", 1, 4),
  ("Maxwell", "Dunn", 3, 3),
  ("Vivianna", "Cowan", 2, NULL);
