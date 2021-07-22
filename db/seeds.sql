INSERT INTO
  department (name)
VALUES
  ("Engineering"),
  ("Finance"),
  ("Legal"),
  ("Marketing"),
  ("Sales"),
  ("Management");

INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Engineering", 85000, 1),
  ("Finance Staff", 55000, 2),
  ("Lawyer", 75000, 3),
  ("Marketing Clerk", 50000, 4),
  ("Sales Clerk", 52000, 4),
  ("Boss", 400000, 6);

INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jun", "Park", 1, 5),
  ("Israel", "Magallon", 1, 1),
  ("Maxwell", "Dunn", 3, 5),
  ("Vivianna", "Cowan", 2, 2),
  ("John", "Desroiers", 6, NULL);