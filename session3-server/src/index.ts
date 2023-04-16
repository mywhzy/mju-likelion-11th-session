import { input } from './input';

type Student = {
  id: number;
  name: string;
  age: number;
};

type StudentInput = Omit<Student, 'id'>; // id 속성을 빼겠다.

// type Name = Pick<Student, 'name'>; // name 속성만 쓰겠다.

let students: Student[] = [];

const createStudent = (studentInfo: StudentInput) => {
  students.push({
    id: students.length + 1,
    ...studentInfo,
  });
};

const getAllStudents = () => {
  return students;
};

const getStudentById = (id: number) => {
  const filtered = students.filter((student) => student.id === id);
  if (!filtered.length) {
    return null;
  }
  return filtered;
};

const updateStudent = (id: number, student: StudentInput) => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return;
  }
  const updatedStudent = { id, ...student };
  students[studentIndex] = updatedStudent;
  return updateStudent;
};

const deleteStudent = (id: number) => {
  const studentIndex = students.findIndex((student) => student.id === id);
  if (studentIndex === -1) {
    return;
  }
  students.splice(studentIndex, 1);
};

const main = async () => {
  console.log('Welcome to Student management system');
  console.log(`1. Create a student
2. See all students list
3. Get student by ID
4. Update Student
5. Delete Student
0. Exit`);

  let option: string = '';

  do {
    option = await input('Select an option:');
    switch (option) {
      case '1':
        const name = await input('Enter name: ');
        const age = parseInt(await input('Enter age: '));
        createStudent({ name, age });
        break;
      case '2':
        console.log(getAllStudents());
        break;
      case '3':
        const id = parseInt(await input('Enter ID: '));
        const student = getStudentById(id);
        console.log(student);
        break;
      case '4':
        const idforUpdate = parseInt(await input('Enter ID: '));
        const nameforUpdate = await input('Enter name: ');
        const ageforUpdate = parseInt(await input('Enter age: '));
        updateStudent(idforUpdate, { name: nameforUpdate, age: ageforUpdate });
        break;
      case '5':
        const idforDelete = parseInt(await input('Enter ID: '));
        deleteStudent(idforDelete);
        break;
      case '0':
        return;
      default:
        console.log('Invalid option');
        break;
    }
  } while (option !== '0');
};

main();
