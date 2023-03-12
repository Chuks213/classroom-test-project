export default interface StudentRecord {
    id: string,
    fields: Fields
}

interface Fields {
    Name: string,
    Classes: string[]
}