import { Request, Response } from "express";
const AboutValue = require("../models/CompanyValuesModel");
const Company = require("../models/CompanyModel");
export const AddAboutvalue = async (req: Request, res: Response) => {
  const { title, description, image, AboutId } = req.body;

  try {
    if (title === "" || description === "") {
      return res.status(400).json({
        statusCode: 400,
        msg: "Please fill all fields",
        success: false,
      });
    }
    let imagepath;
    if (req.file) {
      imagepath = `values/${req.file.filename}`;
    }
    const findAboutModel = await Company.findById(AboutId);
    if (!findAboutModel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    const newAboutTool = new AboutValue({
      title,
      description,
      image: imagepath,
      AboutId,
    });
    const savedAboutTool = await newAboutTool.save();
    res.status(200).json({
      statusCode: 201,
      msg: "Data Saved successfully",
      success: true,
      data: savedAboutTool,
    });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
export const GetAllAboutvalue = async (req: Request, res: Response) => {
  try {
    const findAboutModel = await AboutValue.find();
    if (!findAboutModel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    res
      .status(200)
      .json({ statusCode: 200, success: true, data: findAboutModel });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
export const DeleteAboutvalue = async (req: Request, res: Response) => {
  try {
    const findAboutModel = await AboutValue.findByIdAndRemove(req.params.id);
    if (!findAboutModel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: "Data Deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
export const UpdateAboutvalue = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `values/${req.file.filename}`;
    }
    const findAboutModel = await AboutValue.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );
    if (!findAboutModel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: "Data Updated successfully",
    });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
