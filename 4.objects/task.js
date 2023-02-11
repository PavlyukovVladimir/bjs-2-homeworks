function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
}

Student.prototype.addMarks = function (...marks) {
    // если после каких-либо манипуляций marks окажется в прототипе,
    // то оценки все равно будут присваиваться
    if ('marks' in this) {
        this.marks.push(...marks);
    };
}

Student.prototype.getAverage = function () {
    if ('marks' in this && this.marks.length > 0) {
        return this.marks.reduce((average, mark, _, marks) => average + mark, 0) / marks.length;
    }
    return 0;
}

Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
}
