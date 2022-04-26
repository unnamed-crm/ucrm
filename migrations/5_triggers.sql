CREATE OR REPLACE FUNCTION create_custom_fields()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    arow record;
    _id  uuid;
BEGIN
    IF new.type = 'card' THEN
        FOR arow IN (SELECT c.id as id
                     from cards c
                              left join pipelines p on c.pipeline_id = p.id
                     where p.dashboard_id = new.dashboard_id)
            LOOP
                _id := arow.id;
                INSERT INTO card_fields (card_id, field_id) VALUES (_id, new.id);
            END LOOP;
    ELSE
        IF new.type = 'contact' THEN
            FOR arow IN (SELECT id from contacts where contacts.dashboard_id = new.dashboard_id)
                LOOP
                    _id := arow.id;
                    INSERT INTO contact_fields (contact_id, field_id) VALUES (_id, new.id);
                END LOOP;
        END IF;
    END IF;
    RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION create_dashboard_access()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
BEGIN
    INSERT INTO dashboards_user(user_id, dashboard_id, access) VALUES (new.author_id, new.id, 'admin');
    RETURN NEW;
END
$$;

CREATE TRIGGER insert_dashboard
    AFTER INSERT
    ON dashboards
    FOR EACH ROW
EXECUTE PROCEDURE create_dashboard_access();
