export default interface responseData<T>{
    err:boolean;
    message?:string;
    data?:any;
    status:number
}