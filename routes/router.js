
function regiesTowns(dataFactory, displayFactory) {

    async function defaultRoute(req, res) {

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
            let error = dataFactory.errorMessages()

            let displayReg = [];
            if (Towncode !== '') {
                displayReg = await dataFactory.filterRegies(Towncode);
            }
            res.render("index", {
                displayReg,
                color,
                error

            });

        } catch (error) {
            next(error);

        }

    }

    async function resetData(req, res) {
        await dataFactory.resetData();
        res.redirect('/');
    }

    function showAll(res, req) {
        // displayFactory.showTowns();
        res.redirect('/index');
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