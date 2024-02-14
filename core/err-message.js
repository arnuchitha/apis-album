class errorMessage {
    constructor() {
        this.success;
        this.status;
        this.statusMessage;
        this.type;
        this.message;
    }
    DatatoObj(data){
        this.success = data.success?data.success:undefined;
        this.status = data.status?data.status:undefined;
        this.statusMessage = data.statusMessage?data.statusMessage:undefined;
        this.type = data.type?data.type:undefined;
        this.message = data.message?data.message:undefined;
    }
    ObjData(){
        const obj = {
            'success':this.success,
            'status':this.status,
            'statusMessage':this.statusMessage,
            'type':this.type,
            'message':this.message,
        }
        return obj;
    }
    Obj(){
        const obj = {
            'success':'',
            'status':'',
            'statusMessage':'',
            'type':'',
            'message':'',
        }
        return obj;
    }
    errorMessageTo(suc, stt, sttmes, type, mes){
        this.success = suc;
        this.status = stt;
        this.statusMessage = sttmes;
        this.type = type;
        this.message = mes;
        return this.ObjData();
    }
}
module.exports = errorMessage;