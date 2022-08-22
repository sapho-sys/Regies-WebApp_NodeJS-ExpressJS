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

    }

    async function entryRoute(req, res){

    }

    async function filterRoute(req, res){

    }

    async function resetData(req, res){

    }

    return {
        defaultRoute,
        homePage,
        entryRoute,
        filterRoute,
        resetData
    }



}

export default regiesTowns;