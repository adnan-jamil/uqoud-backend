const AboutTech = require("../models/AboutTechnologyModel");
const Company = require("../models/CompanyModel");
import { Request, Response } from "express";
export const addAboutTech = async (req: Request, res: Response) => {
  const { title, description, AboutId, isActive, isDeleted } = req.body;

  try {
    const findAbout = await Company.findById(AboutId);
    if (!findAbout) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    const aboutTech = new AboutTech({
      title,
      AboutId,
      description,
      isActive,
      isDeleted,
    });
    await aboutTech.save();
    if (aboutTech) {
      return res.status(200).json({
        data: aboutTech,
        msg: "Data Saved successfully",
        success: true,
      });
    }
    res.status(400).json({ msg: "Error while saving", success: false });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
export const GetAboutTech = async (req: Request, res: Response) => {
  try {
    const aboutTech = await AboutTech.find();
    if (aboutTech) {
      return res.status(200).json({ data: aboutTech, success: true });
    }
    res.status(400).json({ msg: "Error while fetching data", success: false });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
export const DeleteAboutTech = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const aboutTech = await AboutTech.findByIdAndRemove(id);
    if (!aboutTech) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    res.status(200).json({ msg: "Deleted successfully", success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
export const UpdateAboutTech = async (req: Request, res: Response) => {
  console.log(req.body);
  const id = req.params.id;
  try {
    const aboutTech = await AboutTech.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!aboutTech) {
      return res.status(404).json({ msg: "Data not found", success: false });
    }
    res
      .status(200)
      .json({ msg: "Updated successfully", success: true, data: aboutTech });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
