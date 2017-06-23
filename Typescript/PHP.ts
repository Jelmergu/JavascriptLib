/**
 * Created by jwijnja on 22-6-2017.
 */
class PHP {
    static max_random: number = 32767;

    /**
     *
     */
    static empty(value): boolean {
        let type:string = typeof value;
        if (type == "string") {
            return (value == "" || value == undefined);
        }
        else if (type == "array" || type == "object") {
            return value.length > 0;
        }
        else if (type == "undefined" || value == "null") {
            return true;
        }
        else {
            return false;
        }
    }

    static isset(value: any): boolean {
        return (value !== undefined && value !== null);
    }

    static count(value: any[] | object): number {
        let type:string = typeof value;
        if ((type == "array" || type == "object") === false) {
            return 0;
        }
        let counter = 0;
        for (let i in value) {
            counter++;
        }
        return counter;
    }

    static rand(min?: number, max?: number): number {

        if (PHP.isset(min) === false) {
            min = 0;
        }
        if (PHP.isset(max) === false) {
            max = PHP.getrandmax();
        }
        return parseInt(""+min) + Math.floor(Math.random() * (parseInt(""+max) - parseInt(""+min) + 1));
    }
    static getrandmax() : number {
        return PHP.max_random;
    }
}