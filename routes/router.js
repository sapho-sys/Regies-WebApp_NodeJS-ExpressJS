import dataFactory from "../data-factory"; 
import displayFactory from "../display-factory";



function regiesTowns(){

let data = dataFactory();
let display = displayFactory();

    async function defaultRoute(req, res){
        res.render("index",{
            regiesData: await data.retrieveData()
        })

    }

    async function homePage(req, res){
        try {
            await data.populateRegies(req.body.entry);
            res.redirect('/');
        } catch (error) {
            console(error) 
        }
    }


    async function postRegies(req, res){
        try {
             display.myTown(req.body.showTown);
             res.redirect("/filter_regies")  
        } catch (error) {
            console.log(error);  
        }
    }

    async function fetchRegies(req,res){
        try {
            let code = display.showCode();
            let myData = [];
            if(code !== " "){
                myData = await data.filterRegies(code);
            }
          
            
        } catch (error) {
            console.log(error)
            
        }
    }

    async function resetData(req, res){

    }

    return {
        defaultRoute,
        homePage,
        postRegies,
        fetchRegies,
        resetData
    }



}

export default regiesTowns;