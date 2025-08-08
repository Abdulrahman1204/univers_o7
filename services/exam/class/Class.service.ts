import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import {
  Class,
  validateClassCreate,
  validateClassUpdate,
} from "../../../models/exam/class/Class.model";
import { IClass } from "../../../models/exam/class/dtos";

class ClassService {
  // ~ POST /api/classes ~ Create Class
  static async createClass(classData: IClass) {
    const { error } = validateClassCreate(classData);
    if (error) throw new BadRequestError(error.details[0].message);

    const existingClass = await Class.findOne({
      className: classData.className,
    });
    if (existingClass) throw new BadRequestError("اسم الصف موجود مسبقاً");

    const newClass = await Class.create(classData);
    return newClass;
  }

  // ~ GET /api/classes/:id ~ Get Class
  static async getClass(id: string) {
    const classObj = await Class.findById(id);
    if (!classObj) throw new NotFoundError("الصف غير موجود");
    return classObj;
  }

  // ~ GET /api/classes ~ Get All Classes
  static async getAllClasses() {
    const classes = await Class.find();
    if (!classes.length) throw new NotFoundError("لا توجد صفوف متاحة");
    return classes;
  }

  // ~ PUT /api/classes/:id ~ Update Class
  static async updateClass(id: string, classData: Partial<IClass>) {
    const { error } = validateClassUpdate(classData);
    if (error) throw new BadRequestError(error.details[0].message);

    const updatedClass = await Class.findByIdAndUpdate(id, classData, {
      new: true,
      runValidators: true,
    });
    if (!updatedClass) throw new NotFoundError("فشل تحديث الصف");
    return updatedClass;
  }

  // ~ DELETE /api/classes/:id ~ Delete Class
  static async deleteClass(id: string) {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) throw new NotFoundError("فشل حذف الصف");
    return deletedClass;
  }
}

export { ClassService };
