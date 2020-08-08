CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"when" VARCHAR (100),
	"location" VARCHAR (100),
	"notes" VARCHAR (250)
);

INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('Take out garbage', 'today', 'home', 'reminder to get more garbage bags soon');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('pay utility bill', 'this week', 'computer', 'send roomates total bills');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('grocery shopping', 'tomorrow', 'target', 'garbage bags!');
INSERT INTO "tasks" ("name", "when", "notes") VALUES ('complete weekend assignment', 'tomorrow', 'dont forget the branch commits');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('get oil change', 'this month', 'VW dealership', 'remember to use gift card');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('do laundry', 'this week', 'home', 'remember to hang dry');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('rehearse', 'today', 'home', 'go over new material');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('start august sessions', 'tomorrow', 'home', 'get files to start listening');
INSERT INTO "tasks" ("name", "when", "location", "notes") VALUES ('tear down equipment', 'next week', 'home', 'be sure to take document takes and mic switches');

