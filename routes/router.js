
function regiesTowns(dataFactory,displayFactory){
    
     async function defaultRoute(req, res){

        res.render("index",{
            regiesData: await dataFactory.retrieveData()
        })
    }

    async function homePage(req, res,next){
        try {
            await dataFactory.populateRegies(req.body.RegEntry);
            res.redirect('/');
        } catch (error) {
            next(error) 
        }
    }

      function postRegies(req, res,next){
        try {
             displayFactory.myTown(req.body.showTown);
             res.redirect("/reg_numbers");  
        } catch (error) {
            next(error);  
        }
    }

    async function fetchRegies(req,res, next){
        try {
			let Towncode = displayFactory.showCode();
			let displayReg = [];
			if (Towncode !== '') {
				displayReg = await dataFactory.filterRegies(Towncode);

				if (displayReg.length == 0) {
					req.flash('success', 'No Registration number(s) from this town yet');
				} 
			} else {
				req.flash('info', 'Error! town not selected');
			}
			res.render("index", {
                displayReg
            });
            
		} catch (error) {
			next(error);
            
		}
        
    }

    async function resetData(req, res){
        await dataFactory.resetData();
        res.redirect('/');
    }

    function showAll(res,req){
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