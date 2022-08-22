import assert from "assert";
import regNumberFactory from "../display-factory.js";

describe("Testing registration functions without database logic", function(){
    it("should return registration palte code from Cape Town",function(){
        let regiesApp = regNumberFactory();
        regiesApp.myTown('Cape Town');
        assert.equal('CA', regiesApp.showCode());
    });

    it ("should return registration plate code from Stellenbosch",function(){
        let regiesApp = regNumberFactory();
        regiesApp.myTown('Stellenbosch');
        assert.equal('CL', regiesApp.showCode());
    });

    it ("should return registration plate code from Paarl",function(){
        let regiesApp = regNumberFactory();
        regiesApp.myTown('Paarl');
        assert.equal('CJ', regiesApp.showCode());
    });
    it ("should return registration plate code from Bellville",function(){
        let regiesApp = regNumberFactory();
        regiesApp.myTown('Bellville');
        assert.equal('CY', regiesApp.showCode());
    });

})