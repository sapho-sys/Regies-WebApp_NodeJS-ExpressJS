function Registration(){
    let entry = ' ';
    function myTown(plate){
        switch (plate){
            case 'Bellville': {
                  entry = 'CY';
                break;
            }
            case 'Paarl': {
                  entry = 'CJ';
                break;
            }
            case 'Stellenbosch': {
                  entry = 'CL';
                break;
            }
            case 'Cape Town': {
                  entry = 'CA';
                break;
            }
        }
    }
    function showCode(){
        return entry;
    }



    return{
        myTown,
        showCode
    }
}

export default Registration;