drop table renewable_history;
create table renewable_history (
	id serial PRIMARY KEY,
	state varchar(30) not null,
	year integer not null,
	data decimal	
);

select * from renewable_history;

