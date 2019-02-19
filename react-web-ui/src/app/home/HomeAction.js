
export const HOME_1 = 'HOME_1';
export const HOME_2 = 'HOME_2';

function home1() {

    return{
        type: HOME_1,
        context: 'home1'
    }

}

function home2() {
    return{
        type: HOME_2,
        context: 'home2'
    }
}

export const actions = {
    home1,
    home2
}