function DataLogic(data){
    const db = data;
    const regExp = /^((CA|CF|CJ|CL)\s([0-9]){6})$/;
    const regExp1 = /^((CA|CF|CJ|CL)\s([0-9]){3}\s([0-9]){3})$/;
    const regExp2 = /^((CA|CF|CJ|CL)\s([0-9]){3}\-([0-9]){3})$/;

    var warning = '';

    async function populateRegies(newReg) {
		if (newReg !== '') {
			let regNo = newReg.toUpperCase();
			let strReg = regNo.substring(0,2);
			if (regNo.match(regExp) || regNo.match(regExp1) || regNo.match(regExp2)) {
				const getRow = await db.manyOrNone('SELECT * FROM reg_towns WHERE code = $1', [strReg]);
				const getCode = getRow.rows;
				const refId = getCode[0].id;
				await regCheck(regNo, refId);
			}else {
				warning = 'Invalid registration number format entered';
			}
		} else {
			warning = 'Registration number not entered';
		}
	}

    async function regEntry(newReg, Id) {
		const regMutation = await db.manyOrNone('SELECT * FROM reg_plates WHERE regNumber = $1', [newReg]);
		if (regMutation.length == 0) {
			await db.manyOrNone('INSERT INTO reg_plates (regNumber, town_id)  VALUES ($1, $2)', [newReg, Id]);``
		} else {
			warning = 'The registration number you entered already exists!';
		}
	}

	async function retrieveData() {
		const myData = await db.manyOrNone('SELECT regNumber, town_id FROM reg_plates');
		return myData.rows;
	}

	async function filterRegies(entry) {
		if (entry != '') {
			const uniqCode = entry;
			const getRow = await db.manyOrNone('SELECT * FROM reg_towns WHERE code = $1', [uniqCode]);
			const getTown = getRow.rows;
			const uniqId = getTown[0].id;

			const Filter = await db.manyOrNone('SELECT regNumber, town_id FROM reg_plates WHERE town_id = $1', [uniqId]);

			return Filter.rows;
		} else {
			warning = 'select a town!';
			return [];

		}
	}

	async function resetData() {
		return db.none('DELETE FROM reg_plates');
	}

    return{
        regEntry,
        resetData,
        filterRegies,
        retrieveData,
        populateRegies
    }
      
}

export default DataLogic;