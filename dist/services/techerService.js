"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
class techerService {
    static signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, classname } = user;
                console.log(username);
                if (!username || !email || !password || !classname) {
                    return {
                        err: true,
                        message: "missing detales",
                        status: 400,
                    };
                }
                const classDoc = yield classModel_1.default.findOne({ name: classname });
                if (classDoc) {
                    return {
                        err: true,
                        message: "the class already have a techer",
                        status: 400,
                    };
                }
                const dbClass = new classModel_1.default({
                    name: classname
                });
                yield dbClass.save();
                const dbUser = new teacherModel_1.default({
                    Username: username,
                    email,
                    password: yield bcrypt_1.default.hash(password, 10),
                    class: dbClass._id
                });
                yield dbUser.save();
                return {
                    err: false,
                    message: "created",
                    status: 200,
                    data: dbUser._id
                };
            }
            catch (error) {
                return {
                    err: true,
                    message: "server eror",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static addGrade(gradeData, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId, testName, grade } = gradeData;
                const teacher = yield teacherModel_1.default.findById(teacherId)
                    .select('class');
                if (!teacher) {
                    return {
                        err: true,
                        message: "Teacher not found",
                        status: 404,
                    };
                }
                const classDoc = yield classModel_1.default.findById(teacher === null || teacher === void 0 ? void 0 : teacher.class).populate('students', '_id tests');
                if (!classDoc) {
                    return {
                        err: true,
                        message: "class not found",
                        status: 404,
                    };
                }
                const student = classDoc.students.find(s => s._id.equals(new mongoose_1.Types.ObjectId(studentId)));
                if (!student) {
                    return {
                        err: true,
                        message: "Student not found",
                        status: 404,
                    };
                }
                student.tests.push({
                    name: testName,
                    grade
                });
                yield student.save();
                return {
                    err: false,
                    message: "Test added successfully",
                    status: 200,
                    data: student
                };
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static GetGrades(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield teacherModel_1.default.findById(teacherId)
                    .select('class');
                if (!teacher) {
                    return {
                        err: true,
                        message: "Teacher not found",
                        status: 404,
                    };
                }
                const classDoc = yield classModel_1.default.findById(teacher === null || teacher === void 0 ? void 0 : teacher.class).populate('students', 'name tests');
                if (!classDoc) {
                    return {
                        err: true,
                        message: "class not found",
                        status: 404,
                    };
                }
                return {
                    err: false,
                    message: "Fetched user successfully",
                    status: 200,
                    data: classDoc
                };
            }
            catch (error) {
                console.error("Error fetching user:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static GetGrade(teacherId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield teacherModel_1.default.findById(teacherId)
                    .select('class');
                if (!teacher) {
                    return {
                        err: true,
                        message: "Teacher or class not found",
                        status: 404,
                    };
                }
                const student = yield studentModel_1.default.findById(studentId)
                    .select('class tests');
                if (!student) {
                    return {
                        err: true,
                        message: "student not found",
                        status: 404,
                    };
                }
                if (student.class.toString() != teacher.class.toString()) {
                    return {
                        err: true,
                        message: "class not youres",
                        status: 402,
                    };
                }
                return {
                    err: false,
                    message: "Fetched student grades successfully",
                    status: 200,
                    data: student.tests,
                };
            }
            catch (error) {
                console.error("Error fetching grades:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static EditeGrade(teacherId, gradeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield teacherModel_1.default.findById(teacherId)
                    .select('class');
                if (!teacher) {
                    return {
                        err: true,
                        message: "Teacher or class not found",
                        status: 404,
                    };
                }
                const student = yield studentModel_1.default.findById(gradeData.studentId)
                    .select('class tests');
                if (!student) {
                    return {
                        err: true,
                        message: "student not found",
                        status: 404,
                    };
                }
                if (student.class != teacher.class) {
                    return {
                        err: true,
                        message: "class not youres",
                        status: 402,
                    };
                }
                const test = student.tests.find(n => n.name == gradeData.testName);
                if (!test) {
                    return {
                        err: true,
                        message: "test not youres",
                        status: 402,
                    };
                }
                test.grade = gradeData.grade;
                student.save();
                return {
                    err: false,
                    message: "Fetched student grades successfully",
                    status: 200,
                    data: student.tests,
                };
            }
            catch (error) {
                console.error("Error fetching grades:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                    data: error
                };
            }
        });
    }
    static GetAVG(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield teacherModel_1.default.findById(teacherId).select('class');
                if (!teacher) {
                    return {
                        err: true,
                        message: "Teacher not found",
                        status: 404,
                    };
                }
                const classDoc = yield classModel_1.default.findById(teacher.class).populate('students');
                if (!classDoc) {
                    return {
                        err: true,
                        message: "Class not found",
                        status: 404,
                    };
                }
                if (classDoc.students.length === 0) {
                    return {
                        err: false,
                        message: "Class has no students yet",
                        status: 200,
                        data: { name: classDoc.name, avg: null }
                    };
                }
                const students = yield studentModel_1.default.find({ _id: { $in: classDoc.students } }).exec();
                //   const students = classDoc.students as Istudent[];
                const studentAverages = students.map(student => {
                    if (student.tests.length === 0)
                        return 0;
                    const sum = student.tests.reduce((acc, test) => acc + test.grade, 0);
                    return sum / student.tests.length;
                });
                const classAverage = studentAverages.reduce((acc, avg) => acc + avg, 0) / students.length;
                yield classModel_1.default.findByIdAndUpdate(teacher.class.toString(), { avg: classAverage });
                return {
                    err: false,
                    message: "Fetched average grade successfully",
                    status: 200,
                    data: { name: classDoc.name, avg: classAverage }
                };
            }
            catch (error) {
                console.error("Error fetching average grade:", error);
                return {
                    err: true,
                    message: "Server error",
                    status: 500,
                };
            }
        });
    }
}
exports.default = techerService;
