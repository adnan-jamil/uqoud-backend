import { Request, Response } from "express";
const ManagementItem = require("../models/ManagementItems");
const Challenges = require("../models/ChallengesModel");
export const managementitem = async (req: Request, res: Response) => {
  const { title, description, challengeId, isActive, isDeleted } = req.body;

  try {
    if (!challengeId) {
      return res.status(400).json({ statusCode: 400, msg: "Invalid Id" });
    }
    const findmodel = await Challenges.find({ challengeId });
    if (!findmodel) {
      return res.status(400).json({ statusCode: 400, msg: "Invalid Id" });
    }
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
    }
    let work;
    work = new ManagementItem({
      title,
      description,
      image: `challenge/${imageFileName}`,
      challengeId,
      isActive,
      isDeleted,
    });
    work = await work.save();
    if (!work) {
      return res.status(500).json({
        statusCode: 500,
        msg: "Error while saving new Work",
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
export const Getmanagementitem = async (req: Request, res: Response) => {
  try {
    let getwork = await ManagementItem.find();
    if (!getwork) {
      return res
        .status(404)
        .json({ statusCode: 404, msg: "Data not found", success: false });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getwork, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updatemanagementitem = async (req: Request, res: Response) => {
  try {
    let updateData = req.body;
    let imageFileName = null;
    if (req.file) {
      imageFileName = await req.file.filename;
      updateData.image = `challenge/${imageFileName}`;
    }

    let getwork = await ManagementItem.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );
    if (!getwork) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res.status(200).json({
      statusCode: 200,
      data: getwork,
      msg: "Data Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const managementitembyId = async (req: Request, res: Response) => {
  try {
    let getworkbtid = await ManagementItem.findById(req.params.id);
    if (!getworkbtid) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
    }
    return res
      .status(200)
      .json({ statusCode: 200, data: getworkbtid, success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const deletemanagementitem = async (req: Request, res: Response) => {
  try {
    let getworkdel = await ManagementItem.findByIdAndRemove(req.params.id);
    if (!getworkdel) {
      return res.status(404).json({ statusCode: 404, msg: "No Data Found" });
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
