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
        FOR arow IN SELECT id from cards
            LOOP
                _id := arow.id;
                INSERT INTO card_fields (card_id, field_id) VALUES (_id, new.id);
            END LOOP;
    ELSE
        IF new.type = 'contact' THEN
            FOR arow IN SELECT id from contacts
                LOOP
                    _id := arow.id;
                    INSERT INTO contact_fields (contact_id, field_id) VALUES (_id, new.id);
                END LOOP;
        END IF;
    END IF;
    RETURN NEW;
END
$$;

CREATE TRIGGER insert_custom_fields
    AFTER INSERT
    ON fields
    FOR EACH ROW
EXECUTE PROCEDURE create_custom_fields();


CREATE OR REPLACE FUNCTION create_card_fields()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    arow record;
    _id  uuid;
BEGIN
    FOR arow IN SELECT id from fields where type = 'card'
        LOOP
            _id := arow.id;
            INSERT INTO card_fields (card_id, field_id) VALUES (new.id, _id);
        END LOOP;

    RETURN NEW;
END
$$;

CREATE TRIGGER create_card_fields
    AFTER INSERT
    ON cards
    FOR EACH ROW
EXECUTE PROCEDURE create_card_fields();

CREATE OR REPLACE FUNCTION create_contact_fields()
    RETURNS TRIGGER
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    arow record;
    _id  uuid;
BEGIN
    FOR arow IN SELECT id from fields where type = 'contact'
        LOOP
            _id := arow.id;
            INSERT INTO contact_fields (contact_id, field_id) VALUES (new.id, _id);
        END LOOP;

    RETURN NEW;
END
$$;

CREATE TRIGGER create_contact_fields
    AFTER INSERT
    ON contacts
    FOR EACH ROW
EXECUTE PROCEDURE create_contact_fields();
