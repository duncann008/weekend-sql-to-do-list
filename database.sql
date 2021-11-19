CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(100),
	"complete" varchar(1)
);

INSERT INTO "tasks" ("task", "complete")
VALUES
('Polish my statue of Betty White', 'N'),
('Delete your browser history', 'N'),
('Beg for forgiveness from girlfriend for coding all day and night', 'Y');