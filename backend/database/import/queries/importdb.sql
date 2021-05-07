--
-- SEED THE DATABASE
--

-- -- EXTENSION: CRYPTO
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- TABLE: COMPANY
CREATE TABLE company (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    tier int NOT NULL
);

-- TABLE: analytic
CREATE TABLE analytic (
    id INT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
    FOREIGN KEY (company_id) REFERENCES company(id)
);

-- TABLE: samplecompany LOG
CREATE TABLE log_samplecompany (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,

    -- LICENSES
    license INT NOT NULL DEFAULT 0,

    -- USERS
    users INT NOT NULL DEFAULT 0,
    users_login INT NOT NULL DEFAULT 0,
    users_active INT NOT NULL DEFAULT 0,

    FOREIGN KEY (analytic_id) REFERENCES analytic(id)
);

-- TABLE: analytics LOG
CREATE TABLE log_analytics (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL DEFAULT now(),
    analytic_id int DEFAULT NULL,

    -- TICKET
    ticket INT NOT NULL DEFAULT 0,
    ticket_total INT NOT NULL DEFAULT 0,
    ticket_open INT NOT NULL DEFAULT 0,
    ticket_closed INT NOT NULL DEFAULT 0,

    -- STATUS
    status_open INT NOT NULL DEFAULT 0,
    status_pending INT NOT NULL DEFAULT 0,
    status_investigating INT NOT NULL DEFAULT 0,
    status_escalated INT NOT NULL DEFAULT 0,
    status_onhold INT NOT NULL DEFAULT 0,
    status_considering INT NOT NULL DEFAULT 0,
    status_resolved INT NOT NULL DEFAULT 0,
    status_closed INT NOT NULL DEFAULT 0,
    status_unknown INT NOT NULL DEFAULT 0,

    -- TYPES
    type_closed INT NOT NULL DEFAULT 0,
    type_question INT NOT NULL DEFAULT 0,
    type_data_request INT NOT NULL DEFAULT 0,
    type_program_error INT NOT NULL DEFAULT 0,
    type_onboarding_issue INT NOT NULL DEFAULT 0,
    type_suggestion INT NOT NULL DEFAULT 0,
    type_unknown INT NOT NULL DEFAULT 0,

    -- SEVERITY
    severity_low INT NOT NULL DEFAULT 0,
    severity_medium INT NOT NULL DEFAULT 0,
    severity_high INT NOT NULL DEFAULT 0,
    severity_urgent INT NOT NULL DEFAULT 0,
    severity_unknown INT NOT NULL DEFAULT 0,

    -- OTHER METRIC
    days_to_resolve FLOAT NOT NULL DEFAULT 0,

    FOREIGN KEY (analytic_id) REFERENCES analytic(id)
);

-- FUNCTION ENCRYPTS THE NEW INSERTED VALUES AND SETS THE KEY TO THE COMPANY NAME WITH UNDERSCORES
CREATE FUNCTION encryptcompany()
    RETURNS TRIGGER 
        AS $$ 
        BEGIN
            NEW.name=PGP_SYM_ENCRYPT(NEW.name, 'test');
        RETURN NEW;
    END;
    $$
LANGUAGE PLPGSQL;

CREATE FUNCTION encryptanalytics()
    RETURNS TRIGGER 
        AS $$ 
        BEGIN
            NEW.name=PGP_SYM_ENCRYPT(NEW.name, 'test');
            NEW.key=PGP_SYM_ENCRYPT(NEW.key, 'test');
        RETURN NEW;
    END;
    $$
LANGUAGE PLPGSQL;

-- TRIGGERS AN ENCRYPTION ON VALUES INSERTED
CREATE TRIGGER encrypt_company_values BEFORE INSERT ON company
    FOR EACH ROW EXECUTE PROCEDURE encryptcompany();
CREATE TRIGGER encrypt_analytic_values BEFORE INSERT ON analytic
    FOR EACH ROW EXECUTE PROCEDURE encryptanalytics();