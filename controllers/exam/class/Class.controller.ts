import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ClassService } from "../../../services/exam/class/Class.service";

class ClassController {
  // ~ POST /api/classes ~ Create Class
  createClass = asyncHandler(async (req: Request, res: Response) => {
    const newClass = await ClassService.createClass(req.body);
    res.status(201).json(newClass);
  });

  // ~ GET /api/classes/:id ~ Get Class
  getClass = asyncHandler(async (req: Request, res: Response) => {
    const classObj = await ClassService.getClass(req.params.id);
    res.status(200).json(classObj);
  });

  // ~ GET /api/classes ~ Get All Classes
  getAllClasses = asyncHandler(async (req: Request, res: Response) => {
    const classes = await ClassService.getAllClasses();
    res.status(200).json(classes);
  });

  // ~ PUT /api/classes/:id ~ Update Class
  updateClass = asyncHandler(async (req: Request, res: Response) => {
    const updatedClass = await ClassService.updateClass(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "تم تحديث بيانات الصف" });
  });

  // ~ DELETE /api/classes/:id ~ Delete Class
  deleteClass = asyncHandler(async (req: Request, res: Response) => {
    await ClassService.deleteClass(req.params.id);
    res.status(200).json({ message: "تم حذف الصف بنجاح" });
  });
}

export const classController = new ClassController();
