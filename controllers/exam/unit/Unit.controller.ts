import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UnitService } from "../../../services/exam/unit/Unit.service";

class UnitController {
  // ~ POST /api/units ~ Create Unit
  createUnit = asyncHandler(async (req: Request, res: Response) => {
    const newUnit = await UnitService.createUnit(req.body);
    res.status(201).json(newUnit);
  });

  // ~ GET /api/units/:id ~ Get Unit
  getUnit = asyncHandler(async (req: Request, res: Response) => {
    const unit = await UnitService.getUnit(req.params.id);
    res.status(200).json(unit);
  });

  // ~ GET /api/units ~ Get All Units
  getAllUnits = asyncHandler(async (req: Request, res: Response) => {
    const units = await UnitService.getAllUnits();
    res.status(200).json(units);
  });

  // ~ GET /api/units/subject/:subjectId ~ Get Units by Subject
  getUnitsBySubject = asyncHandler(async (req: Request, res: Response) => {
    const units = await UnitService.getUnitsBySubject(req.params.subjectId);
    res.status(200).json(units);
  });

  // ~ PUT /api/units/:id ~ Update Unit
  updateUnit = asyncHandler(async (req: Request, res: Response) => {
    const updatedUnit = await UnitService.updateUnit(req.params.id, req.body);
    res.status(200).json(updatedUnit);
  });

  // ~ DELETE /api/units/:id ~ Delete Unit
  deleteUnit = asyncHandler(async (req: Request, res: Response) => {
    await UnitService.deleteUnit(req.params.id);
    res.status(200).json({ message: "تم حذف الوحدة بنجاح" });
  });
}

export const unitController = new UnitController();
