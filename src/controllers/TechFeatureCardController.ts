import { Request, Response } from "express";
const AboutTech = require("../models/AboutTechnologyModel");
const TechCard = require("../models/TechCardModel");
export const NewTechCard = async (req: Request, res: Response) => {
  const { title, description, isActive, techID, isDeleted } = req.body;
  try {
    const oldproduct = await AboutTech.findById(techID);
    if (!oldproduct) {
      return res.status(404).json({ msg: "No Product Found", success: false });
    }
    let techCard;
    techCard = new TechCard({
      title,
      description,
      techID,
      isActive,
      isDeleted,
    });
    techCard = await techCard.save();
    if (!techCard) {
      return res.status(500).json({
        statusCode: 500,
        error: "Failed to create new Items",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: techCard,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const AllTechcards = async (req: Request, res: Response) => {
  try {
    let allsection = await TechCard.find();
    if (!allsection) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: allsection, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const UpdateTechCard = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    if (req.body.title === "" || req.body.description === "") {
      res.status(400).json({ msg: "title is required" });
      return;
    }
    let updatesec = await TechCard.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatesec) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: updatesec,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const getproductbyId = async (req: Request, res: Response) => {
  try {
    let getsectid = await TechCard.findById(req.params.id);
    if (!getsectid) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getsectid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const DeletetechCard = async (req: Request, res: Response) => {
  try {
    let sectiondel = await TechCard.findByIdAndRemove(req.params.id);
    if (!sectiondel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Data deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
