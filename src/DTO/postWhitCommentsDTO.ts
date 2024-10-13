export default interface postWhitCommentsDTO{
    id: string,
    title: string,
    content: string,
    comments:{
        content:string,
        createdAt:Date
    }
}