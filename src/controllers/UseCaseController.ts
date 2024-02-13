import { Request, Response } from "express";
const UseCase = require("../models/UseCaseModel");
export const useCases = async (req: Request, res: Response) => {
  const { title, description, isActive, isDeleted } = req.body;
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let usecase;
    usecase = new UseCase({
      title,
      description,
      image: `Usecases/${imageFileName}`,
      isActive,
      isDeleted,
    });
    usecase = await usecase.save();
    if (!usecase) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving data",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: usecase,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetuseCases = async (req: Request, res: Response) => {
  try {
    let getusecase = await UseCase.find();
    if (!getusecase) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getusecase, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateuseCases = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `Usecases/${imageFileName}`;
    }
    let updateusecase = await UseCase.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
      },
      { new: true }
    );
    if (!updateusecase) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: updateusecase,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const useCasesbyId = async (req: Request, res: Response) => {
  try {
    let getusecasebtid = await UseCase.findById(req.params.id);
    if (!getusecasebtid) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getusecasebtid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const useCasesdelete = async (req: Request, res: Response) => {
  try {
    let usecasedel = await UseCase.findByIdAndRemove(req.params.id);
    if (!usecasedel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
