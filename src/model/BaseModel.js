export class BaseModel {
    constructor() {
        if (new.target === BaseModel) {
            throw new Error("Cannot create BaseModel directly");
        }
    }

    // must define in child
    static get table() {
        throw new Error("table must be implemented");
    }

    static get fillable() {
        return [];
    }

    
    static filterData(data) {
        const result = {};

        for (const field of this.fillable) {
            if (data[field] !== undefined) {
                result[field] = data[field];
            }
        }

        return result;
    }


    getAll(){
        throw new Error("getAll() must be implement")
    }

    findById(id){
        throw new Error("findById() must be implement")
    }

    create(data){
        throw new Error("create() must be implement")
    }

    update(id, data){
        throw new Error("update() must be implement")
    }

    delete(id){
        throw new Error("delete() must be implement")
    }
}