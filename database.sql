CREATE TABLE reg_plates(
	id SERIAL NOT NULL PRIMARY KEY,
	towns VARCHAR(40) NOT NULL,
    code VARCHAR(10) NOT NULL
);

CREATE TABLE reg_numbers (
	id SERIAL NOT NULL PRIMARY KEY,
	regNumber VARCHAR(10) NOT NULL,
	town_id INT,
	FOREIGN KEY (town_id) REFERENCES reg_plates(id)
);

INSERT INTO reg_plates (towns, code) VALUES ('Cape Town', 'CA');
INSERT INTO reg_plates (towns, code) VALUES ('Bellville', 'CY');
INSERT INTO reg_plates (towns, code) VALUES ('Paarl', 'CJ');
INSERT INTO reg_plates (towns, code) VALUES ('Stellenbosch', 'CL');