import { Request, Response } from "express";
const HowWorks = require("../models/HowItWorkModel");
export const HowItWork = async (req: Request, res: Response) => {
  const { title, description, features, tags, isActive, isDeleted } = req.body;
  try {
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let tagsArray;
    if (tags) {
      tagsArray = tags.split(",").map((skill: string) => skill.trim());
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: "Error while Parsing Features",
        success: false,
      });
    }
    let featureArray: string[] = [];
    if (!features) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "Features can't be null" });
    } else {
      featureArray = features.split(",").map((skill: string) => skill.trim());
    }

    let work;
    work = new HowWorks({
      title,
      description,
      features: featureArray,
      image: `${imageFileName}`,
      tags: tagsArray,
      isActive,
      isDeleted,
    });
    work = await work.save();
    if (!work) {
      return res.status(500).json({
        statusCode: 500,
        data: work,
        msg: "Error while saving data",
        success: false,
      });
    }
    return res.status(201).json({
      statusCode: 201,
      data: work,
      msg: "Data Saved successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get All DATA
export const GetHowItWork = async (req: Request, res: Response) => {
  try {
    let getwork = await HowWorks.find();
    if (!getwork) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getwork, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateHowItWork = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      data.image = `${imageFileName}`;
    }
    if (!data.features) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: "data can't be null" });
    } else {
      data.features = data.features
        .split(",")
        .map((skill: string) => skill.trim());
    }
    let getwork = await HowWorks.findByIdAndUpdate(req.params.id, {
      $set: data,
    });
    if (!getwork) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      data: getwork,
      msg: "Data updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const HowItWorkbyId = async (req: Request, res: Response) => {
  try {
    let getworkbtid = await HowWorks.findById(req.params.id);
    if (!getworkbtid) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getworkbtid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const HowItWorkdelete = async (req: Request, res: Response) => {
  try {
    let getworkdel = await HowWorks.findByIdAndRemove(req.params.id);
    if (!getworkdel) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "No Data Found", success: false });
    }
    return res.status(200).json({
      statusCode: 200,
      msg: "Item Deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
