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

-- TABLE: DOMAIN
CREATE TABLE domain (
    id INT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT NOT NULL,
    company_id int DEFAULT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id)
);

-- TABLE: samplecompany LOG
CREATE TABLE log_samplecompany (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    domain_id INT DEFAULT NULL,

    -- LICENSES
    license INT NOT NULL DEFAULT 0,
    license_assigned INT NOT NULL DEFAULT 0,
    license_pending INT NOT NULL DEFAULT 0,

    -- USERS
    users INT NOT NULL DEFAULT 0,
    users_login INT NOT NULL DEFAULT 0,
    users_active INT NOT NULL DEFAULT 0,

    -- APP USAGE
    app_file INT NOT NULL DEFAULT 0,
    app_folder INT NOT NULL DEFAULT 0,
    app_project INT NOT NULL DEFAULT 0,
    app_rfi INT NOT NULL DEFAULT 0,
    app_submittal INT NOT NULL DEFAULT 0,
    app_budget INT NOT NULL DEFAULT 0,
    app_contract INT NOT NULL DEFAULT 0,
    app_issue INT NOT NULL DEFAULT 0,
    app_dailyreport INT NOT NULL DEFAULT 0,
    app_meeting INT NOT NULL DEFAULT 0,
    app_punchlist INT NOT NULL DEFAULT 0,

    FOREIGN KEY (domain_id) REFERENCES domain(id)
);

-- TABLE: analytics LOG
CREATE TABLE log_analytics (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL DEFAULT now(),
    domain_id int DEFAULT NULL,

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

    FOREIGN KEY (domain_id) REFERENCES domain(id)
);

-- FUNCTION ENCRYPTS THE NEW INSERTED VALUES AND SETS THE KEY TO THE COMPANY NAME WITH UNDERSCORES
CREATE FUNCTION encryptcompany()
    RETURNS TRIGGER 
        AS $$ 
        BEGIN
            NEW.name=PGP_SYM_ENCRYPT(NEW.name, 'qinD8CO5Ms9');
        RETURN NEW;
    END;
    $$
LANGUAGE PLPGSQL;

CREATE FUNCTION encryptdomains()
    RETURNS TRIGGER 
        AS $$ 
        BEGIN
            NEW.name=PGP_SYM_ENCRYPT(NEW.name, 'qinD8CO5Ms9');
            NEW.key=PGP_SYM_ENCRYPT(NEW.key, 'qinD8CO5Ms9');
        RETURN NEW;
    END;
    $$
LANGUAGE PLPGSQL;

-- TRIGGERS AN ENCRYPTION ON VALUES INSERTED
CREATE TRIGGER encrypt_company_values BEFORE INSERT ON company
    FOR EACH ROW EXECUTE PROCEDURE encryptcompany();
CREATE TRIGGER encrypt_domain_values BEFORE INSERT ON domain
    FOR EACH ROW EXECUTE PROCEDURE encryptdomains();

-- TIER 2 COMPANIES
INSERT INTO company (name, key, tier) VALUES ('QA CBRE', 2);
INSERT INTO company (name, key, tier) VALUES ('QA samplecompany', 'QA_samplecompany_Extensions', 2);
INSERT INTO company (name, key, tier) VALUES ('QA Lendlease', 'QA_Lendlease', 2);
INSERT INTO company (name, key, tier) VALUES ('QA Mayo Arizona', 'QA_Mayo_Arizona', 2);
INSERT INTO company (name, key, tier) VALUES ('QA Clark', 'QA_Clark', 2);

-- TIER 3 COMPANIES
INSERT INTO company (name, key, tier) VALUES ('QA PTC', 'QA_PTC', 3);
INSERT INTO company (name, key, tier) VALUES ('QA Cisco', 'QA_Cisco', 3);
INSERT INTO company (name, key, tier) VALUES ('QA Arco', 'QA_Arco', 3);
INSERT INTO company (name, key, tier) VALUES ('QA Third Party', 'QA_Third_Party', 3);
INSERT INTO company (name, key, tier) VALUES ('QA Crossland', 'QA_Crossland', 3);

-- TIER 2 DOMAINS
INSERT INTO domain (id, name, key, company_id) VALUES (1585, 'QA CBRE', 'QA_CBRE', 2);
INSERT INTO domain (id, name, key, company_id) VALUES (1580, 'QA samplecompany', 'QA_samplecompany_Extensions', 2);
INSERT INTO domain (id, name, key, company_id) VALUES (13352, 'QA Lendlease', 'QA_Lendlease', 2);
INSERT INTO domain (id, name, key, company_id) VALUES (1575, 'QA Mayo Arizona', 'QA_Mayo_Arizona', 2);
INSERT INTO domain (id, name, key, company_id) VALUES (1577, 'QA Clark', 'QA_Clark', 2);

-- TIER 3 DOMAINS
INSERT INTO domain (id, name, key, company_id) VALUES (1578, 'QA PTC', 'QA_PTC', 3);
INSERT INTO domain (id, name, key, company_id) VALUES (1570, 'QA Cisco', 'QA_Cisco', 3);
INSERT INTO domain (id, name, key, company_id) VALUES (1584, 'QA Arco', 'QA_Arco', 3);
INSERT INTO domain (id, name, key, company_id) VALUES (1560, 'QA Third Party', 'QA_Third_Party', 3);
INSERT INTO domain (id, name, key, company_id) VALUES (1730, 'QA Crossland', 'QA_Crossland', 3);