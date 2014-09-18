CREATE TABLE reference_data (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  values json NOT NULL
)

SELECT * FROM record_data

update entity_field set ref_data_id = 2 where id = 5

select * from reference_data

INSERT INTO reference_data (name, values)
VALUES
('Nationality', '{"values":[{"id":1,"label":"UK"},{"id":2,"label":"French"}]}'),
('Marital Status', '{"values":[{"id":1,"label":"Single"},{"id":2,"label":"Married"}]}')


