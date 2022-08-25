function DataLogic(data){
    const db = data;
    const regExp = /^((CA|CY|CJ|CL)\s([0-9]){6})$/;
    const regExp1 = /^((CA|CY|CJ|CL)\s([0-9]){3}\s([0-9]){3})$/;
    const regExp2 = /^((CA|CY|CJ|CL)\s([0-9]){3}\-([0-9]){3})$/;
	


    var warning = '';

    async function populateRegies(newReg) {
		if (newReg !== '') {
			let regNo = newReg.toUpperCase();
			let strReg = regNo.substring(0,2);
			if (regNo.match(regExp) || regNo.match(regExp1) || regNo.match(regExp2)) {
				const getRow = await db.manyOrNone('SELECT * FROM reg_plates WHERE code = $1', [strReg]);
				const getId = await db.manyOrNone('SELECT id FROM reg_plates WHERE code = $1', [strReg]);
				let newId = getId[0].id;
				await regEntry(regNo,newId);
			}else {
				warning = 'Invalid registration number format entered';
			}
		} else {
			warning = 'Registration number not entered';
		}
	}

    async function regEntry(myReg, Id) {
		const regMutation = await db.manyOrNone('SELECT * FROM reg_numbers WHERE regnumber = $1', [myReg]);
		if (regMutation.length == 0) {
			await db.manyOrNone('INSERT INTO reg_numbers (regnumber, town_id)  VALUES ($1, $2)', [myReg, Id]);
			showTowns();
		} else {
			warning = 'The registration number you entered already exists!';

		}
	}

	async function retrieveData() {
		const myData = await db.manyOrNone('SELECT regnumber, town_id FROM reg_numbers');
		return myData;
	}

	async function filterRegies(entry) {
		if (entry != '') {
			const uniqCode = entry;
			const getRow = await db.manyOrNone('SELECT * FROM reg_plates WHERE code = $1', [uniqCode]);
			const uniqId = await db.manyOrNone('SELECT id FROM reg_plates WHERE code = $1', [uniqCode]);
			const uniqueId =uniqId[0].id;
			const Filter = await db.manyOrNone('SELECT regnumber, town_id FROM reg_numbers WHERE town_id = $1', [uniqueId]);
			return Filter;
		} else {
			warning = 'select a town!';
			

		}
	}

	async function resetData() {
		warning = "Data has been deleted..."
		return db.none('DELETE FROM reg_numbers');
	}

	 function showTowns(){
		warning = ' ';
	}

	function errorMessages(){
		return warning;
	}

	function classListAdd(){
		if(warning === 'Invalid registration number format entered' || warning === 'Registration number not entered'){
			return 'danger';
		}else{
			return 'warning';
		}
	}

    return{
        regEntry,
        resetData,
        filterRegies,
        retrieveData,
        populateRegies,
		showTowns,
		errorMessages,
		classListAdd
    }
      
}

export default DataLogic;