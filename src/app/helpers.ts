import * as $ from "jquery";
export class Helpers {
    static setLoading(enable:boolean) {
        let body = $('body');
        if (enable) {
            $(body).addClass('m-page--loading-non-block')
        } else {
            $(body).removeClass('m-page--loading-non-block')
        }
    }

}