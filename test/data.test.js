import assert from "assert";
import dataFactory from "../data-factory.js";
import displayFactory from "../display-factory.js";
import pgPromise from "pg-promise";
const pgp = pgPromise({});

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:sap123@localhost:5432/my_regies';

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
        await db.query('DELETE FROM reg_numbers;')
    });

    it('should be able to capture a new registration number from Cape Town',async function(){
        let regEntry = dataFactory(db)
        await regEntry.populateRegies("CA 120-305");
        assert.deepEqual([ { regnumber: "CA 120-305" , town_id: 1 } ], await regEntry.retrieveData())
    })

    it('should be able to capture a new registration number from Bellville', async function(){
        let regEntry = dataFactory(db)
        await regEntry.populateRegies("CY 000-305");
        assert.deepEqual([ { regnumber: 'CY 000-305', town_id: 2 } ], await regEntry.retrieveData());
    })
    it('should be able capture a new registration number from Paarl', async function(){
        let regEntry = dataFactory(db);
        await regEntry.populateRegies("CJ 231-765");
        assert.deepEqual([ { regnumber: 'CJ 231-765', town_id: 3 } ], await regEntry.retrieveData())
    })
    it('should be able to capture a new registration number from Paarl', async function(){
        let regEntry = dataFactory(db);
        await regEntry.populateRegies("CL 231-000");
        assert.deepEqual([ { regnumber: 'CL 231-000', town_id: 4 } ],await regEntry.retrieveData())
    })
    it('should filter for a registration plate from Paarl', async function(){
        let regEntry = dataFactory(db);
        let filter = displayFactory();
        await regEntry.populateRegies("CJ 231-765");
        await regEntry.populateRegies("CA 876-98");
         filter.myTown("Paarl");
         assert.deepEqual([ { regnumber: 'CJ 231-765', town_id: 3 } ],await regEntry.filterRegies("CJ"))
    })
    it ('should filter for a registration plate from Cape Town', async function(){
        let regEntry = dataFactory(db);
        let filter = displayFactory();
        await regEntry.populateRegies("CA 435-342");
        await regEntry.populateRegies("CL 756-483");
         filter.myTown("Cape Town");
        assert.deepEqual([ { regnumber: 'CA 435-342', town_id: 1 } ],await regEntry.filterRegies("CA"))
    })

    it ('should filter for a registration plate from Bellville', async function(){
        let regEntry = dataFactory(db);
        let filter = displayFactory()
        await regEntry.populateRegies("CY 123-654");
        await regEntry.populateRegies("CA 324-543");
         filter.myTown("Bellville");

        assert.deepEqual([ { regnumber: 'CY 123-654', town_id: 2 } ], await regEntry.filterRegies("CY"));
    })

    it ('should filter for a registration plate from Stellenbosch', async function(){
        let regEntry = dataFactory(db);
        let filter = displayFactory();
        await regEntry.populateRegies("CL 369-246");
        await regEntry.populateRegies("CY 987-345");
         filter.myTown("Stellenbosch");

        assert.deepEqual([ { regnumber: 'CL 369-246', town_id: 4 } ], await regEntry.filterRegies("CL"))
    })

    after( async function() {
        db.$pool.end();
    });
})

