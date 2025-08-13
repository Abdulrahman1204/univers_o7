import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import {
  Subject,
  validateSubjectCreate,
  validateSubjectUpdate,
} from "../../../models/exam/subject/Subject.model";
import { ISubject } from "../../../models/exam/subject/dtos";
import { Class } from "../../../models/exam/class/Class.model";

class SubjectService {
  // ~ POST /api/subjects ~ Create Subject
  static async createSubject(subjectData: ISubject) {
    const { error } = validateSubjectCreate(subjectData);
    if (error) throw new BadRequestError(error.details[0].message);

    // Check if class exists
    const classExists = await Class.findById(subjectData.class);
    if (!classExists) throw new NotFoundError("الصف غير موجود");

    // Check if subject already exists in this class
    const existingSubject = await Subject.findOne({
      subjectName: subjectData.subjectName,
      class: subjectData.class,
    });
    if (existingSubject)
      throw new BadRequestError("المادة موجودة مسبقاً في هذا الصف");

    const newSubject = await Subject.create(subjectData);
    return newSubject;
  }

  // ~ GET /api/subjects/:id ~ Get Subject
  static async getSubject(id: string) {
    const subject = await Subject.findById(id).populate("class", "className");
    if (!subject) throw new NotFoundError("المادة غير موجودة");
    return subject;
  }

  // ~ GET /api/subjects ~ Get All Subjects
  static async getAllSubjects() {
    const subjects = await Subject.find().populate("class", "className").populate('units', 'unitName -subject');
    if (!subjects.length) throw new NotFoundError("لا توجد مواد متاحة");
    return subjects;
  }

  // ~ GET /api/subjects/class/:classId ~ Get Subjects by Class
  static async getSubjectsByClass(classId: string) {
    const subjects = await Subject.find({ class: classId }).populate(
      "class",
      "className"
    );
    if (!subjects.length) throw new NotFoundError("لا توجد مواد لهذا الصف");
    return subjects;
  }

  // ~ PUT /api/subjects/:id ~ Update Subject
  static async updateSubject(id: string, subjectData: Partial<ISubject>) {
    const { error } = validateSubjectUpdate(subjectData);
    if (error) throw new BadRequestError(error.details[0].message);

    if (subjectData.class) {
      const classExists = await Class.findById(subjectData.class);
      if (!classExists) throw new NotFoundError("الصف غير موجود");
    }

    const updatedSubject = await Subject.findByIdAndUpdate(id, subjectData, {
      new: true,
      runValidators: true,
    }).populate("class", "className");

    if (!updatedSubject) throw new NotFoundError("فشل تحديث المادة");
    return updatedSubject;
  }

  // ~ DELETE /api/subjects/:id ~ Delete Subject
  static async deleteSubject(id: string) {
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) throw new NotFoundError("فشل حذف المادة");
    return deletedSubject;
  }
}

export { SubjectService };
