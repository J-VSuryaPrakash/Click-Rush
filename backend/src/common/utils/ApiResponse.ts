class ApiResponse {

    statuscode: number;
    message: string;
    data: any;

    constructor(statuscode: number, message: string, data: any){
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
    }

    static created(message: string, data: any){
        return new ApiResponse(201, message, data);
    }

    static ok(message: string){
        return new ApiResponse(200, message, null);
    }

}

export default ApiResponse;