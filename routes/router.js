
function regiesTowns(dataFactory, displayFactory) {

    async function defaultRoute(req, res) {
        req.flash('error', dataFactory.errorMessages());
        res.render("index", {
            regiesData: await dataFactory.retrieveData()
          
        })
    }

    async function homePage(req, res, next) {
        try {
            await dataFactory.populateRegies(req.body.RegEntry);
            
            res.redirect('/');
           
        } catch (error) {
            next(error)
        }
    }

    function postRegies(req, res, next) {
        try {
            displayFactory.myTown(req.body.showTown);
            res.redirect("/reg_numbers");
        } catch (error) {
            next(error);
        }
    }

    async function fetchRegies(req, res, next) {
        try {
            let Towncode = displayFactory.showCode();
            let color = dataFactory.classListAdd();
            
            let renderRegies = [];
            if (Towncode !== '') {
                renderRegies = await dataFactory.filterRegies(Towncode);

				if (renderRegies.length == 0) {
					req.flash('error', 'There are no registration number(s) from this town yet');
				} 
            }else {
				req.flash('error', 'Please select a town !');
			}

            res.render("index", {
                renderRegies,
                color
                

            });

        } catch (error) {
            next(error);

        }

    }

    async function resetData(req, res) {
        await dataFactory.resetData();
        
        res.redirect('/');
    }

    function showAll(req, res) {
        dataFactory.showTowns();
        res.redirect('/');
    }

    return {
        defaultRoute,
        homePage,
        postRegies,
        fetchRegies,
        resetData,
        showAll
    }



}

export default regiesTowns;