import {
  BadRequestError,
  NotFoundError,
} from "../../../middlewares/handleErrors";
import { Subject } from "../../../models/exam/subject/Subject.model";
import { IUnit } from "../../../models/exam/unit/dtos";
import {
  Unit,
  validateUnitCreate,
  validateUnitUpdate,
} from "../../../models/exam/unit/Unit.model";

class UnitService {
  // ~ POST /api/units ~ Create Unit
  static async createUnit(unitData: IUnit) {
    const { error } = validateUnitCreate(unitData);
    if (error) throw new BadRequestError(error.details[0].message);

    // Validate subject exists
    const subjectExists = await Subject.findById(unitData.subject);
    if (!subjectExists) throw new NotFoundError("المادة غير موجودة");

    const newUnit = await Unit.create(unitData);
    return newUnit;
  }

  // ~ GET /api/units/:id ~ Get Unit
  static async getUnit(id: string) {
    const unit = await Unit.findById(id).populate("subject", "subjectName");
    if (!unit) throw new NotFoundError("الوحدة غير موجودة");
    return unit;
  }

  // ~ GET /api/units ~ Get All Units
  static async getAllUnits() {
    const units = await Unit.find()
      .populate("subject", "subjectName")
      .sort({ createdAt: -1 });
    if (!units.length) throw new NotFoundError("لا توجد وحدات متاحة");
    return units;
  }

  // ~ GET /api/units/subject/:subjectId ~ Get Units by Subject
  static async getUnitsBySubject(subjectId: string) {
    const units = await Unit.find({ subject: subjectId }).populate(
      "subject",
      "subjectName"
    );
    if (!units.length) throw new NotFoundError("لا توجد وحدات لهذه المادة");
    return units;
  }

  // ~ PUT /api/units/:id ~ Update Unit
  static async updateUnit(id: string, unitData: Partial<IUnit>) {
    const { error } = validateUnitUpdate(unitData);
    if (error) throw new BadRequestError(error.details[0].message);

    if (unitData.subject) {
      const subjectExists = await Subject.findById(unitData.subject);
      if (!subjectExists) throw new NotFoundError("المادة غير موجودة");
    }

    const updatedUnit = await Unit.findByIdAndUpdate(id, unitData, {
      new: true,
      runValidators: true,
    }).populate("subject", "subjectName");

    if (!updatedUnit) throw new NotFoundError("فشل تحديث الوحدة");
    return updatedUnit;
  }

  // ~ DELETE /api/units/:id ~ Delete Unit
  static async deleteUnit(id: string) {
    const deletedUnit = await Unit.findByIdAndDelete(id);
    if (!deletedUnit) throw new NotFoundError("فشل حذف الوحدة");
    return deletedUnit;
  }
}

export { UnitService };
