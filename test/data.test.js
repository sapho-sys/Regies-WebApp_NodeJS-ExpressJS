import assert from "assert";
import dataFactory from "../data-factory.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_registrations';

const config = {
    connectionString
}

if (process.env.NODE_ENV == 'production') {
    config.ssl = {
        rejectUnauthorized: false
    }
}



const db = pgp(config);

describe("Testing registration functions with database logic", function(){

    beforeEach(async function () {
        // clean the tables before each test run
        // await db.query('TRUNCATE TABLE reg_plates restart identity;');
        await db.query('DELETE FROM reg_plates;')
    });

    it('should be able to capture a new registration number',async function(){
        let regEntry = dataFactory(db)
        regEntry.populateRegies("CA 231-345");

        assert.equal([{id:1, regnumber:"CA 231-345", town_id:1}], await regEntry.retrieveData())
    })

    after( async function() {
        db.$pool.end();
    });
})

