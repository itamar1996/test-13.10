export default interface postWhithUserDTO{
    id: string,
    title: string,
    content: string,
    author: {
        id: string,
        username: string,
        email: string
    }
}