import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SubjectService } from "../../../services/exam/subject/Subject.service";

class SubjectController {
  // ~ POST /api/subjects ~ Create Subject
  createSubject = asyncHandler(async (req: Request, res: Response) => {
    const newSubject = await SubjectService.createSubject(req.body);
    res.status(201).json(newSubject);
  });

  // ~ GET /api/subjects/:id ~ Get Subject
  getSubject = asyncHandler(async (req: Request, res: Response) => {
    const subject = await SubjectService.getSubject(req.params.id);
    res.status(200).json(subject);
  });

  // ~ GET /api/subjects ~ Get All Subjects
  getAllSubjects = asyncHandler(async (req: Request, res: Response) => {
    const subjects = await SubjectService.getAllSubjects();
    res.status(200).json(subjects);
  });

  // ~ GET /api/subjects/class/:classId ~ Get Subjects by Class
  getSubjectsByClass = asyncHandler(async (req: Request, res: Response) => {
    const subjects = await SubjectService.getSubjectsByClass(
      req.params.classId
    );
    res.status(200).json(subjects);
  });

  // ~ PUT /api/subjects/:id ~ Update Subject
  updateSubject = asyncHandler(async (req: Request, res: Response) => {
    const updatedSubject = await SubjectService.updateSubject(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "تم تحديث بيانات المادة" });
  });

  // ~ DELETE /api/subjects/:id ~ Delete Subject
  deleteSubject = asyncHandler(async (req: Request, res: Response) => {
    await SubjectService.deleteSubject(req.params.id);
    res.status(200).json({ message: "تم حذف المادة بنجاح" });
  });
}

export const subjectController = new SubjectController();
