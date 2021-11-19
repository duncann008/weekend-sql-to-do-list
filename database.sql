CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(100),
	"complete" boolean DEFAULT FALSE
);

INSERT INTO "tasks" ("task", "complete")
VALUES
('Polish my statue of Betty White', FALSE),
('Delete your browser history', FALSE),
('Beg for forgiveness from girlfriend for coding all day and night', TRUE);