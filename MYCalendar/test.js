function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;

}

function test1(){
    //ways to create object on Java

    // 1 object literal
    let lola = {
        name: "lola",
        age: 4,
        color: "white"
    };

    console.log(lola);

    //object constructor
    let fido = new Dog("Fido", 2, "Black");
    console.log(fido)

    //3 class
    class Task{
        constructor(important, title, desc, location, participants, color, dueDate){
            this.important = important;
            this.title = title;
            this.description = desc;
            this.location = location;
            this.participants = participants;
            this.color = color;
            this.dueDate = dueDate;
        }
    
    }
}

//ways to create object on Java 