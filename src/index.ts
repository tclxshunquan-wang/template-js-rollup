
interface IObj {
    name: string,
    age: number,
    toString: () => void
}
var obj: IObj = {
    name: "test",
    age: 20,
    toString: () => {
        console.log('show your talent~')
    }
}

console.log('test obj:', obj);
export default obj;