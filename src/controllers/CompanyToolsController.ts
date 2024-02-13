import { Request, Response } from "express";
const AboutTool = require("../models/Company_toolsModel");
const Company = require("../models/CompanyModel");
export const AddAboutTool = async (req: Request, res: Response) => {
  const { title, link, AboutId } = req.body;
  try {
    const findAboutModel = await Company.findById(AboutId);
    if (!findAboutModel) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    const newAboutTool = new AboutTool({
      title,
      link,
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
export const GetAllAboutTool = async (req: Request, res: Response) => {
  try {
    const findAboutModel = await AboutTool.find();
    if (!findAboutModel) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    res.status(200).json({ success: true, data: findAboutModel });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
export const DeleteAboutTool = async (req: Request, res: Response) => {
  try {
    const findAboutModel = await AboutTool.findByIdAndRemove(req.params.id);
    if (!findAboutModel) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    res.status(200).json({ success: true, msg: "Data Deleted successfully" });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
export const UpdateAboutTool = async (req: Request, res: Response) => {
  try {
    const findAboutModel = await AboutTool.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!findAboutModel) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    res.status(200).json({ success: true, msg: "Data Updated successfully" });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
